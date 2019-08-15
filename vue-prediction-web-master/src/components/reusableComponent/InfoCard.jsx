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
import {withStyles,Typography,Card, Divider,ListItem, AppBar,Tabs, Tab,CardHeader,CardContent, List} from '@material-ui/core';


//Data

//UI


const styles = theme => ({
  map:{
    width: "500px",
    height: "500px"
  },
  card:{
    backgroundColor: theme.palette.primary.light,
},
tabs:{
    boxShadow:'none',
    shadow:'none',
    backgroundColor: theme.palette.primary.light,
},
cardContent: {
    backgroundColor: theme.palette.secondary.light,
},


});


function TabContainer(props) {
    return (
    <Typography variant = "body1">
        {props.children}
    </Typography>
    );
}



export class InfoCard extends Component{
  constructor(props){
    super(props);
    this.state = {
        previousMaptype: this.props.maptype,
        value:this.props.maptype,

    };
}

handleTab = (event,value) => {
    this.setState({value});
}
componentDidUpdate(){
    if(this.state.previousMaptype != this.props.maptype){
        this.setState({
            value:this.props.maptype,
            previousMaptype:this.props.maptype
        })
    }
}



render(){
    const {value} = this.state;
    const {classes} = this.props; 
    return(
        <div>
            <Card classes={{
                    root: classes.card, // class name, e.g. `classes-nesting-root-x`
                  }}>
                <CardHeader title={
                <Typography variant = "h5" color ="error">
                        {this.props.cityName.toUpperCase()}
                </Typography>
                 } 
                 color="#fffff" />
                <AppBar position="static" color="secondary">
                    <Tabs value={value} color= ""
                    onChange={this.handleTab} 
                    classes={{
                        root: classes.tabs,
                    }}>
                        <Tab value="twitter" label="Wrath Twitter" />
                        <Tab value="crime" label="Crime Data" />
                        <Tab value="unemployment" label="Unemployment" />
                    </Tabs>
                    <CardContent className ={classes.cardContent}>
                    
                    {value === "crime" &&
                    <TabContainer>
                        <Typography variant = "body1" color ="primary">
                        {this.props.year != "2017" && this.props.year != "2018" && this.props.year != "2019" &&
                        <List dense= {true}>
                            <ListItem>
                            Crimes Against the Person : {this.props.currentCityCrimeData["a_total"].toString()}
                            </ListItem>
                            <ListItem>
                            Public Order and Security Offences: {this.props.currentCityCrimeData["d_total"].toString()}
                            </ListItem>
                            <ListItem>
                                Total number of Crime: {this.props.currentCityCrimeData["ad_total"].toString()}
                            </ListItem>
                            <ListItem>
                                Total population: {this.props.currentCityCrimeData["lga_erp"].toString()}
                            </ListItem>
                            <ListItem>
                                Offence rate (per 100000 capita): {this.props.currentCityCrimeData["crime_ratio"].toFixed(3)}
                            </ListItem>
                        </List>
                        }
                        {
                            this.props.year != "2014" && this.props.year !=  "2015" && this.props.year != "2016" &&
                            <div>
                                Currently no crime data for this year
                            </div>
                        }
                        </Typography>
                    </TabContainer>}

                    {value === "twitter" &&
                    <TabContainer>
                        <Typography variant = "body1" color ="primary">

                        <List dense= {true}>
                        <ListItem>
                                Total wrath twitter post: {this.props.twitterData[this.props.year][this.props.cityName]["total_negative_twitter_count"].toString()}
                            </ListItem>
                            <ListItem>
                                Total twitter post: {this.props.twitterData[this.props.year][this.props.cityName]["total_twitter_post"].toString()}
                            </ListItem>
                            <ListItem>
                                Wrath twitter ratio: {this.props.twitterData[this.props.year][this.props.cityName]["negative_rate"].toFixed(4)}
                            </ListItem>
                        </List>
                        
                        {
                            this.props.year != "2014" && this.props.year !=  "2015" && this.props.year != "2016" &&
                            <div>
                                Currently no crime data for this year
                            </div>
                        }
                        </Typography>
                    </TabContainer>}

                    {value === "unemployment" &&
                    <TabContainer>
                        Unemployment rate for {this.props.year}: {this.props.unemploymentData[this.props.cityName][this.props.year.substr(2, 3)].toFixed(3)}%
                    </TabContainer>}
                    </CardContent>
                </AppBar>

            </Card>
        </div>



    )
}
}



export default withStyles(styles)(InfoCard);