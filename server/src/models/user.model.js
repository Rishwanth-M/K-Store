const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const reqString = { type: String, required: true };

const addressSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    locality: String,
    pinCode: String,
    state: String,
    country: String,

    email: String,      // ✅ ADD THIS
    mobile: String,

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    firstName: reqString,
    lastName: reqString,
    email: reqString,
    password: reqString,
    gender: reqString,
    dateOfBirth: reqString,

    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();

  bcrypt.hash(this.password, 8, (err, hash) => {
    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("user", userSchema);
