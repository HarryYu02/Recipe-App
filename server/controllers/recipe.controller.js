import Recipe from "../mongodb/models/recipe.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllRecipes = async (req, res) => {
    const { _end, _order, _start, _sort, title_like = "" } = req.query;

    const query = {};

    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }
    try {
        const count = await Recipe.countDocuments({ query });
        const recipes = await Recipe.find(query)
            .limit(_end)
            .skip(_start)
            .sort({ [_sort]: _order });

        res.header("x-total-count", count);
        res.header("Access-Control-Expose-Headers", "x-total-count");

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getRecipeDetail = async (req, res) => {
    const { id } = req.params;
    const recipeExists = await Recipe.findOne({ _id: id }).populate("creator");

    if (recipeExists) {
        res.status(200).json(recipeExists);
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
};

const createRecipe = async (req, res) => {
    try {
        const {
            title,
            description,
            estimateTime,
            servings,
            steps,
            tips,
            ingredients,
            photo,
            email,
        } = req.body;

        // Start a new session
        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error(`User not found`);

        const photoUrl = await cloudinary.uploader.upload(photo);

        const newRecipe = await Recipe.create({
            title,
            description,
            estimateTime,
            servings,
            steps,
            tips,
            ingredients,
            photo: photoUrl.url,
            creator: user._id,
        });

        user.allRecipes.push(newRecipe._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Recipe created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            description,
            estimateTime,
            servings,
            steps,
            tips,
            ingredients,
            photo,
        } = req.body;

        const targetRecipe = await Recipe.findById({ _id: id });
        const oldPhoto = targetRecipe.photo;

        const photoUrl = await cloudinary.uploader.upload(
            photo ? photo : oldPhoto
        );

        await Recipe.findByIdAndUpdate(
            { _id: id },
            {
                title,
                description,
                estimateTime,
                servings,
                steps,
                tips,
                ingredients,
                photo: photoUrl.url,
            }
        );
        res.status(200).json({ message: "Recipe updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const { id } = req.params;
        const recipeToDelete = await Recipe.findById({ _id: id }).populate(
            "creator"
        );

        // console.log(typeof recipeToDelete);

        if (!recipeToDelete) throw new Error("Recipe not found");

        const session = await mongoose.startSession();
        session.startTransaction();

        await Recipe.deleteOne({ _id: id }).session(session);
        recipeToDelete.creator.allRecipes.pull(recipeToDelete);

        await recipeToDelete.creator.save({ session });
        await session.commitTransaction();

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    getAllRecipes,
    getRecipeDetail,
    createRecipe,
    updateRecipe,
    deleteRecipe,
};
