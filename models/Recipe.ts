import { Schema, model, models, Types } from "mongoose";

const IngredientItemSchema = new Schema(
    {
        amount: { type: Number, required: true },
        unit: { type: Types.ObjectId, ref: "Unit", required: true },
        ingredient: { type: Types.ObjectId, ref: "Ingredient", required: true },
        onShoppingList: { type: Boolean, default: false },
    },
    { _id: false }
);

const StepSchema = new Schema(
    {
        text: { type: String, required: true },
        hint: { type: String },
    },
    { _id: false }
);

const RecipeSchema = new Schema(
    {
        name: { type: String, required: true },
        subtitle: { type: String, required: true },
        author: { type: Types.ObjectId, ref: "User" },
        imageUri: { type: String },
        cathegories: [{ type: Types.ObjectId, ref: "Cathegory" }],
        ingredients: { type: [IngredientItemSchema], default: [] },
        steps: { type: [StepSchema], default: [] },
    },
    { timestamps: true }
);

export default models.Recipe || model("Recipe", RecipeSchema);