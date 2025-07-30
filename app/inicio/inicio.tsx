import { CampoConversao } from "./components/CampoConversao";

export function Inicio() {
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
        </header>
        <div className="max-w-[800px] w-full space-y-3 px-4">
          <h1 className="text-2xl font-bold text-center">
            Bem-vindo ao Conversor de Moedas
          </h1>
          <p className="text-center">
            Use este aplicativo para converter valores entre diferentes moedas de forma rápida e fácil.
          </p>
        </div>
        <div className="grid grid-cols-5 w-full max-w-[800px] gap-4">
            <div className="col-span-2">
              <CampoConversao />
            </div>
            <div className="col-span-1">X</div>
            <div className="col-span-2">
              <CampoConversao />
            </div>
        </div>
        
      </div>
    </main>
  );
}
