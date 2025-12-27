const { Schema, model } = require("mongoose");

const favouriteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("favourite", favouriteSchema);
