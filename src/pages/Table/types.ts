export interface CryptoDataType {
  key: number;
  name: string;
  symbol: string;
  price: string;
  priceChange: string;
  marketCap: string;
  volume: string;
  logo: string;
}

export interface ResponseDataType {
  market_cap_rank: number;
  name: string;
  symbol: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string;
  total_volume: number;
}
