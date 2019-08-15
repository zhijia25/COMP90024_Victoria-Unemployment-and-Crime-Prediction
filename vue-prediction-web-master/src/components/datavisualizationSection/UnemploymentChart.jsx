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
import {withStyles, Paper} from '@material-ui/core';
import CanvasJSReact from '../../lib/canvasjs.react'
import {unemploymentNtwitter2014,unemploymentNtwitter2015,unemploymentNtwitter2016} from '../../controllers/unemploymentAndTwitterCharData'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//UI

const styles = {

};

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class UnemploymentChar extends Component{
  constructor(props){
    super(props);
    this.state = {
      options2014:{},
      anchorEl: null,
      year:"2014",
      loaded:false
    };
}

handleClick = event => {
  this.setState({ anchorEl: event.currentTarget });
};

handleClose = (year) => {
  this.setState({ anchorEl: null,
   year:year});
};

componentDidMount(){
  const unemploymentNtwitter2014_new = unemploymentNtwitter2014(this.props.twitterData,this.props.crimeData,this.props.unemploymentData)
  const unemploymentNtwitter2015_new = unemploymentNtwitter2015(this.props.twitterData,this.props.crimeData,this.props.unemploymentData)
  const unemploymentNtwitter2016_new = unemploymentNtwitter2016(this.props.twitterData,this.props.crimeData,this.props.unemploymentData)
  // console.log(unemploymentNtwitter2015_new)
  this.setState({unemploymentNtwitter2014_new:unemploymentNtwitter2014_new,
    unemploymentNtwitter2015_new:unemploymentNtwitter2015_new,
    unemploymentNtwitter2016_new:unemploymentNtwitter2016_new,})
}



render() {
  const { anchorEl } = this.state;

  return (
  <div style ={{width:"80%", margin:"20px"}}>
     <Button
     aria-owns={anchorEl ? 'simple-menu' : undefined}
     aria-haspopup="true"
     onClick={this.handleClick}
     variant="contained"
     color="primary"
   >
    {this.state.year}
   </Button>
   <Menu
     id="simple-menu"
     anchorEl={anchorEl}
     open={Boolean(anchorEl)}
    onClose={() => this.handleClose("2014")}
   >
     <MenuItem onClick={() => this.handleClose("2014")}>2014</MenuItem>
     <MenuItem onClick={() => this.handleClose("2015")}>2015</MenuItem>
     <MenuItem onClick={() => this.handleClose("2016")}>2016</MenuItem>
   </Menu>
   <Paper>
   {this.state.year === "2014" &&     <CanvasJSChart options = {this.state.unemploymentNtwitter2014_new}
      /* onRef={ref => this.chart = ref} */
    />   }
      {this.state.year === "2015" &&     <CanvasJSChart options = {this.state.unemploymentNtwitter2015_new}
    /* onRef={ref => this.chart = ref} */
  />   }
      {this.state.year === "2016" &&     <CanvasJSChart options = {this.state.unemploymentNtwitter2016_new}
    /* onRef={ref => this.chart = ref} */
  />   }
  </Paper>

 </div>
  );
  }
}


export default withStyles(styles)(UnemploymentChar);