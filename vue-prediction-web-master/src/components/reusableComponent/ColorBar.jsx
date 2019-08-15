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
import {withStyles, Paper, Typography} from '@material-ui/core';


//UI

const styles = theme => ({
  colorBar:{
    height:"205px",
    width:"120px",
    backgroundColor:theme.palette.secondary.light,
  },

});



class ColorBar extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
}



render(){
const {classes, maptype} =  this.props;
if (maptype === "crime"){
  return(
    <div>
        <Paper className={classes.colorBar}>
        <Typography variant= "subtitle2" color ="secondary">
          <div style ={{margin:"10px"}}> Crime Ratio 
          </div>
        </Typography>
        <Typography variant= "caption" color ="secondary">
        <div style={{margin:"5px 1px 5px 1px"}} >
          <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#263238"}}> &nbsp;</span> >3500
        </div>
        <div style={{margin:"5px 1px 5px 1px"}} >
          <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#37474f"}}> &nbsp;</span> 3000-3500
        </div>
        <div style={{margin:"5px 1px 5px 1px"}}>
          <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#455a64"}}> &nbsp;</span> 2500 - 3500
        </div>
        <div style={{margin:"5px 1px 5px 1px"}}>
          <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#546e7a"}}> &nbsp;</span>  2000 - 2500
        </div>
        <div style={{margin:"5px 1px 5px 1px"}}>
          <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#607d8b"}}> &nbsp;</span> 1500 - 2000
        </div>
        <div style={{margin:"5px 1px 5px 1px"}}>
          <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#90a4ae"}}> &nbsp;</span> 1000 - 1500
        </div>
        <div style={{margin:"5px 1px 5px 1px"}}>
          <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#cfd8dc"}}> &nbsp;</span> 0 - 1000
        </div>
        </Typography>
        </Paper>
    </div>
  )
}
else if (maptype === "unemployment"){
return(
    <Paper className={classes.colorBar}>
      <Typography variant= "subtitle2" color ="secondary">
        <div style ={{margin:"10px"}}> Unemployment Ratio
        </div>
      </Typography>
      <Typography variant= "caption" color ="secondary">
      <div style={{margin:"5px 1px 5px 1px"}} >
        <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#263238"}}> &nbsp;</span> >6
      </div>
      <div style={{margin:"5px 1px 5px 1px"}} >
        <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#37474f"}}> &nbsp;</span> 6-6.5
      </div>
      <div style={{margin:"5px 1px 5px 1px"}}>
        <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#455a64"}}> &nbsp;</span>5.5-6
      </div>
      <div style={{margin:"5px 1px 5px 1px"}}>
        <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#546e7a"}}> &nbsp;</span>  5-5.5
      </div>
      <div style={{margin:"5px 1px 5px 1px"}}>
        <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#607d8b"}}> &nbsp;</span> 4.5-5
      </div>
      <div style={{margin:"5px 1px 5px 1px"}}>
        <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#90a4ae"}}> &nbsp;</span> 4-4.5
      </div>
      <div style={{margin:"5px 1px 5px 1px"}}>
        <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#cfd8dc"}}> &nbsp;</span> 0-4
      </div>
      </Typography>
    </Paper>

)

}
else{
  return (
    <Paper className={classes.colorBar}>
    <Typography variant= "subtitle2" color ="secondary">
      <div style ={{margin:"10px"}}> Wrath Twitter Ratio
      </div>
    </Typography>
    <Typography variant= "caption" color ="secondary">
    <div style={{margin:"5px 1px 5px 1px"}} >
      <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#263238"}}> &nbsp;</span> >0.6
    </div>
    <div style={{margin:"5px 1px 5px 1px"}} >
      <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#37474f"}}> &nbsp;</span> 0.45-0.6
    </div>
    <div style={{margin:"5px 1px 5px 1px"}}>
      <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#455a64"}}> &nbsp;</span> 0.4-0.45
    </div>
    <div style={{margin:"5px 1px 5px 1px"}}>
      <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#546e7a"}}> &nbsp;</span>  0.35-0.4
    </div>
    <div style={{margin:"5px 1px 5px 1px"}}>
      <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#607d8b"}}> &nbsp;</span> 0.3-0.35
    </div>
    <div style={{margin:"5px 1px 5px 1px"}}>
      <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#90a4ae"}}> &nbsp;</span> 0.15-0.3
    </div>
    <div style={{margin:"5px 1px 5px 1px"}}>
      <span style={{margin: "5px", fontSize:"15px", paddingLeft:"30px", background:"#cfd8dc"}}> &nbsp;</span> 0-0.15
    </div>
    </Typography>
  </Paper>
  )
}


}
}

export default withStyles(styles)(ColorBar);