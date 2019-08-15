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

export const getTwitterData = () => {
    let twitterUrl = "http://172.26.37.243:4444/todo/api/v1.0/tasks/twitter"

    var opts = {
        method: "GET", //请求方法
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }
    fetch(twitterUrl, opts)
    .then(res => {
        res.json().then((dataJson) => {
            console.log(dataJson)
            return dataJson;
        })
    })
}




export const getCrimeData = () => {
    let crimeUrl = "http://172.26.37.243:4444/todo/api/v1.0/tasks/crime"
    const promise = new Promise(function (resolve, reject) {
        var opts = {
            method: "GET", //请求方法
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        resolve(fetch(crimeUrl, opts).then(res => {
            res.json().then((dataJson) => {
                console.log(dataJson)
                return dataJson;
            })
        }));
    });
    return promise
}

export const getUnemploymentData = () => {
    let unemploymentUrl = "http://172.26.37.243:4444/todo/api/v1.0/tasks/unemployment"
    const promise = new Promise(function (resolve, reject) {
        var opts = {
            method: "GET", //请求方法
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }

        resolve(fetch(unemploymentUrl, opts).then(res => {
            res.json().then((dataJson) => {
                console.log(dataJson)
                return dataJson;
            })
        }));
    });
    return promise
}