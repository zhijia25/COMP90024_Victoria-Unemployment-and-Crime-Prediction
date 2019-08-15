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
import {withStyles, Grid, Paper, ListItem , List, Divider,Typography  } from '@material-ui/core';
import ShowChart from '@material-ui/icons/ShowChart';
import TableChart from '@material-ui/icons/TableChart';
import Highlight from '@material-ui/icons/Highlight'
import CrimeChart from './CrimeChart'
import UnemploymentChart from './UnemploymentChart'
import SummaryTable from './SummaryTable'
//UI
 
const styles = theme => ({
    root: {
        flexGrow: 1,
      },
      divider:{
          color:"#fffff",
          backgrounColor:"#fffff",
          background:"#fffff",
          border:"5px",
          height:"2px"
      }

});



class DataVisualizationPage extends Component{
  constructor(props){
    super(props);
    this.state = {
        value:"crime",
    };
}

handleClick = (input) => {
    this.setState({value:input});
  };



render(){
const {classes} =  this.props;
  return(
      <div>
        <Grid container className={classes.root} spacing={24}>
            <Grid item xs={2}>
                <Paper style= {{width:"220px", backgroundColor:"#78909c",margin:"30px 20px 10px 20px"}}>
                <Typography variant="subtitle1" color="error">
                <List component="nav">
                    <ListItem  button onClick={()=>this.handleClick("crime")} >
                    <ShowChart styles ={{marginRight:"10px",padding:"5px"}}/>
                    <p style={{paddingLeft:"6px"}}>
                    Crime/Twitter
                    </p>
                    </ListItem >
                    <li>
                        <Divider variant="fullwidth" light />
                    </li>

                    <ListItem  button onClick={()=>this.handleClick("unemployment")} >
                    <ShowChart/>
                    <p style={{paddingLeft:"6px"}}>
                    Unemployment/Twitter
                    </p>
                    </ListItem >
                    <li>
                        <Divider variant="fullwidth" />
                    </li>

                    <ListItem  button onClick={()=>this.handleClick("table")}>
                    <TableChart/>
                    <p style={{paddingLeft:"6px"}}>
                    Summary Table
                    </p>
                    </ListItem>

                </List>
                </Typography>
                </Paper>
            </Grid>  
            <Grid item xs={10}>
            {this.state.value === "crime" && <CrimeChart
                        twitterData = {this.props.twitterData}
                        unemploymentData = {this.props.unemploymentData}
                        crimeData = {this.props.crimeData}/>}
            {this.state.value === 'unemployment' && <UnemploymentChart
                        twitterData = {this.props.twitterData}
                        unemploymentData = {this.props.unemploymentData}
                        crimeData = {this.props.crimeData}/>}
            {this.state.value === 'table' && 
            <SummaryTable 
            twitterData = {this.props.twitterData}
            unemploymentData = {this.props.unemploymentData}
            crimeData = {this.props.crimeData}
            
            />}
            

            </Grid>  
            
        </Grid>
</div>
  )
}
}

export default withStyles(styles)(DataVisualizationPage);