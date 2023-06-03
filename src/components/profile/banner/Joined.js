import { Box, Divider, Stack } from "@mui/material";
import moment from "moment";
import React from "react";
import dateFormat from "dateformat";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../../images/logo.png";

const AboutProfile = ({ userData, setAboutDialog }) => {
  const now = new Date(userData?.data?.date_joined);
  return (
    <Stack
      direction="column"
      rowGap={1}
      alignItems="flex-start"
      justifyContent="flex-start"
      // padding={2}
      // width="100%"
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        // mx="auto"
      >
        <h3 style={{ fontWeight: "bold" }}>About this profile</h3>
        <CloseIcon
          sx={{
            cursor: "pointer",
            color: "silver",
            "&:hover": {
              color: "black",
            },
          }}
          onClick={() => setAboutDialog(false)}
        />
      </Stack>
      <h2>
        {userData?.data?.first_name} {userData?.data?.last_name}
      </h2>
      <p>@{userData?.data?.username}</p>

      <Stack direction="row" alignItems="center" columnGap={1}>
        <img
          style={{
            width: "30px",
            height: "30px",
          }}
          src={Logo}
          alt="user data"
        />
        <h3 style={{ fontWeight: "normal" }}>Joined</h3>
        <Box>
          <p style={{ color: "silver" }}>
            {dateFormat(now, "dS mmm yyyy h:MM TT")}
          </p>
          <p style={{ color: "silver" }}>
            {moment(userData?.data?.date_joined).startOf("minute").fromNow()}
          </p>
        </Box>
      </Stack>
    </Stack>
  );
};

export default AboutProfile;
