const express = require('express')
const { response } = require('express')
const routes = express.Router()

routes.get('/', (require, response) => {
    return response.redirect("teachers")
})

routes.get('/teachers', (require, response) => {
    return response.render("teachers/index")
})

module.exports = routes