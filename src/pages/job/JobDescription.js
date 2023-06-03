import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Description from "../../components/job/Description";

const JobDescription = () => {
  const { jobId } = useParams();
  return (
    <Box
      sx={{
        backgroundColor: "#F3F2EF",
        minHeight: "100vh",
        padding: "10px",
      }}
    >
      <Box
        sx={{
          width: { xs: "95%", md: "60%" },
          mx: "auto",
          height: "100%",
        }}
      >
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <h3>Job Details</h3>
          <p>Read description carefully before apply the job</p>
        </Box>
        <Description id={jobId} />
      </Box>
    </Box>
  );
};

export default JobDescription;
