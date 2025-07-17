const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  //cookie name para for making the function more generic
  //
  return (req, res, next) => {
    // this type of function for sending requests
    const tokenCookieValue = req.cookies[cookieName];
    console.log("Token from cookie:", tokenCookieValue);
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayLoad = validateToken(tokenCookieValue); // Fixed: was validateToken(validateToken)
      console.log("User payload:", userPayLoad);
      req.user = userPayLoad;
    } catch (error) {
      console.log("Token validation error:", error);
    }
    return next();
  };
}

module.exports = checkForAuthenticationCookie;
