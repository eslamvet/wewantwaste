import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(0,55,193)",
    },
    secondary: {
      main: "rgb(58, 58, 58)",
      contrastText: "#ffffff",
    },
    background: {
      default: "rgb(18,18,18)",
      paper: "#1c1c1c",
    },
    text: {
      primary: "#ffffff",
      disabled: "rgba(255,255,255,.5)",
    },
    action: {
      disabled: "rgba(255,255,255,.5)",
    },
    divider: "rgb(42,42,42)",
  },
  typography: {
    fontFamily: "Inter",
  },
});

export default responsiveFontSizes(theme);
