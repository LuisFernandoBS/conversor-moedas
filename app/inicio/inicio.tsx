import {useEffect, useState} from 'react';
import { CampoConversao } from "./components/CampoConversao";
import { buscarTaxas } from '../services/conversaoService';
import { ToogleDarkMode } from './components/ToogleDarkMode';

type TaxasCambio = {
  [sigla: string]: number;
};

type ArrayTaxasCambio = {
  sigla: string;  
  taxas: TaxasCambio;
  horarioConsulta:string;
}

export function Inicio() {
  const [valorCampo1, setValorCampo1] = useState("");
  const [valorCampo2, setValorCampo2] = useState("");
  const [moedaCampo1, setMoedaCampo1] = useState("");
  const [moedaCampo2, setMoedaCampo2] = useState("");

  const [listaTaxasConsultadas, setListaTaxasConsultadas] = useState<ArrayTaxasCambio[]>([]);
  
  const [animacao, setAnimacao] = useState(false);

  useEffect(()=>{
    if(valorCampo1) {
      consultarTaxasCambio(moedaCampo1, 1);
    }
  },[valorCampo1, moedaCampo1]);

  useEffect(()=>{
    if(valorCampo1) {
      consultarTaxasCambio(moedaCampo2, 2);
    }
  },[moedaCampo2]);
  
  function calcularConversao() {
    const valorFloat = (valorCampo1.replace(/[^0-9.,]/g, '').replace(/([.,])(?=.*[.,])/g, '')).replace(',', '.');
    const taxa = listaTaxasConsultadas.filter(taxa => taxa.sigla === moedaCampo1);
    if(taxa.length > 0){
      const valorConvertido = parseFloat(valorFloat) * taxa[0].taxas[moedaCampo2];
      setValorCampo2(valorConvertido.toFixed(2));
      iniciarAnimacao();
    }
  }

  async function consultarTaxasCambio(moedaBase: string, campo: number) {
    const taxasExistem = listaTaxasConsultadas.find(item => item.sigla === moedaBase);
        
    if(taxasExistem){
        const diffHoras = (Date.now() -  Number(taxasExistem?.horarioConsulta)) / (1000 * 60 * 60);
        if (diffHoras <= 1) {
            calcularConversao();
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
      calcularConversao();
    })
    .catch(err => {
        console.error(err);
    });
  }

  function iniciarAnimacao() {
    setAnimacao(true);
    setTimeout(() => {
      setAnimacao(false);
    }, 1300);
  }

  return (
    <main className="flex justify-center pt-20 pb-4 h-screen">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <ToogleDarkMode />
        </header>
        <div className="max-w-[800px] w-full space-y-3 px-4">
          <h1 className="text-5xl 2xl:text-8xl font-bold titulo text-center text-green-900 dark:text-green-400">
            Conversor de Moedas
            <img src="/image/logo.png" alt='logo' className='inline-block h-[64px] w-[64px] ml-2' />
          </h1>
          <p className="text-center texto-custom font-black dark:text-gray-400">
            Use este aplicativo para converter valores entre diferentes moedas de forma rápida e fácil.
          </p>
        </div>
        <div className="grid grid-cols-9 w-full max-w-[1000px] gap-4">
            <div className="col-span-9 px-5 md:col-span-4">
              <CampoConversao id="1" moeda={moedaCampo1} valorInput={valorCampo1} setMoeda={setMoedaCampo1} setValor={setValorCampo1} />
            </div>
            <div className="col-span-9 md:col-span-1 my-auto">
              <img src="/image/convert.png" alt="Icone de Conversão" className={`h-6 w-6 mx-auto ${animacao && 'animacao-rotacao'}`} />
            </div>
            <div className="col-span-9 px-5 md:col-span-4">
              <CampoConversao id="2" moeda={moedaCampo2} valorInput={valorCampo2} setMoeda={setMoedaCampo2} setValor={setValorCampo2} desabilitarInput={true} />
            </div>
        </div>
        
      </div>
    </main>
  );
}
