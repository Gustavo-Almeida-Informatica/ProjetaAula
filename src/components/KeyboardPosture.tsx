import { KeyboardLayout } from "@/lib/typingTexts";

const FINGERS = [
  { id: "mindinho", label: "Mínimo", color: "hsl(280 70% 60%)" },
  { id: "anelar", label: "Anelar", color: "hsl(200 80% 55%)" },
  { id: "medio", label: "Médio", color: "hsl(150 60% 45%)" },
  { id: "indicador", label: "Indicador", color: "hsl(30 95% 55%)" },
];

const ROWS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L", "EXTRA"],
  ["Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
];

/** dedo responsável por cada tecla da home row */
const HOME_FINGER: Record<string, string> = {
  A: "mindinho",
  S: "anelar",
  D: "medio",
  F: "indicador",
  J: "indicador",
  K: "medio",
  L: "anelar",
  EXTRA: "mindinho",
};

const KEY_W = 52;
const KEY_H = 46;
const GAP = 6;
const ROW_OFFSETS = [0, 16, 36];
const TOP = 20;

function colorOf(finger?: string) {
  return FINGERS.find((f) => f.id === finger)?.color;
}

export default function KeyboardPosture({ layout }: { layout: KeyboardLayout }) {
  const width = 10 * (KEY_W + GAP) + 60;
  const keyboardHeight = TOP + 3 * (KEY_H + GAP);
  const handsY = keyboardHeight + 90;
  const height = handsY + 40;

  // posições X dos dedos desenhados abaixo do teclado
  const homeKeys = ["A", "S", "D", "F", "J", "K", "L", "EXTRA"];

  const keyX = (rowIndex: number, colIndex: number) =>
    ROW_OFFSETS[rowIndex] + colIndex * (KEY_W + GAP);
  const keyY = (rowIndex: number) => TOP + rowIndex * (KEY_H + GAP);

  const homePos: Record<string, { x: number; y: number }> = {};
  ROWS[1].forEach((k, i) => {
    homePos[k] = { x: keyX(1, i) + KEY_W / 2, y: keyY(1) + KEY_H };
  });

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <svg
          viewBox={`-50 0 ${width + 60} ${height}`}
          className="w-full min-w-[560px]"
          role="img"
          aria-label={`Ilustração do teclado ${layout.name} com a posição correta dos dedos na home row`}
        >
          {/* teclas */}
          {ROWS.map((row, r) =>
            row.map((key, c) => {
              const label = key === "EXTRA" ? layout.extraKey : key;
              const isHome = r === 1 && HOME_FINGER[key];
              const isStart = key === "F" || key === "J";
              const color = isHome ? colorOf(HOME_FINGER[key]) : undefined;
              return (
                <g key={`${r}-${c}`}>
                  <rect
                    x={keyX(r, c)}
                    y={keyY(r)}
                    width={KEY_W}
                    height={KEY_H}
                    rx={8}
                    fill={color ? `${color.replace(")", " / 0.18)")}` : "hsl(0 0% 100% / 0.04)"}
                    stroke={color ?? "hsl(0 0% 100% / 0.12)"}
                    strokeWidth={isStart ? 2.5 : 1}
                  />
                  <text
                    x={keyX(r, c) + KEY_W / 2}
                    y={keyY(r) + KEY_H / 2 + 5}
                    textAnchor="middle"
                    fontSize={16}
                    fontWeight={isStart ? 800 : 500}
                    fill={color ?? "hsl(0 0% 100% / 0.65)"}
                  >
                    {label}
                  </text>
                  {isStart && (
                    <rect
                      x={keyX(r, c) + KEY_W / 2 - 10}
                      y={keyY(r) + KEY_H - 8}
                      width={20}
                      height={3}
                      rx={1.5}
                      fill={color}
                    />
                  )}
                </g>
              );
            })
          )}

          {/* barra de espaço */}
          <rect
            x={ROW_OFFSETS[2] + 2 * (KEY_W + GAP)}
            y={keyY(2) + KEY_H + GAP}
            width={6 * (KEY_W + GAP) - GAP}
            height={KEY_H - 12}
            rx={8}
            fill="hsl(0 0% 100% / 0.04)"
            stroke="hsl(0 0% 100% / 0.12)"
          />
          <text
            x={ROW_OFFSETS[2] + 5 * (KEY_W + GAP)}
            y={keyY(2) + KEY_H + GAP + 22}
            textAnchor="middle"
            fontSize={13}
            fill="hsl(0 0% 100% / 0.5)"
          >
            Espaço — polegares
          </text>

          {/* linhas tracejadas dedo -> tecla */}
          {homeKeys.map((key, i) => {
            const finger = HOME_FINGER[key];
            const color = colorOf(finger)!;
            const pos = homePos[key];
            const fingerX = pos.x + (i < 4 ? -14 : 14);
            return (
              <g key={`link-${key}`}>
                <path
                  d={`M ${pos.x} ${pos.y} C ${pos.x} ${pos.y + 40}, ${fingerX} ${handsY - 50}, ${fingerX} ${handsY - 18}`}
                  stroke={color}
                  strokeWidth={1.5}
                  strokeDasharray="5 5"
                  fill="none"
                  opacity={0.8}
                />
                <circle cx={fingerX} cy={handsY} r={15} fill={`${color.replace(")", " / 0.2)")}`} stroke={color} strokeWidth={1.5} />
                <text
                  x={fingerX}
                  y={handsY + 5}
                  textAnchor="middle"
                  fontSize={13}
                  fontWeight={700}
                  fill={color}
                >
                  {i < 4 ? 4 - i : i - 3}
                </text>
              </g>
            );
          })}

          <text x={homePos["A"].x - 14} y={handsY + 34} textAnchor="middle" fontSize={12} fill="hsl(0 0% 100% / 0.45)">
            Mão esquerda
          </text>
          <text x={homePos["K"].x + 14} y={handsY + 34} textAnchor="middle" fontSize={12} fill="hsl(0 0% 100% / 0.45)">
            Mão direita
          </text>
        </svg>
      </div>

      {/* legenda */}
      <div className="flex flex-wrap justify-center gap-3">
        {FINGERS.map((f) => (
          <span key={f.id} className="flex items-center gap-2 text-xs text-muted-foreground">
            <span
              className="w-3 h-3 rounded-full"
              style={{ background: f.color }}
              aria-hidden
            />
            {f.label}
          </span>
        ))}
      </div>
    </div>
  );
}
