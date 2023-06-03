import React, { useEffect, useState } from "react";
import { Typography, Grid, Button } from "@mui/material";

const Sessions = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);
  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  let useraddred = authUser.data.address;
  const token = `Bearer ${authUser?.token?.access}`;
  const getdata = () => {
    fetch("https://api.bondbeam.com/api/user_session", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setdata(data.data);
      });
  };
  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", marginBottom: 3 }}
        gutterBottom
      >
        Manage Sessions
      </Typography>
      <Grid container spacing={2} px={{ sm: 3, lg: 4 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#000000",
              color: "white",
              borderRadius: "8px",
              textAlign: "center",
              "&:hover": {
                color: "#000000",
                backgroundColor: "white",
              },
            }}
          >
            Logout from all Sessions
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "500", marginBottom: 3 }}
          >
            You're signed in to {data.length} session <br />
            Current Session <br /> <br />
            Details <br />
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "600", marginBottom: 3 }}
          >
            {useraddred !== null ? "Lahore, Punjab, Pakistan" : useraddred}{" "}
            <br />
            (Approximate location)
          </Typography>

          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "600", marginBottom: 3 }}
          >
            {data ? data[0]?.device_name : ""} on{" "}
            {data ? data[0]?.operating_system : ""} <br />
            <br />
            IP Address: <br />
            {data ? data[0]?.ip : ""}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default Sessions;
