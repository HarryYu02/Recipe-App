import mongoose from "mongoose";
import Recipe from "./models/recipe.js";
import User from "./models/user.js";
import { recipes, creatorId } from "./data.js";

import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upsertOptions = { upsert: true };

const insertDataset = async () => {
    try {
        // Loop through the new recipes and update or insert them into the database
        await Promise.all(
            recipes.map(async (recipe) => {
                // Use the title as the unique identifier to check for duplicates
                const filter = { title: recipe.title };
                const result = await Recipe.updateOne(
                    filter,
                    recipe,
                    upsertOptions
                );

                // Check if the recipe was upserted (inserted or updated)
                const insertedRecipe = result.upserted
                    ? result.upserted[0]
                    : await Recipe.findOne(filter);

                if (!insertedRecipe) {
                    // The recipe could not be found or inserted
                    return;
                }

                // Upload the image to Cloudinary
                // const image = await cloudinary.uploader.upload(recipe.image, {
                //     folder: "recipe_images",
                // });

                // Add the Cloudinary image URL to the recipe object
                // insertedRecipe.image = image.secure_url;

                // Add the recipe ID to the user's allRecipes field
                const userFilter = { _id: insertedRecipe.creator };
                const update = {
                    $addToSet: { allRecipes: insertedRecipe._id },
                };
                await User.updateOne(userFilter, update);
            })
        );

        console.log("Recipes inserted or updated in the database");
    } catch (error) {
        console.error(error);
    }
};

export default insertDataset;
