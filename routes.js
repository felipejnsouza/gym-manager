const express = require('express')
const { response } = require('express')
const routes = express.Router()

routes.get('/', (require, response) => {
    return response.redirect("instructors")
})

routes.get('/instructors', (require, response) => {
    return response.render("instructors/index")
})

module.exports = routes