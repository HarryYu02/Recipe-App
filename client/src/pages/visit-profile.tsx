import React from "react";
import { useOne } from "@refinedev/core";
import { useParams } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";

import { Profile, Loading } from "components";

const VisitProfile = () => {
    const { id } = useParams();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: id as string,
    });
    // console.log(data, isLoading, isError);

    const visitProfile = data?.data ?? [];
    // console.log(visitProfile, isLoading, isError);

    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;

    return (
        <Profile
            type={`${visitProfile.name}'s`}
            name={visitProfile.name}
            email={visitProfile.email}
            avatar={visitProfile.avatar}
            recipes={visitProfile.allRecipes}
        />
    );
};

export default VisitProfile;
