const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
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
