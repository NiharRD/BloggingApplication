const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
  //cookie name para for making the function more generic
  //
  return (req, res, next) => {
    // this type of function for sending requests
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      next();
    }
    try {
      const userPayLoad = validateToken(validateToken);
      req.user = userPayLoad;
    } catch (error) {}
    next();
  };
}

module.exports = checkForAuthenticationCookie;
