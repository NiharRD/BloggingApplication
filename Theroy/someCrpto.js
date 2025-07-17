const { createHmac, randomBytes } = require("crypto"); // import for cryptoGraphy

const userSchema = fmdwofn.schema({
  salt: {
    required: false, // since preSave middle ware handle kar raha he
  },
});

userSchema.pre("save", function (next) {
  // preSave are like middle wares for mongooose
  const user = this;
  if (!user.isModified("password")) return; // This line ensures that password processing (like hashing) only happens when the password is actually set or changed, improving efficiency and security.

  const salt = randomBytes(16).toString(); // unique salt for every user
  const hashedPassword = createHmac("sha256", salt) // sha256 for algorithm
    .update(user.password) // .update(user.password): This step only reads the user's plain-text password. It feeds that value into the
    // HMAC hashing function to be used in the calculation.
    // It does not change the user.password field on the document itself.
    .digest("hex"); // .digest is very important and intermediate work is done before hashing
  this.salt = salt;
  this.password = hashedPassword;
  next();
});
