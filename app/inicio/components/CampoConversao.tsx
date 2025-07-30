import { useState,useEffect } from "react";
import { SelectMoeda } from "./SelectMoeda";
import { replace } from "react-router";

type Props = {
  onEnviaValorMoedaCampo: (valor: string, siglaMoeda: string) => void;
};

export function CampoConversao({onEnviaValorMoedaCampo}: Props) {

  const [moeda, setMoeda] = useState("");
  const [valor, setValor] = useState("");

  useEffect(() => {
    if (valor) {
      onEnviaValorMoedaCampo(valor, moeda);
    }
  }, [valor, onEnviaValorMoedaCampo]);

  const handleRecebeMoeda = (novoMoeda: string) => {
    setMoeda(novoMoeda);
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    if (input) {
      input.value = transformaValorMascara(input.value);
    }
  };

  function transformaValorMascara(valor: string) {
    switch (moeda) {
      case "BRL":
        return colocarMascara('R$ ','pt-BR',valor);
      case "USD":
        return colocarMascara('$ ','en-US',valor); 
      case "EUR":
        return colocarMascara('€ ','de-DE',valor);
      default:
        return valor;
    }
  }

  function colocarMascara(prefix: string,tipo: string,value: string) {
    let valorFloat = value;
    value = value.replace(/\D/g, '');
    if (!value) return '';
    valorFloat = (valorFloat.replace(/[^0-9.,]/g, '').replace(/([.,])(?=.*[.,])/g, '')).replace(',', '.');
    setValor(valorFloat);
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '');
    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat(tipo, options).format(
        parseFloat(value) / 100
    )
    return prefix + result;
  }

  return (
    <div className="relative">
      <span
        className="absolute rounded-4xl inset-y-0 left-1 grid w-fit place-content-center text-gray-700 dark:text-gray-200"
      >
        <SelectMoeda onEnviarMoeda={handleRecebeMoeda}/>
      </span>

      <input
        type="text"
        className="mt-0.5 w-full h-[48px] pr-3 rounded-4xl border-1 border-gray-500 shadow-sm text-right sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-green-600 focus:outline-0"
        placeholder="0,00"
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = transformaValorMascara(target.value);
        }}
      />
    </div>
  )
}