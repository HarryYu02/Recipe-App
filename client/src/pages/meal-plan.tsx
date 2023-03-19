import { useState } from "react";
import { useGetIdentity, useOne, useUpdate } from "@refinedev/core";
import { Box, Typography, Stack } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import dayjs from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { Meal } from "interfaces/common";
import { CustomButton, RecipeCard, Loading } from "components";
import { RecipeProps } from "interfaces/common";

dayjs.extend(weekOfYear);
dayjs.extend(isBetweenPlugin);

function MealPlan() {
    const [showSaved, setShowSaved] = useState(false);
    const [showRemove, setShowRemove] = useState(false);
    const [viewDate, setViewDate] = useState(dayjs());
    const { mutate: update } = useUpdate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userId,
    });

    // deconstruct user data
    const myProfile = data?.data ?? [];
    const mealPlan: Meal[] = data?.data.mealPlan ?? [];
    const savedRecipes = data?.data.savedRecipes ?? [];

    // Loading and Error Component
    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;

    // Weekly calendar view variables
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const weekStart = viewDate.subtract(viewDate.day(), "day");
    const viewWeek = weekStart.week();

    const todayMeals = mealPlan.find((day: Meal) => {
        const parsedDate = new Date(day.date + "T00:00:00");
        // console.log(parsedDate);
        return (
            parsedDate.getFullYear() === viewDate.year() &&
            parsedDate.getMonth() === viewDate.month() &&
            parsedDate.getDate() === viewDate.date()
        );
    });

    const handleAddDeleteMeal = (_id: string) => {
        // map all recipes in all dates to ids
        const idMealPlan: {
            date: string;
            recipes: string[];
        }[] = [...mealPlan].map((day) => ({
            date: day.date,
            recipes: day.recipes.map((recipe) => recipe._id),
        }));
        // search for date in mealPlan
        if (todayMeals) {
            // if date exists in mealPlan, find the index of today among all meal plans
            const index = mealPlan.indexOf(todayMeals);
            // if duplicate, delete it instead
            if (idMealPlan[index].recipes.includes(_id)) {
                idMealPlan[index].recipes.splice(
                    idMealPlan[index].recipes.indexOf(_id),
                    1
                );
                // if no more recipes for that day, delete that day as well
                if (idMealPlan[index].recipes.length === 0) {
                    idMealPlan.splice(index, 1);
                }
            } else {
                // add new id to todayIds and update idMealPlan
                idMealPlan[index].recipes.push(_id);
            }
        } else {
            // if date not exists in mealPlan, create a new meal
            const newIdMeal: {
                date: string;
                recipes: string[];
            } = {
                date: viewDate.format("YYYY-MM-DD"),
                recipes: [_id],
            };
            // and push to idMealPlan
            idMealPlan.push(newIdMeal);
        }
        // call api to update user
        update({
            resource: "users",
            values: {
                ...myProfile,
                mealPlan: idMealPlan,
            },
            id: user?.userId,
        });
        // re-render
        setViewDate(viewDate);
    };

    return (
        <Stack>
            {/* Weekly Calendar View */}
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Meal Plan
            </Typography>
            <Box width="100%" textAlign="center" alignContent="center">
                <Typography fontWeight="700" fontSize="20px" color="#11142d">
                    {viewDate.format("MMM YYYY")}
                </Typography>
                <Box
                    display="flex"
                    flexWrap="wrap"
                    width={{ xs: "100%", md: "75%" }}
                    justifyContent={{ xs: "center", md: "space-between" }}
                    m="20px auto"
                >
                    {weekdays.map((weekday, index) => {
                        const today = weekStart.add(index, "day");
                        return (
                            <Box
                                key={index}
                                sx={{
                                    m: "10px",
                                    bgcolor: "#fcfcfc",
                                    borderRadius: "10px",
                                    minWidth: "10%",
                                    p: "10px",
                                    "&:hover": {
                                        border: "1px solid #475be8",
                                        cursor: "pointer",
                                    },
                                    border: viewDate.isSame(today)
                                        ? "1px solid #11142d"
                                        : null,
                                }}
                                onClick={(e) => {
                                    setViewDate(today);
                                }}
                            >
                                <Typography>{weekday}</Typography>
                                <Typography>{today.format("DD")}</Typography>
                            </Box>
                        );
                    })}
                </Box>
                <Box
                    display="flex"
                    width="75%"
                    justifyContent="space-between"
                    m="auto"
                    alignItems="center"
                >
                    <CustomButton
                        title="prev"
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        handleClick={() => {
                            setViewDate(weekStart.subtract(7, "day"));
                        }}
                    />
                    <Typography
                        fontWeight="700"
                        color="#11142d"
                    >
                        Week {viewWeek}
                    </Typography>
                    <CustomButton
                        title="next"
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        handleClick={() => {
                            setViewDate(weekStart.add(7, "day"));
                        }}
                    />
                </Box>
            </Box>
            {/* Saved Recipes */}
            <Box
                sx={{
                    mt: 5,
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <CustomButton
                    title={
                        showSaved
                            ? "Hide Saved Recipes"
                            : "Add from Saved Recipes"
                    }
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    handleClick={() => {
                        setShowSaved(showSaved ? false : true);
                    }}
                />
                <CustomButton
                    title={showRemove ? "Finish Editting" : "Edit Meals"}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    handleClick={() => {
                        setShowRemove(showRemove ? false : true);
                    }}
                />
            </Box>
            {savedRecipes.length > 0 ? (
                <Box
                    mt={2.5}
                    borderRadius="15px"
                    padding="20px"
                    bgcolor="#FCFCFC"
                    display={showSaved ? "unset" : "none"}
                >
                    <Typography fontSize={20} fontWeight={700} color="#11142D">
                        Saved Recipes
                    </Typography>

                    <Box
                        mt={2.5}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2.5,
                        }}
                    >
                        {savedRecipes?.map((recipe: RecipeProps) =>
                            !todayMeals?.recipes
                                .map((todayRecipe) => todayRecipe._id)
                                .includes(recipe._id) ? (
                                <Stack key={recipe._id}>
                                    <RecipeCard
                                        key={recipe._id}
                                        id={recipe._id}
                                        title={recipe.title}
                                        estimateTime={recipe.estimateTime}
                                        photo={recipe.photo}
                                        servings={recipe.servings}
                                    />
                                    <CustomButton
                                        title="Add"
                                        icon={<Add />}
                                        backgroundColor="#475be8"
                                        color="#fcfcfc"
                                        handleClick={() =>
                                            handleAddDeleteMeal(recipe._id)
                                        }
                                    />
                                </Stack>
                            ) : (
                                <Stack key={recipe._id}></Stack>
                            )
                        )}
                    </Box>
                </Box>
            ) : (
                <Box
                    mt={2.5}
                    borderRadius="15px"
                    padding="20px"
                    bgcolor="#FCFCFC"
                    textAlign="center"
                    display={showSaved ? "unset" : "none"}
                >
                    <Typography>You have no saved recipes</Typography>
                </Box>
            )}
            {/* Meal Plan of the day */}
            {todayMeals && todayMeals.recipes.length > 0 ? (
                <Box
                    mt={2.5}
                    borderRadius="15px"
                    padding="20px"
                    bgcolor="#FCFCFC"
                >
                    <Typography fontSize={20} fontWeight={700} color="#11142D">
                        {viewDate.format("MMM DD")}'s Recipes
                    </Typography>

                    <Box
                        mt={2.5}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2.5,
                        }}
                    >
                        {todayMeals.recipes.map((recipe: RecipeProps) => (
                            <Stack key={recipe._id}>
                                <RecipeCard
                                    id={recipe._id}
                                    title={recipe.title}
                                    estimateTime={recipe.estimateTime}
                                    photo={recipe.photo}
                                    servings={recipe.servings}
                                />
                                {showRemove && (
                                    <CustomButton
                                        title="Remove"
                                        icon={<Remove />}
                                        backgroundColor="#d42e2e"
                                        color="#fcfcfc"
                                        handleClick={() =>
                                            handleAddDeleteMeal(recipe._id)
                                        }
                                    />
                                )}
                            </Stack>
                        ))}
                    </Box>
                </Box>
            ) : (
                <Box
                    mt={2.5}
                    borderRadius="15px"
                    padding="20px"
                    bgcolor="#FCFCFC"
                    textAlign="center"
                >
                    <Typography>
                        You have not added any meals for{" "}
                        {viewDate.format("MMM DD")}
                    </Typography>
                </Box>
            )}
        </Stack>
    );
}

export default MealPlan;
