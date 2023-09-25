
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.div`
  width: 440px;
  height: 275px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Table = styled.table`
  width: 440px;
`

const Tr = styled.tr`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-bottom: 10px;
  th {
    font-size: 24px;
    margin-bottom: 15px;
    border-bottom: solid ${porps => porps.theme.textColor} 1px;
    height: 40px;
    padding: 8px 0px;
    color: ${props => props.theme.accentColor};
  }
`

const Td = styled.td`
  text-align: center;
`

interface ITickersData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    }
  };
}

function Price() {
  const { coinId, data } = useOutletContext<{ coinId: string, data: ITickersData}>();

  return (
    <Wrap>
      <Table>
        <thead>
          <Tr>
            <th>info</th>
            <th>value</th>
          </Tr>
        </thead>
        <tbody>
          <Tr>
            <Td>Current Price</Td>
            <Td>{data?.quotes.USD.price.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Fluctuation rate</Td>
            <Td>{data?.quotes.USD.percent_change_24h}</Td>
          </Tr>
          <Tr>
            <Td>ATH Price</Td>
            <Td>{data?.quotes.USD.ath_price.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Market Cap</Td>
            <Td>{data?.quotes.USD.market_cap.toFixed(2)}</Td>
          </Tr>
          <Tr>
            <Td>Volume 24h</Td>
            <Td>{data?.quotes.USD.volume_24h.toFixed(2)}</Td>
          </Tr>
        </tbody>
      </Table>
    </Wrap>
  )
}

export default Price;