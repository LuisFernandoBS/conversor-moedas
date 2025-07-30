export async function buscarTaxas(moedaBase: string = 'USD'): Promise<any> {
  const apiKey = import.meta.env.VITE_EXCHANGE_RATE_API_KEY;
  
  if (!apiKey) {
    throw new Error('Chave de API não configurada');
  }

  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${moedaBase}`);
  
  if (!res.ok) {
    throw new Error('Erro ao buscar taxas');
  }

  return await res.json();
}