import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { SITE_CORPUS } from "./corpus.ts";

// HMAC signs a payload using the project's service role key (server-only secret).
// The same secret is used in submit-quiz-score to verify dynamic answers.
async function signHmac(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(payload));
  const bytes = new Uint8Array(sig);
  let str = "";
  for (const b of bytes) str += String.fromCharCode(b);
  return btoa(str).replace(/=+$/, "");
}

const CATEGORIES = [
  "Hardware",
  "Software",
  "História",
  "Brasil",
  "Smartphones",
  "IA",
  "Redes Sociais",
  "Windows",
  "Periféricos",
  "Conectores",
  "Segurança",
];

function pickCategory(): string {
  return CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SIGNING_SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!LOVABLE_API_KEY || !SIGNING_SECRET) {
      return json({ error: "Server not configured" }, 500);
    }

    // Require authenticated user (the function is publicly invocable but we
    // still want to avoid anonymous spam against the AI gateway).
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const body = await req.json().catch(() => ({}));
    const requestedCategory: string | undefined =
      typeof body?.category === "string" ? body.category : undefined;
    const category = requestedCategory ?? pickCategory();
    const avoid: string[] = Array.isArray(body?.avoid)
      ? body.avoid.slice(0, 20).map((s: unknown) => String(s)).filter(Boolean)
      : [];

    const systemPrompt = `Você é um professor brasileiro que cria questões de quiz educativo de informática para iniciantes, EM PORTUGUÊS DO BRASIL.

REGRAS OBRIGATÓRIAS:
- A pergunta DEVE ser baseada estritamente no CONTEÚDO DO SITE fornecido. Não invente fatos.
- Linguagem clara e acessível para iniciantes (sem jargão exagerado).
- Exatamente 4 alternativas (A, B, C, D), NUNCA repetidas, NUNCA visualmente parecidas.
- Os 3 distratores (alternativas erradas) devem ser PLAUSÍVEIS e bem elaborados — confundir um jogador desatento, mas estar tecnicamente errados em relação ao site.
- A alternativa correta deve ser inequívoca para quem leu o site.
- Não use "Todas as anteriores", "Nenhuma das anteriores", "Mais de uma das opções", etc.
- NÃO escreva "A)", "B)" etc dentro do texto das alternativas. Apenas o texto puro.
- Varie o índice da resposta correta (0, 1, 2 ou 3).
- SEMPRE inclua "contentLink" apontando para a seção do site que explica a pergunta, escolhendo de uma lista permitida.
- Responda APENAS em JSON válido, sem markdown, sem texto extra.

PÁGINAS DO SITE e SEÇÕES VÁLIDAS para contentLink:
- /hardware (item opcional): processador-cpu, memoria-ram, armazenamento-hd-e-ssd, cooler-ventilador, fonte-de-alimentacao, placa-mae, placa-de-video-gpu, perifericos, gabinete, placa-de-som, placa-de-rede-nic, placa-fax-modem, flat-cable-cabos-internos, teclado-detalhado, mouse-detalhado, monitor-detalhado, impressora-tipos, scanner-detalhado, webcam, kit-multimidia, bios-cmos-post-detalhado, interfaces-e-portas, slots-de-barramento, chipsets-ponte-norte-e-ponte-sul, memorias-avancadas-sdram-ddr2-ddr3, raid-redundant-array-of-independent-disks, sistemas-numericos-binario-bits-e-bytes
- /software (tab obrigatória entre: windows, programas, explorador, manutencao, drivers, logica, seguranca; item opcional como slug-em-kebab-case do tópico)
- /history (item opcional): valvulas-termoionicas-eniac-e-edvac, transistores, circuitos-integrados-chips, vlsi-e-computadores-pessoais-pc, ulsi-internet-smartphones-e-ia, patinho-feio-1972, cobra-1974, reserva-de-mercado-1984-1992, internet-no-brasil-1995, polo-industrial-de-manaus, pix-2020, motorola-dynatac-1983, nokia-3310-2000, blackberry-2003, iphone-2007, android-2008, 5g-2019, deep-blue-1997, alphago-2016, gpt-3-2020, chatgpt-2022, geracao-de-imagens, ia-multimodal-2024, icq-e-msn-messenger, orkut-2004-2014, facebook-2004, youtube-2005, whatsapp-2009, tiktok-2016

FORMATO EXATO (JSON):
{"question":"...","options":["...","...","...","..."],"correct":2,"explanation":"...","contentLink":{"path":"/hardware","item":"processador-cpu"}}`;

    const userPrompt = `CONTEÚDO DO SITE PROJETA AULA:
${SITE_CORPUS}

Categoria sugerida: ${category}
${avoid.length ? `Evite perguntas sobre estes tópicos já usados nesta sessão: ${avoid.join("; ")}` : ""}

Gere AGORA UMA única questão nova de quiz seguindo todas as regras.`;

    const aiResp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (aiResp.status === 429) {
      return json({ error: "rate_limited" }, 429);
    }
    if (aiResp.status === 402) {
      return json({ error: "ai_credits_exhausted" }, 402);
    }
    if (!aiResp.ok) {
      const text = await aiResp.text();
      console.error("AI gateway error", aiResp.status, text);
      return json({ error: "ai_error" }, 502);
    }

    const aiJson = await aiResp.json();
    const content: string | undefined = aiJson?.choices?.[0]?.message?.content;
    if (!content) return json({ error: "ai_empty" }, 502);

    let parsed: {
      question?: unknown;
      options?: unknown;
      correct?: unknown;
      explanation?: unknown;
    };
    try {
      parsed = JSON.parse(content);
    } catch {
      // Some models wrap JSON in markdown — try to extract
      const m = content.match(/\{[\s\S]*\}/);
      if (!m) return json({ error: "ai_bad_json" }, 502);
      parsed = JSON.parse(m[0]);
    }

    const question = String(parsed.question ?? "").trim();
    const optionsRaw = Array.isArray(parsed.options) ? parsed.options : [];
    const options = optionsRaw.map((o) => String(o ?? "").trim()).filter(Boolean);
    const correct = Number(parsed.correct);
    const explanation = String(parsed.explanation ?? "").trim();

    // Validation
    if (!question || question.length < 8) return json({ error: "bad_question" }, 502);
    if (options.length !== 4) return json({ error: "need_4_options" }, 502);
    const uniq = new Set(options.map((o) => o.toLowerCase()));
    if (uniq.size !== 4) return json({ error: "duplicate_options" }, 502);
    if (!Number.isInteger(correct) || correct < 0 || correct > 3) {
      return json({ error: "bad_correct" }, 502);
    }
    if (!explanation) return json({ error: "missing_explanation" }, 502);

    // Build a signed id so submit-quiz-score can verify the correct index
    // without trusting the client.
    const nonce = crypto.randomUUID();
    const id = `dyn_${nonce}`;
    const payload = `${id}|${correct}`;
    const token = await signHmac(payload, SIGNING_SECRET);

    return json({
      id,
      category,
      question,
      options,
      correct,
      explanation,
      token,
      dynamic: true,
    });
  } catch (e) {
    console.error("generate-quiz-question error", e);
    return json({ error: "internal" }, 500);
  }
});

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
