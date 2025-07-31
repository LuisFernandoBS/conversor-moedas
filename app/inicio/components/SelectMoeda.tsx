import { useEffect, useState } from "react";

type Props = {
  setMoeda: (valor: string) => void;
};

interface Moeda {
  id: number;
  nome: string;
  sigla: string;
  imagem: string;
}

const moedas: Moeda[] = [
  {
    id: 1,
    nome: "Real",
    sigla: "BRL",
    imagem: "/image/real.png"
  },
  {
    id: 2,
    nome: "Dolar",
    sigla: "USD",
    imagem: "/image/dolar.png"
  },
  {
    id: 3,
    nome: "Euro",
    sigla: "EUR",
    imagem: "/image/euro.png"
  },
];

export function SelectMoeda({ setMoeda }: Props) {
    const [aberto, setAberto] = useState(false);
    const [selecionado, setSelecionado] = useState<Moeda>(moedas[0]);
    const [destacado, setDestacado] = useState<number | null>(null);
    let setInicial = false;
    
    useEffect(() => {
        if (setInicial) return;
        setMoeda(moedas[0].sigla);
        setInicial = true;
    }, []);

    useEffect(() => {
        setMoeda(selecionado.sigla);
    }, [selecionado, setMoeda]);

    return (
        <div className="relative">
            <button
            onClick={() => setAberto(!aberto)}
            type="button"
            className="w-full rounded-tl-4xl h-[45px] mt-[1px] cursor-pointer rounded-bl-4xl border-r border-gray-500 bg-white pl-3 pr-10 py-2 text-left text-sm shadow-sm focus:outline-none"
            >
            <div className="flex items-center space-x-3">
                <img
                src={selecionado.imagem}
                alt=""
                className="h-6 w-6 rounded-full"
                />
                <span className="block truncate">{selecionado.nome}</span>
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                >
                <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
                </svg>
            </span>
            </button>

            {aberto && (
            <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-56 overflow-auto text-sm">
                {moedas.map((moeda) => (
                <li
                    key={moeda.id}
                    onClick={() => {
                    setSelecionado(moeda);
                    setAberto(false);
                    }}
                    onMouseEnter={() => setDestacado(moeda.id)}
                    onMouseLeave={() => setDestacado(null)}
                    className={`cursor-pointer select-none relative py-2 pl-4 pr-9 ${
                    destacado === moeda.id ? "bg-indigo-600 text-white" : "text-gray-900"
                    }`}
                >
                    <div className="flex items-center space-x-3">
                    <img
                        src={moeda.imagem}
                        alt=""
                        className="h-6 w-6 rounded-full"
                    />
                    <span
                        className={`block truncate ${
                        selecionado.id === moeda.id ? "font-semibold" : "font-normal"
                        }`}
                    >
                        {moeda.nome}
                    </span>
                    </div>
                    {selecionado.id === moeda.id && (
                    <span
                        className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        destacado === moeda.id ? "text-white" : "text-indigo-600"
                        }`}
                    >
                        <svg
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        >
                        <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                        </svg>
                    </span>
                    )}
                </li>
                ))}
            </ul>
            )}
        </div>
    );
}
