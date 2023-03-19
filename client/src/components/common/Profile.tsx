import { Email, BookOutlined, } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";

import { ProfileProps, RecipeProps } from "interfaces/common";
import RecipeCard from './RecipeCard';

function checkImage(url: any) {
    const img = new Image();
    img.src = url;
    return img.width !== 0 && img.height !== 0;
}

const Profile = ({ type, name, avatar, email, recipes }: ProfileProps) => (
    <Box>
        <Typography fontSize={25} fontWeight={700} color="#11142D">
            {type} Profile
        </Typography>

        <Box mt="20px" borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    gap: 2.5,
                }}
            >
                <img
                    src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80"
                    width={340}
                    height={320}
                    alt="abstract"
                    className="my_profile-bg"
                />
                <Box
                    flex={1}
                    sx={{
                        marginTop: { md: "58px" },
                        marginLeft: { xs: "20px", md: "0px" },
                    }}
                >
                    <Box
                        flex={1}
                        display="flex"
                        flexDirection="column"
                        gap="20px"
                    >
                        <Box
                            flex={1}
                            display="flex"
                            flexDirection={{ xs: "column", md: "row" }}
                            alignItems={{ xs: "normal", md: "center" }}
                            gap="30px"
                        >
                            <img
                                src={
                                    checkImage(avatar)
                                        ? avatar
                                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                                }
                                width={78}
                                height={78}
                                alt="user_profile"
                                className="my_profile_user-img"
                            />
                            <Typography
                                fontSize={22}
                                fontWeight={600}
                                color="#11142D"
                            >
                                {name}
                            </Typography>
                        </Box>
                        <Stack flex={1} gap="15px">
                            <Typography
                                fontSize={14}
                                fontWeight={500}
                                color="#808191"
                            >
                                Email
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap="10px"
                            >
                                <Email sx={{ color: "#11142D" }} />
                                <Typography fontSize={14} color="#11142D">
                                    {email}
                                </Typography>
                            </Box>
                        </Stack>
                        <Stack flex={1} gap="15px">
                            <Typography
                                fontSize={14}
                                fontWeight={500}
                                color="#808191"
                            >
                                Created Recipes
                            </Typography>
                            <Box
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap="10px"
                            >
                                <BookOutlined sx={{ color: "#11142D" }} />
                                <Typography fontSize={14} color="#11142D">
                                    {recipes.length}
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </Box>
        {recipes.length > 0 && (
            <Box mt={2.5} borderRadius="15px" padding="20px" bgcolor="#FCFCFC">
                <Typography fontSize={18} fontWeight={600} color="#11142D">
                    {type} Recipes
                </Typography>

                <Box
                    mt={2.5}
                    sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2.5,
                    }}
                >
                    {recipes?.map((recipe: RecipeProps) => (
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

export default Profile;
