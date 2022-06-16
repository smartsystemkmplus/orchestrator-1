const errorHandler = (error, req, res) => {
    if (error.type === 'known') {
        res.status(error.code).json({
            message: error.message
        })
    } else if(error.response.data){
        res.status(error.response.status).json(error.response.data)
    }else {
        res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports = {
    errorHandler
}