import { useMemo } from "react";
import { useTable } from "@refinedev/core";
import { Box, Stack, Typography, TextField, Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { RecipeCard, CustomButton, Loading } from "components";

const AllRecipes = () => {
    const navigate = useNavigate();

    const {
        tableQueryResult: { data, isLoading, isError },
        current,
        setCurrent,
        setPageSize,
        pageCount,
        sorters: sorter,
        setSorters: setSorter,
        filters,
        setFilters,
    } = useTable();

    // console.log(data);
    const allRecipes = data?.data ?? [];

    const currentFilterValues = useMemo(() => {
        const logicalFilters = filters.flatMap((item) =>
            "field" in item ? item : []
        );

        return {
            title:
                logicalFilters.find((item) => item.field === "title")?.value ||
                "",
            propertyType:
                logicalFilters.find((item) => item.field === "propertyType")
                    ?.value || "",
        };
    }, [filters]);

    if (isLoading) return <Loading />;
    if (isError) return <Typography>Error</Typography>;

    return (
        <>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                <Stack direction="column" width="100%">
                    <Typography fontSize={25} fontWeight={700} color="#11142d">
                        {!allRecipes.length
                            ? "There are no recipes"
                            : "All Recipes"}
                    </Typography>
                    <Box
                        mb={2}
                        mt={3}
                        display="flex"
                        width="84%"
                        justifyContent="space-between"
                        flexWrap="wrap"
                    >
                        <Box
                            display="flex"
                            gap={2}
                            flexWrap="wrap"
                            mb={{ xs: "20px", sm: 0 }}
                        >
                            {/* <CustomButton
                                title={`Sort time`}
                                handleClick={() => {}}
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                            /> */}
                            <TextField
                                variant="outlined"
                                color="info"
                                placeholder="Search by title"
                                value={currentFilterValues.title}
                                onChange={(e) => {
                                    setFilters([
                                        {
                                            field: "title",
                                            operator: "contains",
                                            value: e.currentTarget.value
                                                ? e.currentTarget.value
                                                : undefined,
                                        },
                                    ]);
                                }}
                            />
                            {/* <Select
                                variant="outlined"
                                color="info"
                                displayEmpty
                                required
                                inputProps={{ "aria-label": "Without label" }}
                                defaultValue=""
                                value=""
                                onChange={() => {}}
                            >
                                <MenuItem value="">All</MenuItem>
                            </Select> */}
                        </Box>
                    </Box>
                </Stack>
                
            </Box>

            <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {allRecipes.map((recipe) => (
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

            {/* Pagination */}
            {allRecipes.length > 0 && (
                <Box display="flex" gap={2} mt={3} flexWrap="wrap">
                    <CustomButton
                        title="Previous"
                        handleClick={() => setCurrent((prev) => prev - 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={!(current > 1)}
                    />
                    <Box
                        display={{ xs: "hidden", sm: "flex" }}
                        alignItems="center"
                        gap="5px"
                    >
                        Page <strong>{current}</strong> of{" "}
                        <strong>{pageCount}</strong>
                    </Box>
                    <CustomButton
                        title="Next"
                        handleClick={() => setCurrent((prev) => prev + 1)}
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        disabled={current === pageCount}
                    />
                    <Select
                        variant="outlined"
                        color="info"
                        displayEmpty
                        required
                        inputProps={{ "aria-label": "Without label" }}
                        defaultValue={10}
                        onChange={(e) =>
                            setPageSize(
                                e.target.value ? Number(e.target.value) : 10
                            )
                        }
                    >
                        {[5, 10, 20, 30, 40, 50].map((size) => (
                            <MenuItem key={size} value={size}>
                                Show {size}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>
            )}
        </>
    );
};

export default AllRecipes;
