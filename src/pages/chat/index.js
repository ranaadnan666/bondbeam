import * as React from "react";

import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import Head from "../../components/chat/right/Head";
import Body from "../../components/chat/right/Body";
import Foot from "../../components/chat/right/Foot";
import Sidebar from "../../components/chat/left/Sidebar";

export default function Chat() {
  return (
    <Grid
      container
      padding={"20px 0px"}
      width={{ xs: "100%", sm: "90%", md: "70%" }}
      mx="auto"
      height="90vh"
    >
      <Sidebar />
      <Grid
        item
        xs={12}
        sm={7}
        p={{ xs: "5px", md: "20px" }}
        border="1px solid silver"
      >
        {/* main area */}
        <Stack
          direction={"column"}
          justifyContent="space-between"
          height="100%"
        >
          <div>
            <Head />
            <Body />
          </div>
          <Foot />
        </Stack>
      </Grid>
    </Grid>
  );
}
