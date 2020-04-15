import styled from "styled-components";

export const Button = styled.button<{ size?: string }>`
  background: none;
  border: 0;
  outline: none;
  padding: 0;
  cursor: pointer;
  ${({size}) => {
    let style;
    switch (size) {
      case "small":
        style = "min-width: 2rem; height: 2rem;";
        break;
      case "medium":
        style = "min-width: 4rem; height: 4rem;";
        break;
      case "large":
        style = "min-width: 6rem; height: 6rem;";
        break;
    }
    return style;
  }}
`;
