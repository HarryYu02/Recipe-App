import mongoose from "mongoose";

const IngredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String,
});


const RecipeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    estimateTime: { type: Number, required: true },
    servings: { type: Number, required: true },
    steps: { type: String, required: true },
    tips: { type: String, required: true },
    ingredients: [IngredientSchema],
    photo: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const recipeModel = new mongoose.model("Recipe", RecipeSchema);

export default recipeModel;
