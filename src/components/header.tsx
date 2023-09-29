import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { isDarkAtom } from "../atoms";
import { useNavigate } from "react-router-dom";

const Wrap = styled.div`
  width: 100%;
  height: 5vh;
  background-color: ${props => props.theme.cardBgColor};
  box-shadow: 0px 0px 20px ${props => props.theme.textColor};
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  justify-items: center;
`

const Title = styled.div`
  width: 200px;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
`

const Toggle = styled.div<{$isDark: boolean}>`
  width: 60px;
  height: 30px;
  border-radius: 15px;
  background-color: ${props => props.$isDark ? "yellow" : "gray"};
  padding-left: ${props => props.$isDark ? "0px" : "30px"};
  transition: all 1s ease;
  &:hover {
    cursor: pointer;
  }
`

const Circle = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #785dff;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = () => {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom(prev => !prev);
  const navigate = useNavigate();
  return (
    <Wrap>
      <div></div>
      <Title onClick={() => navigate('/crypto-tracker')}>Crypto-Tracker</Title>
      <Toggle $isDark={isDark} onClick={toggleDarkAtom}>
        <Circle>{isDark ? '🌙' : '☀️'}</Circle>
      </Toggle>
    </Wrap>
  )
}

export default Header;