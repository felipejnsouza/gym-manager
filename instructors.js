const fs = require('fs')
const data = require('./data.json')
const { response } = require('express')
const { age, date} = require('./utils')

// Show "get"
exports.show = function(require, response){
    const {id} = require.params

    const foundInstructor = data.instructors.find((instructor)=>{
        return instructor.id == id
    })

    if(!foundInstructor) return response.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-br").format(foundInstructor.created_at),
    }


    return response.render('instructors/show', {instructors: instructor})

}

// Create "post"
exports.post = function(require, response){
    //req.query
    //req.body
    
    const keys = Object.keys(require.body)

    for(key of keys){
        if(require.body[key] == "")
            return response.send('Please, fill all fields!')
    }
    
    let {avatar_url, name, birth, gender, services} = require.body
    
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1) 


    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return response.send("Write file error!")

        return response.redirect('/instructors')
    })

    // return response.send(require.body)
}

// Edit "get"

exports.edit = function(require, response) {
    const {id} = require.params

    const foundInstructor = data.instructors.find((instructor)=>{
        return instructor.id == id
    })

    if(!foundInstructor) return response.send("Instructor not found!")

    const birth = date(foundInstructor.birth)

    const instructor = {
        ...foundInstructor,
        birth: birth
    }

    return response.render('instructors/edit', {instructor})
}