userSchema.static("matchPassword", function (email, password) {
  // matchfunction string is the vurtual functions , second function is the function
  const user = this.findOne({ email });

  if (!user) return false;

  const salt = user.salt;
  const hashedPassword = user.password;
  const userProvidedHash = createHmac("sha256", salt)
    .update(password)

    .digest("hex");
  return hashedPassword === userProvidedHash;
});

// Access using

User.matchPassword;
