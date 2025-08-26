import { createGlobalStyle } from "styled-components";

export const ProgressGlobal = createGlobalStyle`
  @property --p {
    syntax: '<percentage>';
    inherits: false;
    initial-value: 0%;
  }
`;
