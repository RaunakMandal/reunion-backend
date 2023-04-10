const mongoose = require("mongoose");
const crypto = require("crypto");
const uuid = require("uuid");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    followers: {
      type: [String],
      default: [],
    },
    following: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (pass) {
    this._pass = pass;
    this.salt = uuid.v4();
    this.hashed_password = this.securePass(pass);
  })
  .get(function () {
    return this._pass;
  });

userSchema.methods = {
  authenticate: function (pass) {
    return this.encryptPassword(pass) === this.hashed_password;
  },

  encryptPassword: function (plainpassword) {
    if (!plainpassword) return "";

    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
