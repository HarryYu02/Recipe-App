import express from "express";

import {
    createRecipe,
    deleteRecipe,
    getAllRecipes,
    getRecipeDetail,
    updateRecipe,
} from "../controllers/recipe.controller.js";

const router = express.Router();

router.route('/').get(getAllRecipes);
router.route('/:id').get(getRecipeDetail);
router.route('/').post(createRecipe);
router.route('/:id').patch(updateRecipe);
router.route('/:id').delete(deleteRecipe);

export default router;