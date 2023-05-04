import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#1F263B",
      dark: "#00506E",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFF",
    },
    info: {
      main: "#2196F3",
      contrastText: "#fff",
    },
  },
});

export default Theme;
