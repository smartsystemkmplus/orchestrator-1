// function for sending error response
const errorHandler = (error) => {
    let code = 500
    let message = "Internal server error"
    if (error.type === 'known') {
        code = error.code
        message = error.message
    } else if(error.response){
        code = error.response.status
        message = error.response.data
    }else if(error.code === "ECONNREFUSED"){
        code = 403
        message = "connection refused"
    }
    return {code,message}
}

module.exports = {
    errorHandler
}