const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

/* ================= ADDRESS SCHEMA ================= */
const addressSchema = new Schema(
  {
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },

    addressLine1: { type: String, trim: true },
    addressLine2: { type: String, trim: true },
    locality: { type: String, trim: true },

    pinCode: {
      type: String,
      match: [/^\d{6}$/, "Invalid pin code"],
    },

    state: { type: String, trim: true },
    country: { type: String, trim: true },

    email: {
      type: String,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      match: [/^\d{10}$/, "Invalid mobile number"],
    },
  },
  { _id: false }
);

/* ================= USER SCHEMA ================= */
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,              // ✅ REQUIRED
      lowercase: true,
      trim: true,
      index: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
    },

    password: {
      type: String,
      required: true,
      select: false,             // ✅ NEVER return password
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    addresses: {
      type: [addressSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

/* ================= PASSWORD HASH ================= */
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12); // 🔐 stronger
  next();
});

/* ================= PASSWORD CHECK ================= */
userSchema.methods.checkPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
