import { useState, useEffect } from "react";
import { Typography, Box, Stack, IconButton } from "@mui/material";
import { useDelete, useGetIdentity, useShow, useOne, useUpdate } from "@refinedev/core";
import { useParams, useNavigate } from "react-router-dom";
import {
    Delete,
    Edit,
    Star,
    BookOutlined,
    AccessTimeOutlined,
    RestaurantOutlined,
    AccountCircleOutlined,
    StarBorderOutlined,
} from "@mui/icons-material";

import { CustomButton, Loading } from "components";
import { Ingredient, RecipeProps } from "interfaces/common";

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

function RecipeDetails() {
    const navigate = useNavigate();
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const { id } = useParams();
    const { mutate } = useDelete();
    const { mutate: update } = useUpdate();
    const { queryResult } = useShow();

    const { data, isLoading, isError } = queryResult;
    const {
        data: userData,
        isLoading: userIsLoading,
        isError: userIsError,
    } = useOne({
        resource: "users",
        id: user?.userId,
    });

    // console.log(data)
    const recipeDetails = data?.data ?? {};
    const savedRecipes = userData?.data.savedRecipes ?? [];

    // console.log(recipeDetails._id);
    // console.log(
    //     savedRecipes.map(
    //         //@ts-ignore
    //         (savedRecipe) => savedRecipe._id
    //     )
    // );

    const index = savedRecipes
        .map(({ _id }: RecipeProps) => _id)
        .indexOf(recipeDetails._id);

    // console.log(savedRecipes.map(({ _id }: RecipeProps) => _id));
    // console.log(index);

    const [saved, setSaved] = useState(index > -1);
    // console.log(savedRecipes);
    // console.log(recipeDetails);
    useEffect(() => {
        setSaved(index > -1)
    }, [index])

    if (isLoading || userIsLoading) return <Loading />;
    if (isError || userIsError) return <div>Error</div>;
    // console.log(recipeDetails);

    const isCurrentUser = user.email === recipeDetails.creator.email;
    // console.log(isCurrentUser);

    const handleToggleSaved = () => {
        // console.log(userData);
        let newSaved = userData?.data.savedRecipes;
        if (saved) {
            newSaved.splice(index, 1);
        } else {
            newSaved.push(recipeDetails);
        }
        update({
            resource: "users",
            values: {
                ...userData.data,
                savedRecipes: newSaved,
            },
            id: user?.userId,
        });
        setSaved(saved ? false : true);
    };

    const handleDeleteRecipe = () => {
        const response = window.confirm(
            "Are you sure you want to delete this recipe?"
        );
        if (response) {
            mutate(
                {
                    resource: "recipes",
                    id: id as string,
                },
                {
                    onSuccess: () => {
                        navigate("/recipes");
                    },
                }
            );
        }
    };

    return (
        <Box borderRadius="15px" p="20px" bgcolor="#fcfcfc" width="100%">
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                {recipeDetails.title}
            </Typography>
            <Box
                mt="20px"
                display="flex"
                flexDirection={{ xs: "column", lg: "row" }}
                gap={4}
                alignItems={{ xs: "center", lg: "normal" }}
            >
                <Box flex={1} maxWidth={764}>
                    <img
                        src={recipeDetails.photo}
                        alt={recipeDetails.title}
                        height={546}
                        style={{ objectFit: "cover", borderRadius: "10px" }}
                        className="recipe_details-img"
                    />
                    {/* Time, Servings and Save */}
                    <Box mt="15px">
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <AccessTimeOutlined
                                sx={{
                                    fontSize: 20,
                                    color: "#11142d",
                                }}
                            />
                            <Typography fontSize={16} color="#808191">
                                {recipeDetails.estimateTime} mins
                            </Typography>
                            <RestaurantOutlined
                                sx={{
                                    fontSize: 20,
                                    color: "#11142d",
                                    ml: 1,
                                }}
                            />
                            <Typography fontSize={16} color="#808191">
                                {recipeDetails.servings} servings
                            </Typography>
                            <IconButton onClick={handleToggleSaved}>
                                {saved ? (
                                    <Star sx={{ color: "#f2c94c" }} />
                                ) : (
                                    <StarBorderOutlined />
                                )}
                            </IconButton>
                            <Typography fontSize={16} color="#808191">
                                {saved ? "Saved" : "Click to save"}
                            </Typography>
                        </Stack>
                    </Box>
                    {/* Description */}
                    <Box mt="15px">
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 500,
                                color: "#11142d",
                            }}
                        >
                            Description
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
                            {recipeDetails.description}
                        </Typography>
                    </Box>
                    {/* Ingredients */}
                    <Box mt="15px">
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 500,
                                color: "#11142d",
                            }}
                        >
                            Ingredients
                        </Typography>
                        <Stack direction="column">
                            {recipeDetails.ingredients.map(
                                (ingredient: Ingredient, index: number) => (
                                    <Stack
                                        direction="row"
                                        gap="10px"
                                        key={index}
                                    >
                                        <Typography>
                                            {ingredient.name}
                                            {" - "}
                                            {ingredient.amount}{" "}
                                            {ingredient.unit}
                                        </Typography>
                                    </Stack>
                                )
                            )}
                        </Stack>
                    </Box>
                    <Box mt="15px">
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 500,
                                color: "#11142d",
                            }}
                        >
                            Steps
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
                            {recipeDetails.steps}
                        </Typography>
                    </Box>
                    <Box mt="15px">
                        <Typography
                            sx={{
                                fontSize: 20,
                                fontWeight: 500,
                                color: "#11142d",
                            }}
                        >
                            Tips and Tricks
                        </Typography>
                        <Typography
                            variant="body1"
                            style={{ whiteSpace: "pre-wrap" }}
                        >
                            {recipeDetails.tips}
                        </Typography>
                    </Box>
                </Box>
                {/* Creator */}
                <Box
                    width="100%"
                    flex={1}
                    maxWidth={326}
                    display="flex"
                    flexDirection="column"
                    gap="20px"
                    mt="30px"
                >
                    <Stack
                        width="100%"
                        p={2}
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        border="1px solid #E4E4E4"
                        borderRadius={2}
                    >
                        <Stack
                            mt={2}
                            justifyContent="center"
                            alignItems="center"
                            textAlign="center"
                        >
                            <img
                                src={
                                    checkImage(recipeDetails.creator.avatar)
                                        ? recipeDetails.creator.avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                alt="avatar"
                                width={90}
                                height={90}
                                style={{
                                    borderRadius: "100%",
                                    objectFit: "cover",
                                }}
                            />

                            <Box mt="15px">
                                <Typography
                                    fontSize={14}
                                    fontWeight={400}
                                    color="#808191"
                                >
                                    Creator
                                </Typography>
                                <Typography
                                    fontSize={18}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {recipeDetails.creator.name}
                                </Typography>
                            </Box>

                            <Stack
                                mt="15px"
                                direction="row"
                                alignItems="center"
                                gap={1}
                            >
                                <BookOutlined sx={{ color: "#808191" }} />
                                <Typography
                                    fontSize={16}
                                    fontWeight={600}
                                    color="#11142D"
                                >
                                    {recipeDetails.creator.allRecipes.length}{" "}
                                    Recipes
                                </Typography>
                            </Stack>
                        </Stack>
                        {isCurrentUser ? (
                            <Stack
                                width="100%"
                                mt="25px"
                                direction="row"
                                flexWrap="wrap"
                                gap={2}
                            >
                                <CustomButton
                                    title="Edit"
                                    backgroundColor="#475BE8"
                                    color="#FCFCFC"
                                    fullWidth
                                    icon={<Edit />}
                                    handleClick={() => {
                                        if (isCurrentUser) {
                                            navigate(
                                                `/recipes/edit/${recipeDetails._id}`
                                            );
                                        }
                                    }}
                                />
                                <CustomButton
                                    title="Delete"
                                    backgroundColor="#d42e2e"
                                    color="#FCFCFC"
                                    fullWidth
                                    icon={<Delete />}
                                    handleClick={() => {
                                        if (isCurrentUser) handleDeleteRecipe();
                                    }}
                                />
                            </Stack>
                        ) : (
                            <Stack
                                width="100%"
                                mt="25px"
                                direction="row"
                                flexWrap="wrap"
                                gap={2}
                            >
                                <CustomButton
                                    title="Visit Profile"
                                    backgroundColor="#475BE8"
                                    color="#FCFCFC"
                                    fullWidth
                                    icon={<AccountCircleOutlined />}
                                    handleClick={() => {
                                        navigate(
                                            `/profile/show/${recipeDetails.creator._id}`
                                        );
                                    }}
                                />
                            </Stack>
                        )}
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
}

export default RecipeDetails;
