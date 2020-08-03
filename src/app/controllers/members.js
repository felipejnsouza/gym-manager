const { age, date} = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    index(require, response){
        Member.all(function(members){
            return response.render("members/index", {members})
        })
        
    },
    create(require, response){
        Member.instructorsSelectOption(function(options){

            return response.render("members/create", {instructorOptions: options})
        })

    },
    post(require, response){
        const keys = Object.keys(require.body)

        for(key of keys){
            if(require.body[key] == "")
                return response.send('Please, fill all fields!')
        }
        
        Member.create(require.body, function(member){
            return response.redirect(`/members/${member.id}`)
        })
    },
    show(require, response){
        Member.find(require.params.id, function(member){
            if (!member) return response.send("Member not found!")

            member.birth = date(member.birth).birthDay

            return response.render('members/show', {members: member})
        })
    },
    edit(require, response){
        Member.find(require.params.id, function(member){
            if (!member) return response.send("Member not found!")

            member.birth = date(member.birth).iso

            Member.instructorsSelectOption(function(options){

                return response.render('members/edit', {member, instructorOptions: options})
            })
        })
    },
    put(require, response){
        const keys = Object.keys(require.body)

        for(key of keys){
            if(require.body[key] == "")
                return response.send('Please, fill all fields!')
        }
        
        Member.update(require.body, function(){
            return response.redirect(`/members/${require.body.id}`)
        })

    },
    delete(require, response){
        Member.delete(require.body.id, function(){
            return response.redirect(`/members`)
        })

    },
}
