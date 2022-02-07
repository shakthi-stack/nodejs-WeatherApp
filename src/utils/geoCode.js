const request = require('request');

const geoCode = (addr, callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?access_token=pk.eyJ1Ijoic2hha3RoaXNhcmF2YW5hbiIsImEiOiJja3o2bno3dWIwdDRiMnlwcnFqb3JiYW0yIn0.hQkUPj5DLcm8ebp8xCafMw&limit=1`;
        request({
            url: url,
            json:true
        },(e,res)=>{
            if(e){
                callback("Unable to acquire data",undefined);
                // console.log("Unable to acquire data");
            }else if(res.body.features.length === 0){
                callback("No such place",undefined)
                // console.log("No such place")
            }else if(res.body.message){
                callback(data.message,undefined)
                // console.log(data.message);
            }
            else{
                const data = res.body;
            // console.log(data.current);
                callback(undefined,{
                    latitude: data.features[0].center[0],
                    longitude: data.features[0].center[1],
                    location: data.features[0].place_name
                })
            // console.log(`Latitude: ${data.features[0].center[0]}, Longitude:${data.features[0].center[1]}.`);
            }
            
        })  
};

module.exports = geoCode;
