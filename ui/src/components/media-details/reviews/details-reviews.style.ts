import emotion from "@emotion/styled";
import { animated } from "react-spring";

export const ReviewsWrapper = emotion.ul`
  color: #fff;
  display: flex;
  flex-direction: column;
  font-family: "Poppins";
  height: 95%;
  width: 95%;
  list-style: none;
  margin: 0;
  padding:0 .5rem;
`;

export const ReviewsContainer = emotion(animated.div)`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 0 0 1.5rem;
  width: 100%;
`;

export const ReviewsHeader = emotion.header`
  align-items: center;
  color: #fff;
  display: flex;
  font-size: 1.25rem;
  font-weight: 500;
  height: 2rem;
  margin-top: .5rem;
`;