import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import deepPurple from '@material-ui/core/colors/deepPurple';

export default createMuiTheme({
  palette: {
    primary: { 
      main: grey[900]
    },
    secondary: { 
      main: deepPurple[600],
      light: deepPurple[50],
      dark: deepPurple[900]
    }
  },
  typography: {
    useNextVariants: true,
    fontFamily: 'Karla'
  },
  overrides: {
    MuiTypography: {
      h1: {
        fontSize: '2.5rem'
      },
      h2: {
        fontSize: '2rem'
      }
    }
  }
});