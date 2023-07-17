import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css";

import AppRouter from "./routes";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={THEME}>
        <AppRouter />
        <ToastContainer
            position="bottom-right"
            autoClose={3000}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            draggable
          />
      </ThemeProvider>
    </div>
  );
}

const THEME = createTheme({
  typography: {
    fontFamily: "Varela Round",
    color: "#791314",
  },
  palette: {
    primary: {
      main: '#791314'
    },
  },
  // breakpoints: {
  //   values: {
  //     mobile: 0,
  //     tablet: 640,
  //     laptop: 1024,
  //     desktop: 1200,
  //   },
  // },

});

export default App;
