const axios = require('axios')

class AuthServiceController{
    static async afterLogin(req,res,next){
        try {
            if(!req.headers.authorization){
                throw({
                    type:"known",
                    code:401,
                    message:"Access token is required"
                })
            }
            const url = process.env.AUTHSERVICESURL + 'after-login'
            const isRemember = req.body.isRemember ? true : false // isRemember body to hit the microservice
            const {data} = await axios.post(url,{isRemember : isRemember},{
                headers :{
                    authorization : req.headers.authorization
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    AuthServiceController
}