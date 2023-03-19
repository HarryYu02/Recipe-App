import { BaseKey } from "@refinedev/core";
import { Ingredient } from "./common";

export interface RecipeCardProps {
    id?: BaseKey | undefined;
    title: string;
    estimateTime: number;
    photo: string;
    servings: number;
}
