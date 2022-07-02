import logo from './logo.svg';
import './App.css';
import * as React from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import NeueHaasDisplayLight from './fonts/NeueHaasDisplayLight.ttf'
import ModelSelectMenu from "./components/general/ModelSelectMenu";
import {useState} from "react";
import BaeGameList from "./components/ncaaf/BAE/BaeGameList";

const neueHaasLight = {
    fontFamily: 'NeueHaas',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 400,
    src: `
    local('NeueHaasDisplayLight'),
    local('NeueHaasDisplayMedium'),
    url(${NeueHaasDisplayLight}) format('truetype')
  `,
};

const theme = createTheme({
    palette: {
        mode: 'dark',
        // background: '#121212'
        primary: {
            main: '#fb8b1e'
        },
        secondary: {
            main: '#0068ff'
        },
        success: {
            main: '#4af6c3',
        },
        error: {
            main: '#ff433d'
        },
        black: {
            main: '#000000'
        }
    },
    typography: {
        fontFamily: [
            'NeueHaas',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    },
    overrides: {
        MuiCssBaseline: {
            '@global': {
                '@font-face': [neueHaasLight],
            },
        },
    },
});

function App() {
    const [model, setModel] = useState(<BaeGameList />);

  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>

          <ModelSelectMenu setModel={setModel} />

          {model}
      </ThemeProvider>
  );
}

export default App;
