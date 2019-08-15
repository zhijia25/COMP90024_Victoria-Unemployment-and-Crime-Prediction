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

import {retrunTable} from './processDisplayData'

  const getData = (twitter,crime,unemployment,year) =>{
    let DataCollection = retrunTable (twitter,crime,unemployment)
    let outputArray = []
    for(var i =0; i< DataCollection.length; i++){
      // console.log(DataCollection[i][5])
      if(DataCollection[i][5] === year){
      let temp = {label:DataCollection[i][0], x: parseFloat(DataCollection[i][2]), y: parseFloat(DataCollection[i][1]),z:DataCollection[i][4]}
      outputArray.push(temp)
      }
    }
    // console.log(outputArray)
    return outputArray
  }

export const crimeNtwitter2014 = (twitter,crime,unemployment) => {
  return {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Wrath Twitter Ratio V.S.  Offence Rate 2014",
    fontSize: 26
    },
    axisX: {
      title: "Offence Rate per 100000 capita",
    logarithmic: true
    },
    axisY: {
      title: "Wrath Twitter Ratio",
      includeZero:false,
    },
    data: [{
      type: "bubble",
      indexLabel: "{label}",
      toolTipContent: "<b>{label}</b><br>Offence Rate:{x}<br>Wrath Twitter Ratio : {y} <br>Population: {z} ",
      dataPoints: getData(twitter,crime,unemployment,"2014")
    }]
  }}

  export const crimeNtwitter2015 = (twitter,crime,unemployment) =>{
    return {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Wrath Twitter Ratio V.S. Offence Rate 2015",
    fontSize: 26
    },
    axisX: {
      title: "Offence Rate per 100000 capita",
    logarithmic: true
    },
    axisY: {
      title: "Wrath Twitter Ratio",
      includeZero:false
    },
    data: [{
      type: "bubble",
      indexLabel: "{label}",
      toolTipContent: "<b>{label}</b><br>Offence Rate:{x}<br>Wrath Twitter Ratio : {y} <br>Population: {z} ",
      dataPoints: getData(twitter,crime,unemployment,"2015")
    }]
  }}

  export const crimeNtwitter2016 = (twitter,crime,unemployment) =>{
    return {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light1", // "light1", "light2", "dark1", "dark2"
    title:{
      text: "Wrath Twitter Ratio V.S. Offence Rate 2016",
    fontSize: 26
    },
    axisX: {
      title: "Offence Rate per 100000 capita",
    logarithmic: true
    },
    axisY: {
      title: "Wrath Twitter Ratio",
      includeZero:false,
    },
    data: [{
      type: "bubble",
      indexLabel: "{label}",
      toolTipContent: "<b>{label}</b><br>Offence Rate:{x}<br>Wrath Twitter Ratio : {y} <br>Population: {z} ",
      dataPoints: getData(twitter,crime,unemployment,"2016")
    }]
  }}