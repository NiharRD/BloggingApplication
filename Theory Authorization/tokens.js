const JWT = require("jsonwebtoken");
const secret = "nihar2005";

const user;
const payload = {
  _id: user._id,
  email: user.email,
  profileImageURL: user.profileImageURL,
  role: user.role,
};
const token = JWT.sign(payload, secret); // can set expiration date etc through third parameter object

// opposite work 
const payload = JWT.verify(token, secret);
