const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

const port = process.env.PORT

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/*
    Me imagino que tengo comprado el dominio a app.com
    De ahí con ese dominio puedo tener distintas rutas
        app.com/help
        app.com/about

    Entonces con app.get le decimos al servidor qué debería hacer cuando se le pone determinado url
*/

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) // esto es porque si no lo pongo, busca una carpeta que se llame views. Con esto le decimos que la carpeta "views" es esa que le di en el path (templates)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))




// app.get('/help', (req, res) => { // en este caso le estoy diciendo al servidor qué hacer cuando le ponen /help despues
//     res.send([{
//         name: 'Lucia',
//         age: 27
//     }, {
//         name: 'Juan',
//         age: 20
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send(path.join(__dirname, '../public/about.html'))
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lucia'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Lu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'explanation of error',
        title: 'Help',
        name: 'Lucía Quagliata'
    })
}) 

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    } 

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location
            })
        })
    })


    
    
})

app.get('/products', (req, res) => {
    // console.log(req.query) ==> cuando yo busco http://localhost:3000/products?search=games&rating=5 esto me devuelve { search: 'games', rating: '5' } en la consola
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404pg', {
        errorMessage: 'Help article not found',
        name: 'Luli',
        title: '404'
    })
})

app.get('*', (req, res) => {
    res.render('404pg', {
        errorMessage: 'Page not found',
        name: 'Luli',
        title: '404'
    })
})

// para inicializar:

app.listen(port, () => { // 3000 es el puerto (local en mi compu)
    console.log('Server is up on port ' + port)
})

// HASTA ACÁ LO QUE HIZO ESTO FUE QUE CUANDO YO BUSQUE EN MI COMPU localhost:3000 (en google) ME APARECIO LA PAGINA OCN EL MENSAJE DE HELLO EXPRESS
