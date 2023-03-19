import React from "react";
import { useRouterContext, TitleProps } from "@refinedev/core";
import { Button } from "@mui/material";

import { logoNoBackground, logoCollapsed } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src={logoCollapsed} alt="Refine" width="28px" />
        ) : (
          <img src={logoNoBackground} alt="Refine" width="140px" />
        )}
      </Link>
    </Button>
  );
};
