import {useEffect, useState} from 'react';
import { CampoConversao } from "./components/CampoConversao";
import { buscarTaxas } from '../services/conversaoService';

type TaxasCambio = {
  [sigla: string]: number;
};

type ArrayTaxasCambio = {
  sigla: string;  
  taxas: TaxasCambio[];
  horarioConsulta:string;
}

export function Inicio() {
  const [valorCampo1, setValorCampo1] = useState("");
  const [valorCampo2, setValorCampo2] = useState("");
  const [moedaCampo1, setMoedaCampo1] = useState("");
  const [moedaCampo2, setMoedaCampo2] = useState("");

  const [listaTaxasConsultadas, setListaTaxasConsultadas] = useState<ArrayTaxasCambio[]>([]);
  const [taxas, setTaxas] = useState({});


  function handlerValorCampo1(valor: string, siglaMoeda: string) {
    consultarTaxasCambio(siglaMoeda);
    setValorCampo1(valor);
    setMoedaCampo1(siglaMoeda);
  }
  
  function handlerValorCampo2(valor: string, siglaMoeda: string) {
    consultarTaxasCambio(siglaMoeda);
    setValorCampo2(valor);
    setMoedaCampo2(siglaMoeda);
  }

  useEffect(() => {
    if (valorCampo1 || valorCampo2) {
      console.log(`Valor Campo 1: ${valorCampo1}, Valor Campo 2: ${valorCampo2}`);
    }
  }, [valorCampo1, valorCampo2]);

  async function consultarTaxasCambio(moedaBase: string) {
    const taxasExistem = listaTaxasConsultadas.find(item => item.sigla === moedaBase);
        
    if(taxasExistem){
        const diffHoras = (Date.now() -  Number(taxasExistem?.horarioConsulta)) / (1000 * 60 * 60);
        if (diffHoras <= 1) {
            setTaxas(taxasExistem.taxas);
            return;
        }
    }

    buscarTaxas(moedaBase).then(data => {
        const novasTaxas = {
            sigla: moedaBase,
            taxas: data.conversion_rates,
            horarioConsulta: Date.now().toString()
          };
          setListaTaxasConsultadas(prev => [...prev, novasTaxas]);
          setTaxas(data.conversion_rates);
    })
    .catch(err => {
        console.error(err);
    });
  }

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
