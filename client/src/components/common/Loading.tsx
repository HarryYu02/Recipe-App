import React from "react";
import { Box, CircularProgress } from "@mui/material";

function Loading() {
    return (
        <Box position="absolute" top="50%" left="50%" mr="-50%" color="#808191">
            <CircularProgress color="inherit" />
        </Box>
    );
}

export default Loading;
