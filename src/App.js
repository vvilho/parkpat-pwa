import './App.css';
import {Route, Switch, useLocation} from 'react-router-dom';
import React, {useEffect} from 'react';
import LandingPage from './pages/LandingPage';
import {createTheme, ThemeProvider} from "@mui/material";
import "@fontsource/ibm-plex-mono";

function App() {
  const location = useLocation();

  const theme = createTheme({
    palette: {
      secondary: {
        main: '#b5ffa5'
      },
      primary: {
        main: '#9ce8ff'
      },
      a: {
        main: '#ff0000'
      }
    },
    h5: {
      typography: {
        fontFamily: 'IBM Plex Mono'
      }
    }


  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route path={'/'} exact>
              <LandingPage/>
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
  );
}

export default App;
