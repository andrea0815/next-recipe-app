import { Schema, model, models, Types } from "mongoose";

const IngredientSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        author: { type: Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default models.Ingredient || model("Ingredient", IngredientSchema);