import logo from './logo.svg';
import './App.css';
import * as React from "react";
import GameList from "./components/GameList";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark',
        // background: '#121212'
    },
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
