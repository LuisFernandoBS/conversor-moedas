import { useState } from "react";
import { SelectMoeda } from "./SelectMoeda";

export function CampoConversao() {

  const [moeda, setMoeda] = useState("");

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
        return mascaraReal(valor);
      case "USD":
        return mascaraDolar(valor); 
      case "EUR":
        return mascaraEuro(valor);
      default:
        return valor;
    }
  }

  function mascaraEuro(value: string) {
    value = value.replace(/\D/g, '')
    if (!value) return '';
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('de-DE', options).format(
        parseFloat(value) / 100
    )
    return '€ ' + result
  }

  function mascaraDolar(value: string) {
    value = value.replace(/\D/g, '')
    if (!value) return '';
    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')
    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('en-US', options).format(
        parseFloat(value) / 100
    )
    return '$ ' + result
  }

  function mascaraReal (value: string) {
      value = value.replace(/\D/g, '')
      if (!value) return '';
      value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

      const options = { minimumFractionDigits: 2 }
      const result = new Intl.NumberFormat('pt-BR', options).format(
          parseFloat(value) / 100
      )

      return 'R$ ' + result
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