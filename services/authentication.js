const JWT = require("jsonwebtoken");
const secret = "nihar2005";

function createTokenForUser(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
  };
  const token = JWT.sign(payload, secret); // can set expiration date etc through third parameter object
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}
module.exports = { createTokenForUser, validateToken };
