import {useEffect, useState} from 'react';
import { CampoConversao } from "./components/CampoConversao";

export function Inicio() {
  const [valorCampo1, setValorCampo1] = useState("");
  const [valorCampo2, setValorCampo2] = useState("");

  function handlerValorCampo1(valor: string, siglaMoeda: string) {
    setValorCampo1(valor);
  }

  function handlerValorCampo2(valor: string, siglaMoeda: string) {
    setValorCampo2(valor);
  }

  useEffect(() => {
    if (valorCampo1 || valorCampo2) {
      console.log(`Valor Campo 1: ${valorCampo1}, Valor Campo 2: ${valorCampo2}`);
    }
  }, [valorCampo1, valorCampo2]);

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
              <CampoConversao onEnviaValorMoedaCampo={handlerValorCampo1} />
            </div>
            <div className="col-span-1 my-auto">
              <img src="/image/convert.png" alt="Icone de Conversão" className="h-6 w-6 mx-auto" />
            </div>
            <div className="col-span-2">
              <CampoConversao onEnviaValorMoedaCampo={handlerValorCampo2}/>
            </div>
        </div>
        
      </div>
    </main>
  );
}
