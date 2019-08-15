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
import {withStyles,Typography, Avatar,Card, CardHeader, CardContent,Grid} from '@material-ui/core';
import ReactDOM from "react-dom";

//UI
import PersonCard from './PersonCard'
const styles = theme =>({
  aboutUsText:{
    // alignContent:"center", 
    textAlign:"center",  
    verticalAlign: "middle",
    width:"100%",
    padding: "5px",
    margin:"10px 10px 20px 10px auto",
    // borderStyle:"solid"


  }

});



class AboutUs extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
}

componentDidMount(){
  console.log("hre")
  const here = this.props.unemploymentData
}



render(){
  console.log("here")
const {classes} =  this.props;
  return(
    <div style={{height:1500, margin:"20px 20px 20px 20px"}} >

      <div className={classes.aboutUsText}>
      <Typography variant = "h2" color ="primary">
      <div>
      About Us
      </div>
      </Typography>
      <Typography variant = "h6" color ="primary">
      <div style={{marin:"0 auto", padding:"80px",textAlign:"center"}}>
      The Victoria Unemployment and Crime (VUC) Prediction project is designed to collect and analyze the twitter post located within Victoria,
       Australia. Sentiment analysis is conducted on the harvested tweets to identify the ratio of wrath posts in each local government area.
       rther development of regression model is used to identify the relationship between the ratio of wrath tweets and two social factors:
        crime rate and unemployment rate, for years from 2014 to 2016. This model is used to predict future crime and unemployment rate in
         each area based on the currently streaming collection of Twitter data.<br/> <br/>
This project is designed and developed by a team of University of Melbourne students. Detailed information can be found below.
      </div>
      </Typography>
      </div>
      
      <div style ={{margin:"20px"}}>
      <Grid container spacing={16}>
      <Grid md={6} lg={4}>
        <PersonCard
        name = {"Chenyang Lu"}
        role ={"Front-end Developer"}
        Introduction = {["Front-end development and data visualization",  "Chenyang is a Master of Information Technology student, currently working on his capstone project under the supervision of Prof. Rui Zhang. He is on the 2018 Engineering Dean's List"
        ," https://www.linkedin.com/in/chenyang-lu-9ab85b148/"]}
        />
        </Grid>
        <Grid md={6} lg={4}>
        <PersonCard
        name = {"Echo Gu"}
        role ={"Data Analyst"}
        Introduction = {["Data analytic and intepretation", "Echo is a Master of Data Science student, currently teaching senior Mathematics at Lauriston Girls’ School. She is responsible for the data analysis and scenario interpretation of this project.","https://www.linkedin.com/in/echogu/"]}
        />
        </Grid>
        <Grid md={6} lg={4}>
        <PersonCard
        name = {"Jing Du"}
        role ={"Database Administrator"}
        Introduction = {["Database design and administration", "Jing is a Master of Information Technology student. Her artificial intelligence project is one of the finalists in the 2018 competition. She is responsible for the database design and administration in this project.",
        "https://github.com/Carina827"]}     
        />
        </Grid>
        <Grid md={6} lg={4}>
        <PersonCard
        name = {"Zhijia Lu"}
        role ={"Back-end Developer"}
        Introduction = {["Twitter harvesting and back-end development",  "Zhijia is a Master of Information Technology student, previously completed Bachelor of Mathematics at the University of Liverpool. He is responsible for back-end development and data harvesting in this project.","https://github.com/zhijia25"]}      
        />
        </Grid>
        <Grid md={6} lg={4}>
        <PersonCard
        name = {"Pengcheng Yao"}
        role ={"Architecture"}
        Introduction = {["Architecture design and implementation",  "Pengcheng is a Master of Information Technology student. His artificial intelligence project is one of the finalists in the 2018 competition. He is responsible for the architecture design and implementation of this project.","https://github.com/AndyYao17"]}     
        />
        </Grid>
        <Grid md={6} lg={4}/>
    </Grid>
    </div>
    </div>
  )
}
}

export default withStyles(styles)(AboutUs);