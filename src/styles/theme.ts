import type { DefaultTheme } from "styled-components";

export const customTheme: DefaultTheme = {
  colors: {
    primary: "#473350",
    secondary: "#f7f6ff",
    textChallenge: "#875E99",
    text: "#333333",
    lightGray: "#aaaaaa",
    white: "#ffffff",
    black: "#000000",
    background: "#ffffff",
  },
  fonts: {
    main: "Arial, sans-serif",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
};

export const lightTheme: DefaultTheme = {
  colors: {
    primary: "#6a4ff2",
    secondary: "#f7f6ff",
    textChallenge: "#875E99",
    text: "#333333",
    lightGray: "#aaaaaa",
    white: "#ffffff",
    black: "#000000",
    background: "#fcfcff",
  },
  fonts: {
    main: "Arial, sans-serif",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
};

export const darkTheme: DefaultTheme = {
  colors: {
    primary: "#875E99",
    secondary: "#473350",
    textChallenge: "#ede3f1ff",
    text: "#ffffff",
    lightGray: "#aaaaaa",
    white: "#ffffff",
    black: "#000000",
    background: "#2c2c2c",
  },
  fonts: {
    main: "Arial, sans-serif",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "24px",
  },
};
