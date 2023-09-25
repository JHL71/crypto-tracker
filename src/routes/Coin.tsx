import { useQuery } from "react-query";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import { Helmet } from "react-helmet-async";

const Container = styled.div`
  width: 480px;
  padding: 0 20px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`

const Loader = styled.div`
  text-align: center;
`

const Overview = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child{
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`

const Description = styled.p`
  font-weight: 300;
  margin: 20px 0px;
`

const Taps = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`

const Tap = styled.span<{$isActive: boolean}>`
  text-align: center;
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 7px 0px;
  color: ${props => props.$isActive ? props.theme.accentColor : "inherit"};
  pointer-events: ${props => props.$isActive ? "none" : "auto"};
  a {
    display: block;
  }
  a:hover {
    cursor: ${props => props.$isActive ? "default" : "cursor"};
  }
`

const Button = styled.button`
  position: fixed;
  bottom: 50px;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  font-size: 18px;
  font-weight: bold;
  background-color: ${props => props.theme.textColor};
  color: ${props => props.theme.bgColor};
  outline: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${props => props.theme.accentColor};
    cursor: pointer;
  }
`

interface LocationProps {
  state: {
    name: string
  } | undefined;
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  logo: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

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

function Coin() {
  const { coinId } = useParams() as { coinId: string };
  const { state } = useLocation() as LocationProps;
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const navigate = useNavigate();
  
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["infoData", coinId], () => fetchCoinInfo(coinId as string), {
    refetchOnWindowFocus: false,
  });
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickersData>(
    ["priceData", coinId], 
    () => fetchCoinTickers(coinId as string),
    { 
      refetchOnWindowFocus: false,
    }
  );
  
  const loading = infoLoading || tickersLoading;

  return (
    <div>
      <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : loading ? "loading" : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "loading" : infoData?.name}</Title>
      </Header>
      {loading 
        ? <Loader>
            <span>
              Loading...
            </span>
          </Loader> 
        : 
          <>
            <Overview>
              <OverviewItem>
                <span>RANK</span>
                <span>{infoData?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>SYMBOL</span>
                <span>﹩{infoData?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>PRICE</span>
                <span>{tickersData?.quotes.USD.price.toFixed(3)}</span>
              </OverviewItem>
            </Overview>
            <Description>
              {infoData?.description}
            </Description>
            <Overview>
              <OverviewItem>
                <span>Total Supply</span>
                <span>{tickersData?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply</span>
                <span>{tickersData?.max_supply}</span>
              </OverviewItem>
            </Overview>
          </>
      }
      <Taps>
        <Tap $isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`} replace={true}>chart</Link>
        </Tap>
        <Tap $isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`} replace={true}>price</Link>          
        </Tap>
      </Taps>
      <Outlet context={{coinId, data: tickersData}} />
      <Button onClick={() => navigate('/')}>&larr;</Button>
      </Container>
    </div>
  )
}

export default Coin;