import React from "react";
import { useOne } from "@pankod/refine-core";
import { useParams } from "@pankod/refine-react-router-v6";
import { Box, CircularProgress } from "@pankod/refine-mui";

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
