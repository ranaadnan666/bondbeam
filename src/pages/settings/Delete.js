import React from "react";
import { Typography, Grid, Button } from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Delete = () => {
  let navigate = useNavigate();
  const deleteUser = () => {
    Swal.fire({
      title: "Are you sure you want to delete your account?",
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        send();
      }
    });
  };

  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;

  const send = () => {
    const obj = {
      delete: "Conform",
    };
    fetch("https://api.bondbeam.com/api/delete_user_account/", {
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
            text: "Account deleted successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
          localStorage.removeItem("userLoggedIn");
          navigate("/signin");
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
        Delete Account
      </Typography>

      <Grid container spacing={3} p={2} columnSpacing={{ sm: 5, lg: 20 }}>
        <Grid item xs={12} my={4}>
          <Typography variant="subtitle" sx={{ fontWeight: "600" }}>
            <strong>Warning!</strong> Deleting your account will delete your
            access and all your information on this site.
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} textAlign="center">
        <Button
          variant="contained"
          color="error"
          onClick={deleteUser}
          my={2}
          sx={{
            // backgroundColor: "#000000",
            // color: "white",
            // marginTop: "20px",
            borderRadius: "8px",
            textAlign: "center",
            // "&:hover": {
            //   color: "#000000",
            //   backgroundColor: "white",
            // },
          }}
        >
          Delete account
        </Button>
      </Grid>
    </>
  );
};

export default Delete;
