const express = require('express')
const { response } = require('express')
const routes = express.Router()

routes.get('/', (require, response) => {
    return response.redirect("instructors")
})

routes.get('/instructors', (require, response) => {
    return response.render("instructors/index")
})

routes.get('/instructors/create', (require, response) => {
    return response.render("instructors/create")
})

routes.post("/instructors", (require, response) => {
    //req.query
    //req.body
    
    return response.send(require.body)
})

routes.get('/members', (require, response) => {
    return response.send("members")
})

module.exports = routes