import React, { useState } from "react";
import { Typography, Grid, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";

const Password = () => {
  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;
  const [oldpass, setoldpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [confrompass, setconfrompass] = useState("");
  const change = () => {
    const obj = {
      old_password: oldpass,
      new_password: newpass,
      confirm_password: confrompass,
    };
    fetch("https://api.bondbeam.com/api/change_user_password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(obj),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === true) {
          Swal.fire({
            title: "Success",
            text: data.msg,
            icon: "success",
            confirmButtonText: "OK",
          });
          setnewpass("");
          setoldpass("");
          setconfrompass("");
        } else {
          const err = data.detail ? data.detail : Object.values(data?.msg)[0];
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", marginBottom: 3 }}
        gutterBottom
      >
        Change Password
      </Typography>
      <Grid container spacing={2} columnSpacing={{ sm: 5, lg: 20 }}>
        <Grid item xs={12}>
          <TextField
            id="cpassword"
            name="cpassword"
            label="Current Password"
            value={oldpass}
            onChange={(e) => setoldpass(e.target.value)}
            fullWidth
            variant="standard"
            // InputLabelProps={{
            //   shrink: true,
            // }}
            size="large"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="npassword"
            name="npassword"
            value={newpass}
            onChange={(e) => setnewpass(e.target.value)}
            label="New Password"
            fullWidth
            variant="standard"
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="conpassword"
            name="conpassword"
            value={confrompass}
            onChange={(e) => setconfrompass(e.target.value)}
            label="Confirm New Password"
            fullWidth
            variant="standard"
            // InputLabelProps={{
            //   shrink: true,
            // }}
          />
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            onClick={change}
            sx={{
              backgroundColor: "#000000",
              color: "white",
              marginTop: "20px",
              borderRadius: "8px",
              width: "120px",
              textAlign: "center",
              "&:hover": {
                color: "#000000",
                backgroundColor: "white",
              },
            }}
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Password;
