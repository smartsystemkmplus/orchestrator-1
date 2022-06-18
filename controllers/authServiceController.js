const axios = require('axios')
const { errorHandler } = require('../helpers/errorHandler')
const { expiryDateCounter } = require('../helpers/expiryDateCounter')

class AuthServiceController {
    static async afterLogin(req, res) {
        try {
            if (!req.headers.authorization) {
                throw ({
                    type: "known",
                    code: 401,
                    message: "Access token is required"
                })
            }
            const url = process.env.AUTHSERVICESURL + 'after-login'
            const isRemember = req.body.isRemember ? true : false // isRemember body to hit the microservice
            const { data } = await axios.post(url, {}, {
                headers: {
                    authorization: req.headers.authorization
                }
            })
            // cookies setting for response to frontend
            // Todo: make domain to env
            res.cookie("smartkmsystemAuth", "Bearer " + data.data.token, {
                domain: ".kmplus.co.id",
                httpOnly: true,
                secure: true,
                expires: expiryDateCounter(isRemember),
            });

            // development purpose
            res.cookie("smartkmsystemAuth", "Bearer " + data.data.token, {
                domain: "localhost",
                secure: false,
                expires: expiryDateCounter(isRemember),
            });
            res.status(200).json(data)
        } catch (error) {
            const { code, message } = errorHandler(error)
            res.status(code).json({message:message})
        }
    }

    static async resetPassword(req, res) {
        try {
            if (!req.body.email) {
                throw ({
                    type: "known",
                    code: 400,
                    message: "Email or array of email is required"
                })
            }
            const url = process.env.AUTHSERVICESURL + 'reset-password'
            const { data } = await axios.post(url, { email: req.body.email })
            res.status(200).json(data)
        } catch (error) {
            const { code, message } = errorHandler(error)
            res.status(code).json({message:message})
        }
    }

    static async status(req,res){
        try {
            const url = process.env.AUTHSERVICESURL + 'status'
            const {data} = await axios.get(url,{
                headers : req.headers
            })
            res.status(200).json(data)
        } catch (error) {
            const { code, message } = errorHandler(error)
            res.status(code).json({message:message})
        }
    }
}

module.exports = {
    AuthServiceController
}