import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { inherits } from "util";

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

interface LocationProps {
  state: {
    name: string
  } | undefined;
}

interface InfoData {
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

interface PriceData {
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
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  console.log(priceMatch, chartMatch);
  const { coinId } = useParams();
  const { state } = useLocation() as LocationProps;

  useEffect(() => {
    (async () => {
      const infoData = await(
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      const priceData = await(
        await fetch(`	https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })()
  }, []);

  return (
    <div>
      <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "loading" : info?.name}</Title>
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
                <span>{info?.rank}</span>
              </OverviewItem>
              <OverviewItem>
                <span>SYMBOL</span>
                <span>﹩{info?.symbol}</span>
              </OverviewItem>
              <OverviewItem>
                <span>OPEN SOURCE</span>
                <span>{info?.open_source ? "YES" : "NO"}</span>
              </OverviewItem>
            </Overview>
            <Description>
              {info?.description}
            </Description>
            <Overview>
              <OverviewItem>
                <span>Total Supply</span>
                <span>{priceInfo?.total_supply}</span>
              </OverviewItem>
              <OverviewItem>
                <span>Max Supply</span>
                <span>{priceInfo?.max_supply}</span>
              </OverviewItem>
            </Overview>
          </>
      }
      <Taps>
        <Tap $isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>chart</Link>
        </Tap>
        <Tap $isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>price</Link>          
        </Tap>
      </Taps>
      <Outlet />
      </Container>
    </div>
  )
}

export default Coin;