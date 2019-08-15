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

export const defineColorBasedOnCrimeRate = (name, crimeData) => {
    if (crimeData.hasOwnProperty(name.toLowerCase())) {
        if (crimeData[name.toLowerCase()]["crime_ratio"] < 1000) {
            return "#cfd8dc"
        } else if (crimeData[name.toLowerCase()]["crime_ratio"] < 1500) {
            return "#90a4ae"
        } else if ( crimeData[name.toLowerCase()]["crime_ratio"] < 2000) {
            return "#607d8b"            } 
        else if (crimeData[name.toLowerCase()]["crime_ratio"] < 2500) {
                return "#546e7a"
        } else if ( crimeData[name.toLowerCase()]["crime_ratio"] < 3000) {
                return "#455a64"
        } else if ( crimeData[name.toLowerCase()]["crime_ratio"] < 3500) {
            return "#37474f"
        } else {
            return "#263238"
        }
    } else {

        return "#cfd8dc"
    }

}

export const defineColorBasedOnEmployment = (name, unemploymentData,year) => {
    let unemploymentRatio;
    if (unemploymentData.hasOwnProperty(name.toLowerCase())) {
        if (year === "2014") {
            unemploymentRatio = unemploymentData[name.toLowerCase()]["14"]
        } else if (year === "2015") {
            unemploymentRatio = unemploymentData[name.toLowerCase()]["15"]
        } else if (year ==="2016") 
        {
            unemploymentRatio = unemploymentData[name.toLowerCase()]["16"]

        } else if (year === "2017") {
            unemploymentRatio = unemploymentData[name.toLowerCase()]["17"]

        } else if (year === "2018") {
            unemploymentRatio = unemploymentData[name.toLowerCase()]["18"]
        }
    } else {
        unemploymentRatio = 5
    }

    if (unemploymentRatio < 4) {
        return "#cfd8dc"
    } else if (unemploymentRatio < 4.5) {
        return "#90a4ae"
    } else if ( unemploymentRatio < 5) {
        return "#607d8b"            } 
    else if (unemploymentRatio < 5.5) {
            return "#546e7a"
    } else if ( unemploymentRatio< 6) {
            return "#455a64"
    } else if ( unemploymentRatio < 6.5) {
        return "#37474f"
    } else {
        return "#263238"
    }
}


export const defineColorBasedOnTwitter = (name, twitter) => {
    // const crimeData = this.state.crimeData
    // console.log(name)
    // console.log(twitter)
    if (twitter.hasOwnProperty(name.toLowerCase())) {
        if (0 <twitter[name.toLowerCase()]["negative_rate"] < 0.15) {
            return "#cfd8dc"
        } else if (0.15 <= twitter[name.toLowerCase()]["negative_rate"] < 0.3) {
            return "#90a4ae"
        } else if ( 0.3 <=twitter[name.toLowerCase()]["negative_rate"] < 0.35) {
            return "#607d8b"            } 
        else if (0.35 <= twitter[name.toLowerCase()]["negative_rate"] < 0.4) {
                return "#546e7a"
        } else if ( 0.4 <=twitter[name.toLowerCase()]["negative_rate"] < 0.45) {
                return "#455a64"
        } else if ( 0.45 <=twitter[name.toLowerCase()]["negative_rate"] < 0.6) {
            return "#37474f"
        } else {
            return "#263238"
        }
    } else {

        return "#cfd8dc"
    }

}
