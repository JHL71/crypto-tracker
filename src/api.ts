
const BASE_URL = 'https://api.coinpaprika.com/v1'

export async function fetchCoins() {
  const res = await fetch(`${BASE_URL}/coins`);
  return await res.json();
}

export async function fetchCoinInfo(coinId: string) {
  const res = await fetch(`${BASE_URL}/coins/${coinId}`);
  return await res.json();
}

export async function fetchCoinTickers(coinId: string) {
  const res = await fetch(`	${BASE_URL}/tickers/${coinId}`);
  return await res.json();
}