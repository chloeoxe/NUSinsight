const mongoose = require("mongoose");

const surveySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    desc: {
      type: String,
      required: [true, "Please add a description"],
    },
    questions: {
      type: Array,
      required: [true, "Please add at least one question"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Survey", surveySchema);
