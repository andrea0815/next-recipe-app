import { Schema, model, models, Types } from "mongoose";

const CathegorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        author: { type: Types.ObjectId, ref: "User" },
    },
    { timestamps: true }
);

export default models.Cathegory || model("Cathegory", CathegorySchema);