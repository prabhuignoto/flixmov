import styled from 'styled-components';
import { animated } from "react-spring";

export const Wrapper = styled(animated.div)<{expand?: number}>`
  background-color: #000;
  border-radius: .25rem;
  display: flex;
  flex-direction: column;
  margin: .5rem 0;
  padding: 1rem;
  width: 100%; 
`;

export const Header = styled.header`
  align-items: center;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-family: "Poppins";
  font-size: 1.3rem;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  text-align: left;
  width: 100%;
`;

export const MoviesWrapper = styled(animated.div) <{ expand?: number }>`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: .5rem;
`;

export const Title = styled.div`
padding-left: 1rem;
`;

export const TitleText = styled.span``;

export const TitleIcon = styled.span``;

export const ButtonWrapper = styled.div`
  margin-left: auto;
`;

export const Footer = styled.footer`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const DetailsWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;