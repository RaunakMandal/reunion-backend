const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comments: {
      type: [
        {
          owner:
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
          },
          comment: {
            type: String,
          },
        },
      ],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Posts", postsSchema);
