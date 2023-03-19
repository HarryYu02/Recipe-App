import React, { useContext } from "react";
import { useGetIdentity } from "@refinedev/core";
import { AppBar, IconButton, Stack, Toolbar, Typography, Avatar } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import { ColorModeContext } from "contexts";

export const Header: React.FC = () => {
    const { mode, setMode } = useContext(ColorModeContext);

    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true
    });
    const shouldRenderHeader = true; // since we are using the dark/light toggle; we don't need to check if user is logged in or not.

    return shouldRenderHeader ? (
        <AppBar
            color="default"
            position="sticky"
            elevation={0}
            sx={{ background: "#FCFCFC" }}
        >
            <Toolbar>
                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="flex-end"
                    alignItems="center"
                >
                    {/* <IconButton
                        onClick={() => {
                            setMode();
                        }}
                    >
                        {mode === "dark" ? (
                            <LightModeOutlined />
                        ) : (
                            <DarkModeOutlined />
                        )}
                    </IconButton> */}
                    <Stack
                        direction="row"
                        gap="16px"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {user?.name ? (
                            <Typography variant="subtitle2">
                                {user?.name}
                            </Typography>
                        ) : null}
                        {user?.avatar ? (
                            <Avatar src={user?.avatar} alt={user?.name} />
                        ) : null}
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    ) : null;
};
