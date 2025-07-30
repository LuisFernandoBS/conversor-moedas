import type { Route } from "./+types/home";
import { Inicio } from "../inicio/inicio";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Conversor de Moedas" },
    { name: "description", content: "Inicio" },
  ];
}

export default function Home() {
  return <Inicio />;
}
