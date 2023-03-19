import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
    date: String,
    recipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
});

const IngredientSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    unit: String,
});

const UserSchema = new mongoose.Schema({
    name: { type: String, requried: true },
    email: { type: String, requried: true },
    avatar: { type: String, requried: true },
    allRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    mealPlan: [MealSchema],
    shoppingList: [IngredientSchema]
})

const userModel = mongoose.model('User', UserSchema);

export default userModel;