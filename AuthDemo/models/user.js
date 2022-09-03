const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username cannot be blank!"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank!"],
  },
});

userSchema.statics.findAndValidate = async function (username, password) {
  const user = await this.findOne({ username });
  const validPw = await bcrypt.compare(password, user.password);
  return validPw ? user : null;
};

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("User", userSchema);
