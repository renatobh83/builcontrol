const mongoose = require("mongoose");
import { v4 as uuid } from "uuid";

const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    connected: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
    },

    createdAt: {
      type: Date,
      default: Date.now() - 3 * 60 * 60 * 1000,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
UsersSchema.pre("save", function () {
  const user = this;
  if (!user.userId) {
    user.userId = uuid();
  }
});

export default mongoose.models.Users || mongoose.model("Users", UsersSchema);
