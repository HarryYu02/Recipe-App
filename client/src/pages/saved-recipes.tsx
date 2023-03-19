import React from "react";
import { useGetIdentity, useOne } from "@refinedev/core";
import { Box, Stack, Typography, TextField, Select, MenuItem, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { RecipeCard, CustomButton, Loading } from "components";
import { RecipeProps } from "interfaces/common";

const SavedRecipes = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userId,
    });

    // console.log(data);
    const myProfile = data?.data ?? [];
    // console.log(myProfile);
    const savedRecipes = data? myProfile.savedRecipes : [];
    // console.log(savedRecipes);

    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;

    return (
        <Box>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Saved Recipe
            </Typography>
            {savedRecipes.length > 0 && (
                <Box
                    mt={2.5}
                    borderRadius="15px"
                >
                    <Box
                        mt={2.5}
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2.5,
                        }}
                    >
                        {savedRecipes?.map((recipe: RecipeProps) => (
                            <RecipeCard
                                key={recipe._id}
                                id={recipe._id}
                                title={recipe.title}
                                estimateTime={recipe.estimateTime}
                                photo={recipe.photo}
                                servings={recipe.servings}
                            />
                        ))}
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SavedRecipes;
