//Dependencies
import React , { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


//UI
import HomePage from './components/HomePage'


const theme = createMuiTheme({
  palette: { 
    primary: { main: '#455a64', light:'#78909c' }, 
    secondary: { main: '#78909c', light:"#eceff1" }, 
    error: {
      light: "#ffffff",
      main: "#ffffff",
      dark: "#ffffff",
    },
    paperBackground: { main: "#F8FCFF" }, 
    background:{
        paper:"#F8FCFF",
        card: "#ffffff",
    },
    text:{
      primary:"#263238",
      secondary:"#455a64"
    },
    overrides: {
        MuiTypography: {
            h1: {
                fontSize: 24,
                fontWeight: 400
            },
            h2: {
                fontSize: 16,
                fontWeight: 600
            },
            h3: {
                fontSize: 14,
                fontWeight: 400
            },
            h4: {
                fontSize: 12,
                fontWeight: 300
            },
            subtitle1:{
                fontSize: 20,
                fontWeight: 600
            },
            subtitle2:{
                fontSize: 12,
            },
            body1:{
                fontSize: 18,
                fontWeight: 500
            },
            body2:{
                fontSize: 18,
            },
            button:{
                fontSize: 14,
                fontWeight: 800
            },
            caption:{
                fontSize: 10,
            }
    
        },
      },
  },
});



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0,
    };
}



render(){
  return(
    <MuiThemeProvider theme={theme}>
      <HomePage/>
    </MuiThemeProvider>
  )
}
}

export default App;
