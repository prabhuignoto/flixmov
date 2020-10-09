import emotion from "@emotion/styled";
import { animated } from "react-spring";
import { responsiveProps } from "../../../effects/useResponsive";

export const ReviewWrapper = emotion(animated.li)`
  display: flex;
  flex-direction: column;
  margin: .5rem 0;
  position: relative;
  width: 100%;
`;

export const ReviewContent = emotion(animated.div) <{ resx?: responsiveProps }>`
  color: #000;
  font-size: ${p => p.resx?.isBigScreen ? ".85rem" : ".75rem"};
  font-weight: 400;
  overflow: hidden;
  position: relative;
  text-align: left;
  width: 100%;
`;

export const ReviewAuthor = emotion.div`
  font-size: .9rem;
  font-weight: 500;
  text-align: left;
  width: 100%;
  color: #000;
`;

export const ReadMoreControl = emotion.div`
  align-items: center;
  bottom: .25rem;
  color: rgba(204,0,0,0.9);
  cursor: pointer;
  display: flex;
  font-size: .8rem;
  font-weight: 400;
  height: 1.5rem;
  justify-content: flex-start;
  width: 100%;
`;

export const ReviewText = emotion.p<{ showFull?: boolean }>`
  ${p => !p.showFull ? 'max-height: 150px;' : 'max-height: 2000px'};
  align-items: flex-start;
  display: flex;
  justify-content: flex-start;
  margin: 0;
`;

export const GradientCover = emotion.span`
  background: linear-gradient(0deg, #e5e5e5 0%,  transparent 100%);
  bottom: 0;
  height: 3.5rem;
  position: absolute;
  width: 100%;
`;

export const ReviewHeader = emotion.div`
  align-items: center;
  display: flex;
  margin-bottom: .1rem;
`;

export const ReviewHeaderIcon = emotion.span`
  display: flex;
  height: 1.25rem;
  width: 1.25rem;
  & svg {
    width: 100%;
    height: 100%;
  }
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