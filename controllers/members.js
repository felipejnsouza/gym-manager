const fs = require('fs')
const data = require('../data.json')
const { response } = require('express')
const {  date} = require('../utils')


exports.index = function(require, response){
    return response.render("members/index", {members: data.members})
}

exports.show = function(require, response){
    const {id} = require.params

    const foundMember = data.members.find((member)=>{
        return member.id == id
    })

    if(!foundMember) return response.send("Member not found!")

    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay,
    }


    return response.render('members/show', {members: member})

}

exports.post = function(require, response){
    //req.query
    //req.body
    
    const keys = Object.keys(require.body)

    for(key of keys){
        if(require.body[key] == "")
            return response.send('Please, fill all fields!')
    }
    
    let {avatar_url, 
        name, 
        birth, 
        email, 
        gender, 
        blood, 
        weight, 
        height } = require.body
    
    birth = Date.parse(birth)

    let id = 1
    const lastMember = data.members[data.members.length-1]

    if(lastMember){
        id = lastMember.id + 1
    }

    console.log(lastMember)

    data.members.push({
        ...require.body,
        id,
        birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return response.send("Write file error!")

        return response.redirect(`/members/${id}`)
    })
}

exports.edit = function(require, response) {
    const {id} = require.params

    const foundMember = data.members.find((member)=>{
        return member.id == id
    })

    if(!foundMember) return response.send("Member not found!")

    const birth = date(foundMember.birth).iso

    const member = {
        ...foundMember,
        birth: birth
    }

    return response.render('members/edit', {member})
}

exports.put = function(require, response) {
    const {id} = require.body
    let index = 0

    const foundMember = data.members.find((member, foundIndex)=>{
        if(member.id == id){
            index = foundIndex
            return true
        }
    })

    if(!foundMember) return response.send("Member not found!")

    const member = {
        ...foundMember,
        ...require.body,
        birth: Date.parse(require.body.birth),
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return response.send("Write error!")

        return response.redirect(`/members/${id}`)
    })

}

exports.delete = function(require, response) {
    const {id} = require.body

    const filteredMembers = data.members.filter(function(member){
        return member.id != id
    })

    data.members = filteredMembers

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return response.send("write error")

        return response.redirect("/members")
    })
}

exports.create = (require, response) => { response.render("members/create")}