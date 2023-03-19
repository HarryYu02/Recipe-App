import { useGetIdentity, useOne } from "@pankod/refine-core";

import { Profile, Loading } from "components";

const MyProfile = () => {
    const { data: user } = useGetIdentity();
    const { data, isLoading, isError } = useOne({
        resource: "users",
        id: user?.userId,
    });
    // console.log(data, isLoading, isError);

    const myProfile = data?.data ?? [];
    // console.log(myProfile, isLoading, isError);

    if (isLoading) return <Loading />;
    if (isError) return <div>Error</div>;

    return (
        <Profile
            type="My"
            name={myProfile.name}
            email={myProfile.email}
            avatar={myProfile.avatar}
            recipes={myProfile.allRecipes}
        />
    );
};

export default MyProfile;
