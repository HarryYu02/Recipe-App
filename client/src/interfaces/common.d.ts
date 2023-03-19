export interface Ingredient {
    name: string;
    amount: number;
    unit: string;
}

export interface Meal {
    date: string;
    recipes: RecipeProps[];
}

export interface CustomButtonProps {
    type?: string;
    title: string;
    backgroundColor: string;
    color: string;
    fullWidth?: boolean;
    icon?: ReactNode;
    disabled?: boolean;
    handleClick?: () => void;
}

export interface ProfileProps {
    type: string;
    name: string;
    avatar: string;
    email: string;
    recipes: Array | undefined;
}

export interface RecipeProps {
    _id: string;
    title: string;
    estimateTime: number;
    servings: number;
    ingredients: Ingredient[];
    photo: string;
    creator: string;
}
