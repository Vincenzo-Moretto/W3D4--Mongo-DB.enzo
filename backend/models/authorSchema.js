import { model, Schema } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    birthDate: {
      type: Date,
    },
    avatar: {
      type: String,
    },
  },
  { collection: "authors" }
);
export default model("Author", authorSchema);
