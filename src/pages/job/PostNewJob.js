import { Box } from "@mui/material";
import React from "react";
import PostNewJob from "../../components/job/PostNewJob";

const PostAJob = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F1F3F4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <PostNewJob />
    </Box>
  );
};

export default PostAJob;
