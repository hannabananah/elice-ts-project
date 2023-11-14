import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from "./AppRouter";
import Header from './components/Header';
import { CssBaseline } from '@mui/material';

import { Box } from "@mui/material";
import "./App.css";

function App() {

  return (
    <>
      <Router>
        <CssBaseline />
        <Box className="container">
          <Header />
          <AppRouter />

        </Box>
      </Router>
    </>
  );
}

export default App;
