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
import {withStyles, FormControl,NativeSelect,InputBase} from '@material-ui/core';



//methods
import {defineColorBasedOnCrimeRate,defineColorBasedOnEmployment,defineColorBasedOnTwitter} from '../../controllers/defineColorMethod'

//UI
import Map from '../Map';
import InfoCard from '../reusableComponent/InfoCard'
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
    boxShadow:"0 2px 8px 0 #d7d7d7"
  },
  colorBar:{
    zIndex: 1250,
    position:"absolute",
    top: "490px",
    left:"890px", 

  },
  infocard:{
    zIndex: 1300,
    position:"absolute",
    top:"115px",
    left: "1050px",
    width:"400px",
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



export class MapSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            lgaBoundary: [],
            geoData: [],
            crimeData:this.props.crimeData,
            twitterData:this.props.twitterData,
            unemploymentData:this.props.unemploymentData,
            maptype: "crime",
            currentCityCrimeData: this.props.crimeData['2016']['melbourne'],
            year: "2016",
            cityName:"melbourne"
        };
        this.updatePolygon = this.updatePolygon.bind(this);
        this.renderPolygon = this.renderPolygon.bind(this);
    }



    updatePolygon(map){
        const year = this.state.year
        let twitterData = this.state.twitterData[year]
        let unempoymentData = this.state.unemploymentData
        let crimeData = this.state.crimeData[year]

        if (this.state.maptype == "crime") {
            map.data.setStyle(function (feature) {
                var lga = feature.getProperty('vic_lga__3');
                var color = defineColorBasedOnCrimeRate(lga, crimeData);

                return {
                    fillColor: color,
                    strokeWeight: 1,
                    strokeOpacity: 0.3,
                    fillOpacity: 0.8,
                };
            });
        }
        else if (this.state.maptype == "unemployment") {
            map.data.setStyle(function (feature) {
                var lga = feature.getProperty('vic_lga__3');
                var color = defineColorBasedOnEmployment(lga, unempoymentData,year );

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
            var color = defineColorBasedOnTwitter(lga, twitterData );

            return {
                fillColor: color,
                strokeWeight: 1,
                strokeOpacity: 0.3,
                fillOpacity: 0.8,
            };
        });
        }

        // map.data.addListener('click', function (event) {
        //     let cityName = event.feature.getProperty('vic_lga__3')
        //     clickListenerForEachCity(cityName)
        // });
    }


    renderPolygon(map){
        map.data.loadGeoJson(
            'http://172.26.37.33:8080/crimitter/api/tasks/boundary'
        );
        
        const clickListenerForEachCity = this.clickListenerForEachCity
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

        if(this.state.year != "2017" && this.state.year != "2018"){
        let currentcityCrimeData = Object.assign({}, this.state.crimeData[this.state.year][cityName.toLowerCase()])
        this.setState({
            currentCityCrimeData: currentcityCrimeData,
            cityName:cityName.toLowerCase()
        })
        }

    }

    //hanlde mapdata change
    handleChange = event => {
        if(event.target.value === "crime"){
            console.log(this.state.year)
            if(this.state.year === "2014"|| this.state.year === "2015"|| this.state.year === "2016"){
                this.setState({
                    maptype: event.target.value
                });
            }
            else{
                alert("Sorry, we don't have data for crime at " + this.state.year + ", please select other year")
            }
        }else if(event.target.value === "unemployment"){
            if(this.state.year === "2019"){
                alert("Sorry, we don't have data for unemployment at " + this.state.year)
            }
            else{
                this.setState({
                    maptype: event.target.value
                });
            }
        }else{
        this.setState({
            maptype: event.target.value
        });
    }
    };

    //hanlde Year Change
    handleYearChange = event => {
        if(event.target.value === "2018" || event.target.value === "2017"){
            if(this.state.maptype === "crime"){
                alert("Sorry, we don't have data for crime at " + this.state.year + ", please select other year")
            }else{
                this.setState({
                    year: event.target.value
                });
            };
            }
        
        else{
        this.setState({
            year: event.target.value
        });
    }
    };


  render() {

    const {classes} = this.props;

    return ( 
      <div>
        <div className={classes.mapSection}>
          < Map id="map" options={ { center: { lat: -37.4136, lng: 144.9631 }, zoom: 7 } } onMapLoad={ (map)=>
            this.renderPolygon(map)
            } updatePolygon = {this.updatePolygon}
          />
        </div>

        <div className={classes.colorBar}>
          <ColorBar maptype = {this.state.maptype}/>
        </div>

        <div className = {classes.infocard}>
          <InfoCard 
            currentCityCrimeData = {this.state.currentCityCrimeData} 
            cityName = {this.state.cityName} 
            year = {this.state.year}
            maptype = {this.state.maptype}
            unemploymentData = {this.state.unemploymentData}
            twitterData = {this.state.twitterData}
            unemploymentData = {this.state.unemploymentData}
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
            <option value="crime">Crime Heat Map</option>
            <option value="unemployment">Unemployment Map</option>
            <option value="twitter">Wrath Twitter Heat Map</option>
          </NativeSelect>
        </FormControl>
        </div>

        <div className= {classes.yearDropDown}>
        <FormControl className={classes.margin}>
          <NativeSelect
            value={this.state.year}
            onChange={this.handleYearChange}
            input={<BootstrapInput name="mapType" id="age-customized-native-simple" />}
          >
            {/* <option value="" /> */}
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            {/* <option value="2017">2017</option>
            <option value="2018">2018</option> */}
          </NativeSelect>
        </FormControl>
        </div>


      </div>
    
    )
        }
  
}


export default withStyles(styles)(MapSection);