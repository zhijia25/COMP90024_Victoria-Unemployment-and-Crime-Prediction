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
import {withStyles,Avatar,Card, CardHeader, CardContent, Typography, Divider, AppBar,List, ListItem,Tabs} from '@material-ui/core';
import luke from '../../data/image/Luke.jpg'
import Andy from '../../data/image/andy.jpg'
import echo from '../../data/image/echo.jpg'
import zhijia from '../../data/image/zhijia.jpg'
import carina from '../../data/image/carina.jpg'

//UI

const styles = theme =>({
  card:{
    width:"80%",
    padding:"20px",
    margin:"25px",
    backgroundColor:"#eceff1",
    boxShadow:"0 2px 8px 0 #d7d7d7"
  },
  avatar:{
    margin: 2,
    width: 130,
    height: 130,

  },cardContent:{
    
    backgroundColor:"#eceff1"
  }

});



class PersonCard extends Component{
  constructor(props){
    super(props);
    this.state = {
    };
}



render(){
const {classes} =  this.props;
let avater = luke;
if(this.props.name  === "Pengcheng Yao"){
  avater = Andy
}else if (this.props.name  === "Chenyang Lu"){
  avater = luke
}else if ( this.props.name  === "Zhijia Lu"){
  avater = zhijia
}else if ( this.props.name  === "Jing Du"){
  avater = carina
}else{
  avater = echo
}

const detialInfo = this.props.Introduction.map((text) =>
<ListItem key={text} style={{}}>
{text}
</ListItem>
);


  return(
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" src={avater} className={classes.avatar}>
            </Avatar>
          }
          title={
            <div className={classes.header}>
            <Typography variant = "h4" color="inherit">
            {this.props.name}
            </Typography>
            </div>
          }
          subheader={
            <Typography variant = "body2" color="inherit">
            {this.props.role}
            </Typography>
          }
        />
          <CardContent classes = {{
            root:classes.cardContent
          }}>
            <div style={{margin:"5px", backgroundColor:"#fffff"}}>
            <Divider variant="middle"/>
            <List>
            <ListItem key= "0">
              {this.props.Introduction[0]}
              </ListItem>
              <ListItem key= "1">
              {this.props.Introduction[1]}
              </ListItem>
              <ListItem key= "2">
              <a href={this.props.Introduction[2]}>{this.props.Introduction[2]}</a>
              </ListItem>
            </List>
            </div>
          </CardContent>

      </Card>
  )
}
}

export default withStyles(styles)(PersonCard);