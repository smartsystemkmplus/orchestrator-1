// remember me is boolean param that will determine the expiry date
const expiryDateCounter = (rememberMe) =>{
    const date = rememberMe
      ? new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)
      : new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
      return date
}

module.exports ={
    expiryDateCounter
}