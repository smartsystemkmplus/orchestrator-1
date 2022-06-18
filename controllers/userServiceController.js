const axios = require('axios')
const { errorHandler } = require('../helpers/errorHandler')

class UserServiceController {
    static async addUser(req,res){
        try {
            if(!req.body){
                throw ({
                    type: "known",
                    code: 400,
                    message: "Data is required"
                })
            }
            const url = process.env.USERSERVICESURL 
            const { data } = await axios.post(url, req.body, {
                headers: req.headers ? req.headers : {}
            })
            res.status(201).json(data)
        } catch (error) {
            const { code, message } = errorHandler(error)
            res.status(code).json({message:message})
        }
    }

    static async updateUser(req,res){
        try {
            if(!req.body){
                throw ({
                    type: "known",
                    code: 400,
                    message: "Data is required"
                })
            }
            const url = process.env.USERSERVICESURL 
            const { data } = await axios.put(url, req.body, {
                headers: req.headers ? req.headers : {}
            })
            res.status(200).json(data)
        } catch (error) {
            const { code, message } = errorHandler(error)
            res.status(code).json({message:message})
        }
    }

    static async selectQuery(req,res){
        try {
            if(!req.body){
                throw ({
                    type: "known",
                    code: 400,
                    message: "Query is required"
                })
            }
            const url = process.env.USERSERVICESURL + 'other/select-query'
            const { data } = await axios.post(url, req.body, {
                headers: req.headers ? req.headers : {}
            })
            res.status(200).json(data)
        } catch (error) {
            const { code, message } = errorHandler(error)
            res.status(code).json({message:message})
        }
    }
}

module.exports = {
    UserServiceController
}