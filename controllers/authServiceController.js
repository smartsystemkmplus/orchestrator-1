const axios = require('axios')
const { errorHandler } = require('../helpers/errorHandler')
const { expiryDateCounter } = require('../helpers/expiryDateCounter')

class AuthServiceController {
    static async afterLogin(req, res, next) {
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
            const {data} = await axios.post(url, { }, {
                headers: {
                    authorization: req.headers.authorization
                }
            })
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
            res.status(errorHandler(error).code).json({ message: errorHandler(error).message })
        }
    }
}

module.exports = {
    AuthServiceController
}