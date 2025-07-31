import { useEffect } from "react";
import { SelectMoeda } from "./SelectMoeda";

type Props = {
  setValor: (valor: string) => void;
  setMoeda: (valor: string) => void;
  moeda: string;
  valorInput: string;
  id: string;
  desabilitarInput?: boolean;
};

export function CampoConversao({setValor, setMoeda, id, moeda, valorInput, desabilitarInput = false}: Props) {
  
  useEffect(() => {
    const input = document.querySelector('#campo-conversao-' + id) as HTMLInputElement;
    if (input) {
      input.value = transformaValorMascara(input.value);
    }
  }, [moeda]);

  useEffect(() => {
    const input = document.querySelector('#campo-conversao-' + id) as HTMLInputElement;
    if (input) {
      input.value = transformaValorMascara(valorInput);
    }
  }, [valorInput]);

  function transformaValorMascara(valor: string) {
    switch (moeda) {
      case "BRL":
        return colocarMascara('R$ ','pt-BR',valor);
      case "USD":
        return colocarMascara('$ ','en-US',valor); 
      case "EUR":
        return colocarMascara('€ ','de-DE',valor);
      case "ARS":
        return colocarMascara('', 'es-AR', valor);
      case "JPY":
        return colocarMascara('¥ ', 'ja-JP', valor);
      case "CHF":
        return colocarMascara('CHF ', 'de-CH', valor);
      default:
        return valor;
    }
  }

  function colocarMascara(prefix: string,tipo: string,value: string) {
    value = value.replace(/\D/g, '');
    if (!value) return '';
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '');
    const options = { minimumFractionDigits: 2 };
    const result = new Intl.NumberFormat(tipo, options).format(
        parseFloat(value) / 100
    )
    setValor(result);
    return prefix + result;
  }

  return (
    <div className="relative">
      <span
        className="absolute rounded-4xl inset-y-0 left-[2px] grid w-fit place-content-center text-gray-700 dark:text-gray-200"
      >
        <SelectMoeda setMoeda={setMoeda} id={id}/>
      </span>

      <input
        id={`campo-conversao-${id}`}
        type="text"
        className="mt-0.5 w-full h-[48px] pr-3 pl-[198px] rounded-4xl border-1 border-gray-500 shadow-sm text-right sm:text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-white focus:border-green-600 focus:outline-0 disabled:bg-neutral-300 disabled:dark:bg-gray-800 disabled:cursor-normal"
        placeholder="0,00"
        disabled={desabilitarInput}
        onInput={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = transformaValorMascara(target.value);
        }}
      />
    </div>
  )
}