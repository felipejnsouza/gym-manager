const fs = require('fs')
const data = require('../data.json')
const { response } = require('express')
const { age, date} = require('../utils')


exports.index = function(require, response){
    return response.render("instructors/index", {instructors: data.instructors})
}

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

        return response.redirect(`/instructors/${id}`)
    })

    // return response.send(require.body)
}

exports.edit = function(require, response) {
    const {id} = require.params

    const foundInstructor = data.instructors.find((instructor)=>{
        return instructor.id == id
    })

    if(!foundInstructor) return response.send("Instructor not found!")

    const birth = date(foundInstructor.birth).iso

    const instructor = {
        ...foundInstructor,
        birth: birth
    }

    return response.render('instructors/edit', {instructor})
}

exports.put = function(require, response) {
    const {id} = require.body
    let index = 0

    const foundInstructor = data.instructors.find((instructor, foundIndex)=>{
        if(instructor.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundInstructor) return response.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        ...require.body,
        birth: Date.parse(require.body.birth),
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return response.send("Write error!")

        return response.redirect(`/instructors/${id}`)
    })

}

exports.delete = function(require, response) {
    const {id} = require.body

    const filteredInstructors = data.instructors.filter(function(instructor){
        return instructor.id != id
    })

    data.instructors = filteredInstructors

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return response.send("write error")

        return response.redirect("/instructors")
    })
}

exports.create =  (require, response) => { response.render("instructors/create")}