
const port = 2222
const _express = require('express')
const app = _express()
const _path =  require('path')
const _bodyParser = require('body-parser')
var obj = undefined
const _authenticate = require('./authentication') 
const _register = require('./register')   

app.use(_bodyParser.urlencoded({extended: true}))


app.post('/get-user', (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('content-type', 'aplication/json')
    res.send(JSON.stringify(this.obj))
    
})

app.post('/authentication', (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('content-type', 'aplication/json')
    var aux = req.body
    aux = _authenticate.compareLogin(aux)
    res.send(JSON.stringify(aux))
    this.obj = aux
})
app.post('/set-undf', (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('content-type', 'aplication/json')
    this.obj = undefined
})

app.post('/register', (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('content-type', 'aplication/json')
    var obj = req.body
    var registro = _register.createUser(obj);

    console.log(`${Object.values(registro)}`)
    res.send(JSON.stringify(registro))
})

app.post('/rooms-info', (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('content-type', 'aplication/json')
    var rooms= require("../json-files/rooms.json")
    res.send(JSON.stringify(rooms))
})

app.post('/alloc', (req, res, next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('content-type', 'aplication/json')
    var allocate = require('./allocate');
    allocate.setAllocation(req.body);

})


app.listen(port)