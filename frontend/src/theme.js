import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import deepPurple from '@material-ui/core/colors/deepPurple';

let theme = createMuiTheme({
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
      },
      h3: {
        fontSize: '1.5rem'
      },
      h4: {
        fontSize: '1.4rem'
      },
      h5: {
        fontSize: '1.3rem'
      }
    }
  }
});
//theme = responsiveFontSizes(theme);

export default theme;