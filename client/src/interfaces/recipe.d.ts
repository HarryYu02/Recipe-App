import { BaseKey } from "@pankod/refine-core";
import { Ingredient } from "./common";

export interface RecipeCardProps {
    id?: BaseKey | undefined;
    title: string;
    estimateTime: number;
    photo: string;
    servings: number;
}
