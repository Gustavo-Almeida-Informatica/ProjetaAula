import { auth, defineMcp } from "@lovable.dev/mcp-js";
import getMyProfile from "./tools/get-my-profile";
import listPosts from "./tools/list-posts";
import createPost from "./tools/create-post";
import getMyScores from "./tools/get-my-scores";
import getLeaderboard from "./tools/get-leaderboard";

const projectRef = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "project-ref-unset";

export default defineMcp({
  name: "projeta-aula",
  title: "PROJETA_AULA",
  version: "0.1.0",
  instructions:
    "Ferramentas do Projeta Aula, site educativo de informática. Consulte o perfil do usuário, leia e crie postagens da comunidade, veja pontuações pessoais do quiz e do teste de digitação e os rankings.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [getMyProfile, listPosts, createPost, getMyScores, getLeaderboard],
});
