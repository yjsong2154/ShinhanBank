import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      textChallenge: string;
      text: string;
      lightGray: string;
      white: string;
      black: string;
      background: string;
    };
    fonts: {
      main: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
  }
}
