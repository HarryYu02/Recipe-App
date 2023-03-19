import { useEffect, useState, useMemo } from "react";
import { useGetIdentity, useOne, useUpdate } from "@refinedev/core";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { DataGrid, GridSelectionModel } from "@mui/x-data-grid";
import { Box, Typography, Stack, ListItem, TextField, FormControl } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import isBetweenPlugin from "dayjs/plugin/isBetween";
import weekOfYear from "dayjs/plugin/weekOfYear";

import { Ingredient, Meal } from "interfaces/common";
import { CustomButton, Loading } from "components";

dayjs.extend(weekOfYear);
dayjs.extend(isBetweenPlugin);

const columns: GridColDef[] = [
    {
        field: "ingredientName",
        headerName: "Ingredient Name",
        flex: 1,
    },
    {
        field: "amount",
        headerName: "Amount",
        type: "number",
        flex: 1,
    },
    { field: "unit", headerName: "Unit", flex: 1 },
];

const sortedIndex = (array: Ingredient[], name: string) => {
    var low = 0,
        high = array.length;

    while (low < high) {
        var mid = (low + high) >>> 1;
        if (array[mid].name.localeCompare(name) === -1) low = mid + 1;
        else high = mid;
    }
    return low;
};

const emptyIngredient: Ingredient = {
    name: "",
    amount: 0,
    unit: "",
};

function ShoppingList() {
    const [editMode, setEditMode] = useState(false);
    const [toBeAdded, setToBeAdded] = useState(emptyIngredient);
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
    const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
    const [localShoppingList, setLocalShoppingList] = useState<Ingredient[]>(
        []
    );
    const [rows, setRows] = useState<GridRowsProp>([]);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>(
        []
    );
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
    const shoppingList: Ingredient[] = useMemo(() => {
        setLocalShoppingList(data?.data.shoppingList ?? []);
        return data?.data.shoppingList ?? [];
    }, [data]);
    // data?.data.shoppingList ?? [];

    // useEffect(() => {
    //     setLocalShoppingList(shoppingList);
    // }, [shoppingList]);

    useEffect(
        () =>
            setRows(
                localShoppingList.map((row, index) => {
                    return {
                        id: index,
                        ingredientName: row.name,
                        amount: row.amount,
                        unit: row.unit,
                    };
                })
            ),
        [localShoppingList]
    );

    // Loading and Error Component
    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;

    const generateShoppingList = () => {
        alert(
            "This will overwrite your current shopping list, are you sure to proceed?"
        );
        // find all meals between start and end date
        const betweenMeals = mealPlan.filter((day) => {
            return dayjs(day.date).isBetween(
                startDate?.subtract(1, "day"),
                endDate?.add(1, "day"),
                "day",
                "()"
            );
        });
        // flatten the object to find all ingredients of these meals
        const allBetweenIngredients = betweenMeals
            .flatMap((day) => day.recipes)
            .flatMap((recipe) => recipe.ingredients)
            .sort((a, b) => a.name.localeCompare(b.name));
        // console.log(allBetweenIngredients);
        setLocalShoppingList(allBetweenIngredients);
    };

    const saveShoppingList = () => {
        // console.log(localShoppingList);
        const sortedShoppingList = [...localShoppingList].sort((a, b) =>
            a.name.localeCompare(b.name)
        );
        update({
            resource: "users",
            values: {
                ...myProfile,
                shoppingList: sortedShoppingList,
            },
            id: user?.userId,
        });
    };

    const addIngredient = () => {
        const index = sortedIndex(localShoppingList, toBeAdded.name);
        const addedShoppingList = [...localShoppingList];
        addedShoppingList.splice(index, 0, toBeAdded);
        setLocalShoppingList(addedShoppingList);
        setToBeAdded(emptyIngredient);
    };

    const deleteIngredients = () => {
        const newShoppingList = [...localShoppingList];
        for (var i = selectionModel.length - 1; i >= 0; i--)
            newShoppingList.splice(Number(selectionModel[i]), 1);
        // const selectedIDs = new Set(selectionModel);
        // setRows((r) => r.filter((x) => !selectedIDs.has(x.id)));
        // console.log(newShoppingList);
        setLocalShoppingList(newShoppingList);
    };

    return (
        <>
            <Typography fontSize={25} fontWeight={700} color="#11142d">
                Shopping List
            </Typography>
            {/* Generate Shopping List from Saved Recipes */}
            <Box mt={3} mb={3} display="flex" flexWrap="wrap" gap={5}>
                <CustomButton
                    title={editMode ? "Save Changes" : "Edit Shopping List"}
                    backgroundColor="#475be8"
                    color="#fcfcfc"
                    handleClick={() => {
                        if (editMode) saveShoppingList();
                        setEditMode(!editMode);
                    }}
                />
                {editMode && (
                    <CustomButton
                        title="Cancel Chagnes"
                        backgroundColor="#475be8"
                        color="#fcfcfc"
                        handleClick={() => {
                            setLocalShoppingList(shoppingList);
                            setEditMode(!editMode);
                        }}
                    />
                )}
            </Box>
            {editMode && (
                <>
                    <Box mt={3} mb={3} display="flex" flexWrap="wrap" gap={5}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                value={startDate}
                                onChange={(newStartDate) =>
                                    newStartDate
                                        ? setStartDate(
                                              newStartDate.startOf("date")
                                          )
                                        : null
                                }
                                label="From"
                            />
                            <DatePicker
                                value={endDate}
                                onChange={(newEndDate) =>
                                    newEndDate
                                        ? setEndDate(newEndDate?.endOf("date"))
                                        : null
                                }
                                label="To"
                                minDate={startDate}
                            />
                        </LocalizationProvider>
                        <CustomButton
                            title="Generate Shopping List"
                            backgroundColor="#475be8"
                            color="#fcfcfc"
                            handleClick={() => generateShoppingList()}
                        />
                    </Box>
                    <form>
                        <Box
                            mt={3}
                            mb={3}
                            display="flex"
                            flexWrap="wrap"
                            gap={5}
                        >
                            <TextField
                                placeholder="Ingredient Name"
                                value={toBeAdded.name}
                                onChange={(e) => {
                                    setToBeAdded({
                                        ...toBeAdded,
                                        name: e.target.value,
                                    });
                                }}
                                color="info"
                            />
                            <TextField
                                type="number"
                                InputProps={{
                                    inputProps: {
                                        min: 0,
                                        step: 0.01,
                                    },
                                }}
                                placeholder="Amount"
                                value={toBeAdded.amount}
                                onChange={(e) => {
                                    setToBeAdded({
                                        ...toBeAdded,
                                        amount: Number(e.target.value),
                                    });
                                }}
                                color="info"
                            />
                            <TextField
                                placeholder="Unit"
                                value={toBeAdded.unit}
                                onChange={(e) => {
                                    setToBeAdded({
                                        ...toBeAdded,
                                        unit: e.target.value,
                                    });
                                }}
                                color="info"
                            />
                            <CustomButton
                                title="Add Ingredient"
                                backgroundColor="#475be8"
                                color="#fcfcfc"
                                icon={<Add />}
                                handleClick={() => addIngredient()}
                            />
                        </Box>
                    </form>
                    {selectionModel.length > 0 && (
                        <CustomButton
                            title="Delete Selected"
                            backgroundColor="#d42e2e"
                            color="#fcfcfc"
                            icon={<Delete />}
                            handleClick={() => deleteIngredients()}
                        />
                    )}
                </>
            )}

            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                disableSelectionOnClick
                autoHeight
                onSelectionModelChange={(ids) => {
                    setSelectionModel(ids);
                }}
                sx={{ mt: 3 }}
            />
        </>
    );
}

export default ShoppingList;
