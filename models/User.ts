import { Schema, model, models, Types } from "mongoose";

const UserSchema = new Schema(
  {
    clerkUserId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    recipes: [{
      type: Types.ObjectId,
      ref: "Recipe",   // 👈 must match model name
      required: true,
    },],
    ingredients: [{
      type: Types.ObjectId,
      ref: "ingredient",   // 👈 must match model name
      required: true,
    }]
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);