import logo from './logo.svg';
import './App.css';
import * as React from "react";
import GameList from "./components/GameList";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

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
            main: '#4af6c3'
        },
        error: {
            main: '#ff433d'
        },
        black: {
            main: '#000000'
        }
    }
});

function App() {
  return (
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          <GameList/>
      </ThemeProvider>
  );
}

export default App;
