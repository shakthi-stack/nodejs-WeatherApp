const request = require('request');

const forecast = (latitude,longitude,callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=1350ac4850640c962af8f90ac8050eb7&query=${longitude},${latitude}&units=m`;
            request({
            url: url,
            json:true
        },(e,res)=>{
            if(e){
                callback("Unable to acquire data.", undefined);
                // console.log("Unable to acquire data.");
            }else if(res.body.error){
                callback("Unable to find location", undefined);
                // console.log("Unable to find location");
            }
            else{
                const data = res.body;
                // console.log(data.current);
                callback(undefined,`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike}.`)
                // console.log(`${data.current.weather_descriptions[0]}. It is currently ${data.current.temperature} degrees out. It feels like ${data.current.feelslike}.`);
            }
        })
};

module.exports = forecast;