const express = require('express')
const { response } = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', (require, response) => {
    return response.redirect("instructors")
})

routes.get('/instructors', instructors.index)

routes.get('/instructors/create', (require, response) => {
    return response.render("instructors/create")
})

routes.get('/instructors/:id',instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)


routes.post("/instructors", instructors.post)

routes.put('/instructors', instructors.put)

routes.delete('/instructors', instructors.delete)

routes.get('/members', (require, response) => {
    return response.send("members")
})

module.exports = routes