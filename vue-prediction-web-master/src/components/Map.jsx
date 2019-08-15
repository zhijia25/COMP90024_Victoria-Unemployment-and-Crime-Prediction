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


import React, { Component } from 'react';
import { render } from 'react-dom';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map:""
    };
    this.onScriptLoad = this.onScriptLoad.bind(this)

  }


  onScriptLoad() {
    const map = new window.google.maps.Map(
      document.getElementById(this.props.id),
      this.props.options);
    this.props.onMapLoad(map)
    this.setState({map:map})
  }


  componentDidUpdate(){
    this.props.updatePolygon(this.state.map)
  }

  componentDidMount() {
    if (!window.google) { // if no window.google , we do API call
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.src = `https://maps.google.com/maps/api/js?key=AIzaSyA0MUxlexPWGMwT0HMQtq0NzRVqmf87O5I`;
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
      // Below is important. 
      //We cannot access google.maps until it's finished loading
      s.addEventListener('load', e => {
        this.onScriptLoad()
      }) // once loaded, load the script 
    } else {
      this.onScriptLoad()
    }
  }

  render() {
    return (
      <div style={{ width: "100%", height: "100%" }} id={this.props.id} />
    );
  }
}

export default Map