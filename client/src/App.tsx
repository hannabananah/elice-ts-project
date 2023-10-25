import { BrowserRouter as Router } from 'react-router-dom';

import AppRouter from "./AppRouter";
import Header from './screens/header';
import { CssBaseline } from '@mui/material';

import { Box } from "@mui/material";

function App() {

  return (
    <>
      <Router>
        <CssBaseline />
        <Box height="100vh">

          <Header />
          <AppRouter />

        </Box>
      </Router>
    </>
  );
}

export default App;
