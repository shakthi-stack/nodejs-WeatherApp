const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shakthi Saravanan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shakthi Saravanan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Shakthi Saravanan'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
             error:'Provide address'
         })
     }
    const address = req.query.address;
    geoCode(address, (error, data)=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(data.latitude, data.longitude, (error, Weatherdata) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address,
                location: data.location,
                Weather: Weatherdata
            })
        });
    });
})
app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
            error:'Provide search Term'
        })

    }

    console.log(req.query.search);
    // req.query
    res.send({
        products:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shakthi Saravanan',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Shakthi Saravanan',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port'+port)
})