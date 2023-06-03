import { Box } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Apply from "../../components/job/Apply";

const ApplyToJob = () => {
  const { jobId } = useParams();
  return (
    <Box
      sx={{
        backgroundColor: "#F1F3F4",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <Apply id={jobId} />
    </Box>
  );
};

export default ApplyToJob;
