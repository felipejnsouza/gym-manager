const Instructor = require('../models/Instructor')
const { age, date } = require('../../lib/utils')

module.exports = {
    index(require, response){
        Instructor.all(function(instructors){
            return response.render("instructors/index", {instructors})
        })
        
    },
    create(require, response){
        return response.render("instructors/create")
    },
    post(require, response){
        const keys = Object.keys(require.body)

        for(key of keys){
            if(require.body[key] == "")
                return response.send('Please, fill all fields!')
        }
        
        Instructor.create(require.body, function(instructor){
            return response.redirect(`/instructors/${instructor.id}`)
        })
    },
    show(require, response){
        Instructor.find(require.params.id, function(instructor){
            if (!instructor) return response.send("Instructor not found!")

            instructor.age = age(instructor.birth)
            instructor.services = instructor.services.split(",")
            instructor.created_at = date(instructor.created_at).format

            return response.render('instructors/show', {instructors: instructor})
        })
    },
    edit(require, response){
        Instructor.find(require.params.id, function(instructor){
            if (!instructor) return response.send("Instructor not found!")

            instructor.birth = date(instructor.birth).iso
            instructor.services = instructor.services.split(",")

            return response.render('instructors/edit', {instructor})
        })
    },
    put(require, response){
        const keys = Object.keys(require.body)

        for(key of keys){
            if(require.body[key] == "")
                return response.send('Please, fill all fields!')
        }
        
        Instructor.update(require.body, function(){
            return response.redirect(`/instructors/${require.body.id}`)
        })

    },
    delete(require, response){
        Instructor.delete(require.body.id, function(){
            return response.redirect(`/instructors`)
        })

    },
}
