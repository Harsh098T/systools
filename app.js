const express = require('express')
const db =require("./db/connection")
const bodyparser= require('body-parser')
const app= express()
const model = require('module')


app.set('view engine', 'ejs')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.use(require('./router/controller'))




app.listen(5000, () => {
    console.log('port running 5000')
})


