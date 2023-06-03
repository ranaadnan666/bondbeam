import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  FormGroup,
} from "@mui/material";
import Swal from "sweetalert2";

const Notifications = () => {
  const [notification, setNotification] = useState({
    like_notify: false,
    comment_notify: false,
    shares_notify: false,
    follow_me_notify: false,
    mention_me_notify: false,
    join_my_group_notify: false,
  });

  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);
  useEffect(() => {}, [notification]);

  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;

  const getdata = () => {
    fetch("https://api.bondbeam.com/api/notify_to_user/", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === true) {
          let notifyData = data.data;
          delete notifyData.user;
          delete notifyData.id;
          setNotification(notifyData);
        } else {
          const err = data.detail
            ? data.detail
            : Object.values(data?.message)[0];
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const send = () => {
    fetch("https://api.bondbeam.com/api/notify_to_user/", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(notification),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === true) {
          Swal.fire({
            title: "Success",
            text: "Notification settings updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
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
        Notify me when
      </Typography>
      <Grid container spacing={2} px={{ sm: 3, lg: 4 }}>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel
              componentsProps={{
                typography: {
                  variant: "subtitle1",
                  fontWeight: 500,
                  lineHeight: { sm: 2, lg: 3 },
                },
              }}
              control={
                <Checkbox
                  color="success"
                  checked={notification.like_notify}
                  onChange={(e) => {
                    setNotification({
                      ...notification,
                      like_notify: e.target.checked,
                    });
                  }}
                  // sx={{
                  //   "& .MuiSvgIcon-root": {
                  //     sm: { fontSize: 20, paddingRight: 1 },
                  //     lg: { fontSize: 28, paddingRight: 2 },
                  //   },
                  // }}
                />
              }
              label="Someone likes my posts."
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              componentsProps={{
                typography: {
                  variant: "subtitle1",
                  fontWeight: 500,
                  lineHeight: { sm: 2, lg: 3 },
                },
              }}
              control={
                <Checkbox
                  color="success"
                  checked={notification.comment_notify}
                  onChange={(e) => {
                    setNotification({
                      ...notification,
                      comment_notify: e.target.checked,
                    });
                  }}
                  // sx={{
                  //   "& .MuiSvgIcon-root": {
                  //     sm: { fontSize: 20, paddingRight: 1 },
                  //     lg: { fontSize: 28, paddingRight: 2 },
                  //   },
                  // }}
                />
              }
              label="Someone comments on my posts."
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              componentsProps={{
                typography: {
                  variant: "subtitle1",
                  fontWeight: 500,
                  lineHeight: { sm: 2, lg: 3 },
                },
              }}
              control={
                <Checkbox
                  color="success"
                  checked={notification.shares_notify}
                  onChange={(e) => {
                    setNotification({
                      ...notification,
                      shares_notify: e.target.checked,
                    });
                  }}
                  // sx={{
                  //   "& .MuiSvgIcon-root": {
                  //     sm: { fontSize: 20, paddingRight: 1 },
                  //     lg: { fontSize: 28, paddingRight: 2 },
                  //   },
                  // }}
                />
              }
              label="Someone shares my posts."
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              componentsProps={{
                typography: {
                  variant: "subtitle1",
                  fontWeight: 500,
                  lineHeight: { sm: 2, lg: 3 },
                },
              }}
              control={
                <Checkbox
                  color="success"
                  checked={notification.follow_me_notify}
                  onChange={(e) => {
                    setNotification({
                      ...notification,
                      follow_me_notify: e.target.checked,
                    });
                  }}
                  // sx={{
                  //   "& .MuiSvgIcon-root": {
                  //     sm: { fontSize: 20, paddingRight: 1 },
                  //     lg: { fontSize: 28, paddingRight: 2 },
                  //   },
                  // }}
                />
              }
              label="Someone follows me."
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              componentsProps={{
                typography: {
                  variant: "subtitle1",
                  fontWeight: 500,
                  lineHeight: { sm: 2, lg: 3 },
                },
              }}
              control={
                <Checkbox
                  color="success"
                  checked={notification.mention_me_notify}
                  onChange={(e) => {
                    setNotification({
                      ...notification,
                      mention_me_notify: e.target.checked,
                    });
                  }}
                  // sx={{
                  //   "& .MuiSvgIcon-root": {
                  //     sm: { fontSize: 20, paddingRight: 1 },
                  //     lg: { fontSize: 28, paddingRight: 2 },
                  //   },
                  // }}
                />
              }
              label="Someone mentions me."
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              componentsProps={{
                typography: {
                  variant: "subtitle1",
                  fontWeight: 500,
                  lineHeight: { sm: 2, lg: 3 },
                },
              }}
              control={
                <Checkbox
                  color="success"
                  checked={notification.join_my_group_notify}
                  onChange={(e) => {
                    setNotification({
                      ...notification,
                      join_my_group_notify: e.target.checked,
                    });
                  }}
                  // sx={{
                  //   "& .MuiSvgIcon-root": {
                  //     sm: { fontSize: 20, paddingRight: 1 },
                  //     lg: { fontSize: 28, paddingRight: 2 },
                  //   },
                  // }}
                />
              }
              label="Someone joins my group."
            />
          </FormGroup>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            onClick={send}
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

export default Notifications;
