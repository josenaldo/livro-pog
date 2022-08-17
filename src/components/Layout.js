import React from "react";

import { Box } from "@mui/material";

export default function Layout({ children }) {
    return (
        <>
            <Box />
            <main>{children}</main>
            <Box />
        </>
    );
}
