
const port = 7070
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
    console.log(this.obj)
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
    res.send(JSON.stringify(_register.createUser(obj)))
    //console.log(this.obj)
})

app.listen(port)