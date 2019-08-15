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

export const processCrimeData =(crimeData) =>{
    for (var key in crimeData){
        for(var city in crimeData[key]){
            crimeData[key][city]["crime_ratio"] = crimeData[key][city]["crime_ratio"] *100000
        }
    }
    return crimeData
}