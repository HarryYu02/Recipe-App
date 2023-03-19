import React from "react";
import { Link } from "react-router-dom";
import { Typography, Box, Card, CardMedia, CardContent, Stack } from "@mui/material";
import { AccessTimeOutlined, RestaurantOutlined } from "@mui/icons-material";

import { RecipeCardProps } from "interfaces/recipe";

const RecipeCard = ({
    id,
    title,
    estimateTime,
    photo,
    servings,
}: RecipeCardProps) => {
    return (
        <Card
            component={Link}
            to={`/recipes/show/${id}`}
            sx={{
                width: '30%',
                minWidth: '300px',
                p: "10px",
                "&:hover": {
                    boxShadow: "0 22px 45px 2px rgba(176, 176,176, 0.1)",
                },
                cursor: "pointer",
            }}
            elevation={0}
        >
            <CardMedia
                component="img"
                width="100%"
                height={210}
                image={photo}
                alt="card image"
                sx={{
                    borderRadius: "10px",
                }}
            />
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "10px",
                    paddingX: "5px",
                }}
            >
                <Stack direction="column" gap={1}>
                    <Typography fontSize={16} fontWeight={500} color="#11142d">
                        {title}
                    </Typography>
                    <Stack direction="row" gap={0.5} alignItems="flex-start">
                        <AccessTimeOutlined
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                mt: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191">
                            {estimateTime} mins
                        </Typography>
                        <RestaurantOutlined
                            sx={{
                                fontSize: 18,
                                color: "#11142d",
                                mt: 0.5,
                                ml: 0.5,
                            }}
                        />
                        <Typography fontSize={14} color="#808191">
                            {servings} servings
                        </Typography>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default RecipeCard;
