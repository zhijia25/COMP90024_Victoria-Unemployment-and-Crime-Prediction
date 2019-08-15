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


import React , { Component } from 'react';
import MUIDataTable from "mui-datatables";
import ReactDOM from "react-dom";
import { Typography, Paper } from '@material-ui/core';
import {retrunTable} from '../../controllers/processDisplayData'




class SummaryTable extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      data: []
    };
}
componentDidMount(){
  const tempData = retrunTable(this.props.twitterData, this.props.crimeData, this.props.unemploymentData)
  this.setState({data:tempData})

}


render(){
  const columns = ["City Name", "Wrath Twitter", "Crime Rate",  "Unemployment", "Population","Year"];


  let options = {
    filterType: "dropdown",
    responsive: "scroll"
  };

  return(
    <Paper style ={{width:"80%", margin:"40px 20px 20px 20px"}}>
    <MUIDataTable
      title={"Twitter Crime and unemployment"}
      data={this.state.data}
      columns={columns}
      options={options}
    />
    </Paper>
  )
}
}

export default SummaryTable;