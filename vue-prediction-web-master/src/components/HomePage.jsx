/*
@This file is developed by Team 11 of COMP90024 of The University of Melbourne, under Apache Licence(see LICENCE). 
 Researched Cities: Victoria, AU 
 Team member - id: 
 Chenyang Lu 951933
 Echo Gu 520042
 Pengcheng Yao	886326
 Zhijia Lu 921715
 Jing Du	77507
*/

//Dependencies
import React , { Component } from 'react';
import {withStyles,AppBar, Toolbar, IconButton, Typography, Button, Tabs, Tab, LinearProgress } from '@material-ui/core';

//UI
import MapSection from './MapSection/MapSection'
import DataVisualizationPage from './datavisualizationSection/DataVisualizationPage'
import DataPredictionMap from './dataPrediction/DataPredictionMap'
import AboutUs from './aboutUs/AboutUs'
import logo from '../data/image/logo.png'

import {processCrimeData} from '../controllers/processCrimeData'

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor:theme.palette.secondary.light,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});




class HomePage extends Component{
  constructor(props){
    super(props);
    this.state = {
      value: 0,
      crimeData:{},
      twitterData:{},
      unemploymentData:{},
      crimeDataLoaded: false,
      twitterDataLoaded: false,
      unemploymentDataLoade: false,
      completed: 0,
      buffer: 10,
    };
}

componentWillUnmount() {
  clearInterval(this.timer);
}

componentDidMount(){

  this.timer = setInterval(this.progress, 500);
  let twitterUrl = "http://172.26.37.33:8080/crimitter/api/tasks/twitter-all"
  let crimeUrl = "http://172.26.37.33:8080/crimitter/api/tasks/crime-all"
  let unemploymentUrl = "http://172.26.37.33:8080/crimitter/api/tasks/unemployment-all"

  var opts = {
      method: "GET", //请求方法
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  }
  fetch(twitterUrl, opts)
      .then(res => {
          res.json().then((dataJson) => {
              console.log(dataJson)
              this.setState({
                  twitterData: dataJson,
                  twitterDataLoaded: true
              })
              return dataJson;
          })
      })

  fetch(crimeUrl, opts)
      .then(res => {
          res.json().then((dataJson) => {
              console.log(dataJson)
              dataJson = processCrimeData(dataJson)
              this.setState({
                  crimeData: dataJson,
                  crimeDataLoaded: true
              })
              return dataJson;
          })
      })

  fetch(unemploymentUrl, opts)
      .then(res => {
          res.json().then((dataJson) => {
              console.log(dataJson)
              this.setState({
                  unemploymentData: dataJson,
                  unemploymentDataLoade: true
              })
              return dataJson;
          })
      })
    

}

progress = () => {
  const { completed } = this.state;
  if (completed > 100) {
    this.setState({ completed: 0, buffer: 10 });
  } else {
    const diff = Math.random() * 10;
    const diff2 = Math.random() * 10;
    this.setState({ completed: completed + diff, buffer: completed + diff + diff2 });
  }
};

handleChange = (event, value) => {
  this.setState({ value });
};

render(){
const {classes} =  this.props;
const { value } = this.state;
const { completed, buffer } = this.state;
if (!(this.state.crimeDataLoaded && this.state.twitterDataLoaded && this.state.unemploymentDataLoade)){
  return(
      <div style ={{marginTop:"15px"}}>
            <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} color ="secondary" />
      </div>
  )
}
else{
  return(
    <div>
    <div className={classes.root}>
      <AppBar position="static" color= "primary">
        <Toolbar variant="dense">
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h4" color="inherit" className={classes.grow}>
          VUC Prediction
          </Typography>
          {/* <Button color="inherit">About Us</Button> */}
          {/* <img src={logo} style={{width:"80px", height:"80px"}}/> */}
        </Toolbar>
        <Toolbar variant="dense">
        <Tabs value={value} onChange={this.handleChange}>
            <Tab label="Overview" />
            <Tab label="Historical Analysis" />
            <Tab label="Prediction" />
            <Tab label="About Us" />
        </Tabs>
        </Toolbar>
      </AppBar>
    </div>
    {value === 0 && 
        <MapSection 
          crimeData= {this.state.crimeData}
          twitterData = {this.state.twitterData}
          unemploymentData = {this.state.unemploymentData}
          />}
    {value === 1 && <DataVisualizationPage 
      twitterData ={this.state.twitterData} 
      unemploymentData = {this.state.unemploymentData} 
      crimeData = {this.state.crimeData}/>}
    {value === 2 && 
    <DataPredictionMap
    crimeData= {this.state.crimeData}
    twitterData = {this.state.twitterData}
    unemploymentData = {this.state.unemploymentData}
    />}
    {value === 3 && <AboutUs
    unemploymentData = {this.state.unemploymentData}/>}
    </div>

  )
}
}
}

export default withStyles(styles)(HomePage);
