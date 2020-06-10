import styled from 'styled-components';
import { responsiveProps } from '../../effects/useResponsive';

export const MediaMessageWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

export const MediaMessageText = styled.span<{ resx?: responsiveProps }>`
  ${p => p.resx?.isBigScreen ? "font-size: 1.5rem" : "font-size: 1.2rem"};
  color: #464646;
  font-family: "Poppins";
  font-weight: 400;
  text-align: justify;
  white-space: pre-wrap;
`;

export const MediaMessageIcon = styled.span<{ resx?: responsiveProps }>`
margin-right: .5rem;
${
  p => p.resx?.isBigScreen ? `
  width: 2rem;
  height: 2rem;
`:
    `
  width: 1.5rem;
  height: 1.5rem;
`} `;