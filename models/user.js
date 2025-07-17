const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto"); // import for cryptoGraphy
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
      // required hata diya since  preSave middle ware handle karega
    },

    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/default_photo.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timeStamps: true }
);

userSchema.static("matchPassword", async function (email, password) {
  const user = await this.findOne({ email });

  if (!user) throw new Error("User not found");

  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)

    .digest("hex");
  if (hashedPassword !== userProvidedHash)
    throw new Error("Incorrect password");
  if (hashedPassword === userProvidedHash) console.log("password matched");
  return user;
});

userSchema.pre("save", function (next) {
  // preSave are like middle wares for mongooose
  const user = this;
  if (!user.isModified("password")) return; // This line ensures that password processing (like hashing) only happens when the password is actually set or changed, improving efficiency and security.

  const salt = randomBytes(16).toString(); // unique salt for every user
  const hashedPassword = createHmac("sha256", salt) // sha256 for algorithm
    .update(user.password) // .update(user.password): This step only reads the user's plain-text password. It feeds that value into the
    //  HMAC hashing function to be used in the calculation.
    //  It does not change the user.password field on the document itself.
    .digest("hex"); // .digest is very important and  intermediate work is done before hashing
  this.salt = salt;
  this.password = hashedPassword; // final assignment
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
