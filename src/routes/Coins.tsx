import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  padding: 0 20px;
  width: 480px;
  margin: 0 auto;
`

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CoinsList = styled.ul`
  padding: 0 20px;
`

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`

const LoadingAnimation = keyframes`
  0% {
    width: 0px;
  }

  100% {
    width: 300px;
  }
`

const Loader = styled.div`
  width: 300px;
  height: 50px;
  margin: 50px auto;
  background-color: white;
  border-radius: 5px;
`

const ProgressBar = styled.div`
  height: 50px;
  background-color: #4cd137;
  animation: ${LoadingAnimation} 0.5s linear infinite;
  border-radius: 5px;
  span {
    position: fixed;
    left: 50%;
    font-size: 24px;
    transform: translate(-50%, 50%);
    color: gray;
  }
`

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(`https://api.coinpaprika.com/v1/coins`);
      const json = await res.json();
      setCoins(json.slice(0, 100));
      setLoading(false);
    })();
  }, []);

  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading 
        ? <Loader>
            <ProgressBar>
              <span>
                Loading...
              </span>
            </ProgressBar>
          </Loader> 
        : <CoinsList>
            {coins.map(coin => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={{ name: coin.name }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt="coinImg"/>
                {coin.name} &rarr;
              </Link>
            </Coin>
            ))}
          </CoinsList>
      }
    </Container>
  )
}

export default Coins;