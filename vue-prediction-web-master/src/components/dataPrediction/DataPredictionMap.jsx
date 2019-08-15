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
import React, {Component} from 'react';
import {withStyles,  FormControl,NativeSelect,InputBase} from '@material-ui/core';



//methods
import {defineColorBasedOnCrimeRate,defineColorBasedOnEmployment} from '../../controllers/defineColorBasedOnPrediction'

//UI
import Map from '../Map';
import InfoCard from './InforWindow'
import ColorBar from '../reusableComponent/ColorBar'

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing.unit * 3,
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    width: '200px',
    padding: '10px 26px 10px 12px',
    // transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);


const styles = theme => ({
  map: {
    width: "500px",
    height: "400px"
  },
  mapSection:{
    width: "1000px", 
    height:"600px",
    margin: "20px 10px 10px 10px", 
    // borderStyle: "solid", 
    // borderWidth: "3px", 
    // borderColor: "primary.main", 
    // borderRadius: 8
    boxShadow:"0 2px 8px 0 #d7d7d7"
  },
  colorBar:{
    zIndex: 1250,
    position:"absolute",
    top: "490px",
    left:"890px", 
    // height:"160px",
    // width:"120px",
    // backgroundColor:theme.palette.secondary.light,
  },
  infocard:{
    zIndex: 1300,
    position:"absolute",
    top:"115px",
    left: "1050px",
    width:"400px",
    // borderStyle: "solid", 
    // borderWidth: "3px", 
    // borderColor: "primary.main", 
    // borderRadius: 8
    boxShadow:"0 2px 8px 0 #d7d7d7"
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
  selectDropDown:{
    zIndex: 1350,
    position:"absolute",
    top:"130px",
    left: "765px",
    width: "242px",
    backgroundColor:theme.palette.common.white
  },
  yearDropDown:{
    zIndex: 1350,
    position:"absolute",
    top:"180px",
    left: "765px",
    width: "242px",
    backgroundColor:theme.palette.common.white
  }


});


const crimeDataPrediction = (twitterData) =>{
  const avg =  getAverageValue(twitterData)
  const gradient =  (-Math.pow(10,-6) * avg * avg) + (411316*avg) -84157
  const yIntercept = 64057 * avg + 371
  let crimeData = {}
  for(var key in twitterData){
    crimeData[key] = gradient * twitterData[key]  + yIntercept
  }
      
  return crimeData
}

const unemploymentPredication = (twitterData) =>{
  const avg =  getAverageValue(twitterData)
  console.log(avg)
  const yIntercept = (-91.5 * avg) + 2.1
console.log(yIntercept)
  let unemployment = {}
  for(var key in twitterData){
    unemployment[key] = (twitterData[key]*180) + yIntercept
  }
      
  return unemployment
}

const processTwitter = (twitter) => {
  let twitter2019 = twitter["2019"]
  let negativeTwitter2019 = {}
    for(var city in twitter2019){
      negativeTwitter2019[city] =twitter2019[city]["negative_rate"]
    }
  console.log(negativeTwitter2019)
  return negativeTwitter2019
}

const getAverageValue  =(twitter2019) =>{
  let sum = 0
  let count = 0
  for (var key in twitter2019){
    sum = sum + twitter2019[key]
    count = count +1
  }
  return sum/count
}



export class DataPredictionMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictedCrimeData:{},
            predictedUnemploymentData:{},
            unemploymentData:this.props.unemploymentData,
            maptype: "crime",
            cityName:"melbourne",
            currentPredictCrimeData :"None",
            currentPredictUnemploymentData:"None",
            loaded:false

        };
        this.renderPolygon = this.renderPolygon.bind(this);
        this.updatePolygon = this.updatePolygon.bind(this);
    }



    componentDidMount(){
      const twitter = processTwitter(this.props.twitterData)
      // console.log(twitter)
      const predictedUnemploymentData = unemploymentPredication(twitter)
      const predictedCrimeData = crimeDataPrediction(twitter)
      console.log(predictedUnemploymentData)
      console.log(predictedCrimeData)
      this.setState({
        predictedCrimeData:predictedCrimeData,
        predictedUnemploymentData:predictedUnemploymentData,
        loaded:true
      })
      
    }


    updatePolygon(map){

      const predictedUnemploymentData = this.state.predictedUnemploymentData
      const predictedCrimeData = this.state.predictedCrimeData
        if (this.state.maptype === "crime") {
            map.data.setStyle(function (feature) {
                var lga = feature.getProperty('vic_lga__3');
                var color = defineColorBasedOnCrimeRate(lga,predictedCrimeData);

                return {
                    fillColor: color,
                    strokeWeight: 1,
                    strokeOpacity: 0.3,
                    fillOpacity: 0.8,
                };
            });
        }
        else{
          map.data.setStyle(function (feature) {
            var lga = feature.getProperty('vic_lga__3');
            var color = defineColorBasedOnEmployment(lga, predictedUnemploymentData);

            return {
                fillColor: color,
                strokeWeight: 1,
                strokeOpacity: 0.3,
                fillOpacity: 0.8,
            };
        });
        }

    }


    renderPolygon(map){

        map.data.loadGeoJson(
            'http://172.26.37.33:8080/crimitter/api/tasks/boundary'
        );
        
        const clickListenerForEachCity = this.clickListenerForEachCity
        const crimedata = this.state.predictedCrimeData
        const UnemploymentData = this.state.predictedUnemploymentData
        map.data.addListener('click', function (event) {
            let cityName = event.feature.getProperty('vic_lga__3')
            clickListenerForEachCity(cityName)
        });

        map.data.addListener('mouseover', function (event) {
            map.data.overrideStyle(event.feature, {
                strokeWeight: 8,
                fillOpacity: 0.9
            });
        });

        map.data.addListener('mouseout', function (event) {
            map.data.revertStyle();
        });

        this.updatePolygon(map)

    }

    clickListenerForEachCity = (cityName) =>{
      const currentPredictCrimeData = this.state.predictedCrimeData[cityName.toLowerCase()]
      const currentPredictUnemploymentData = this.state.predictedUnemploymentData[cityName.toLowerCase()]
        this.setState({
            cityName:cityName.toLowerCase(),
            currentPredictCrimeData :currentPredictCrimeData,
            currentPredictUnemploymentData:currentPredictUnemploymentData
        })
        }
    

    //hanlde mapdata change
    handleChange = event => {
      this.setState({
        maptype: event.target.value
    });
    };

  render() {
    const {classes} = this.props;
    if(!this.state.loaded){
      return(
        <div>
          loading....
        </div>
      )
    }
    else{
    return ( 
      <div>
        <div className={classes.mapSection}>
          < Map id="map2" options={ { center: { lat: -37.4136, lng: 144.9631 }, zoom: 7 } } onMapLoad={ (map)=>
            this.renderPolygon(map)
            } updatePolygon = {this.updatePolygon}
          />
        </div>

        <div className={classes.colorBar}>
          <ColorBar maptype = {this.state.maptype}/>
        </div>

        <div className = {classes.infocard}>
          <InfoCard 
          cityName = {this.state.cityName}
          currentPredictCrimeData = {this.state.currentPredictCrimeData}
          currentPredictUnemploymentData = {this.state.currentPredictUnemploymentData}
          />
        </div>

        <div className= {classes.selectDropDown}>
        <FormControl className={classes.margin}>
          <NativeSelect
            value={this.state.mapType}
            onChange={this.handleChange}
            input={<BootstrapInput name="mapType" id="age-customized-native-simple" />}
          >
            {/* <option value="" /> */}
            <option value="crime">Prediction for Offence Rate</option>
            <option value="unemployment">Prediction for Unemployment Rate</option>
          </NativeSelect>
        </FormControl>
        </div>

        <div className= {classes.yearDropDown}>
        </div>


      </div>
    
    )}
        }


}
    
  

export default withStyles(styles)(DataPredictionMap);