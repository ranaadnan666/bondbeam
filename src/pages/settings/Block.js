import React from "react";
import {
  Typography,
  Grid,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";

const Block = () => {
  const [blockedUsers, setBlockedUsers] = React.useState([]);
  React.useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);

  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;

  const getdata = () => {
    fetch("https://api.bondbeam.com/api/block_user/", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.status === true) {
          setBlockedUsers(data.data);
        } else {
          const err = data?.detail ? data?.detail : data?.msg;
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const blockAPI = (obj) => {
    // check if blocked user list is empty then show infor in Swal
    if (blockedUsers.length === 0) {
      Swal.fire({
        title: "Info",
        text: "No user is blocked",
        icon: "info",
        confirmButtonText: "OK",
      });
      return;
    }
    fetch("https://api.bondbeam.com/api/block_user/", {
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
        } else {
          Swal.fire({
            title: "Error",
            text: "Something Went Wrong",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };

  const unBlockOne = (id = null) => {
    const obj = {
      block_user: id,
      unblock_user: "true",
    };
    blockAPI(obj);
    const newArray = blockedUsers.filter((item) => item.block_user.id !== id);
    setBlockedUsers(newArray);
  };

  const unBlockAll = () => {
    const obj = {
      block_user: "All",
      unblock_user: "All",
    };
    blockAPI(obj);
    setBlockedUsers([]);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", marginBottom: 3, padding: "2rem" }}
        gutterBottom
      >
        You Blocked Users
      </Typography>

      <Grid
        container
        spacing={2}
        justifyContent="center"
        columnSpacing={{ sm: 5, lg: 20 }}
      >
        <Grid item xs={8}>
          <List>
            {blockedUsers.map(({ block_user }, index) => {
              return (
                <Paper
                  elevation={6}
                  key={index}
                  component="div"
                  sx={{ margin: 1, borderRadius: "10px" }}
                >
                  <ListItem
                    sx={{
                      backgroundColor: "#FFFF",
                      borderRadius: "10px",
                      flexDirection: { xs: "column", sm: "row" },
                      width: { xs: "100%" },
                      overflow: { xs: "hidden", sm: "auto" },
                      textAlign: { xs: "center", sm: "left" },
                      padding: { xs: "10px", sm: 2 },
                      "& .MuiListItemSecondaryAction-root.css-518kzi-MuiListItemSecondaryAction-root":
                        {
                          position: { xs: "initial", sm: "absolute" },
                          marginTop: { xs: 2, sm: "auto" },
                        },
                    }}
                    secondaryAction={
                      <Button
                        variant="outlined"
                        onClick={() => unBlockOne(block_user.id)}
                        sx={{
                          fontSize: { xs: "12px", sm: "14px" },
                          backgroundColor: "white",
                          color: "#000000",
                          borderRadius: "8px",
                          textAlign: "center",
                          borderColor: "#000000",
                          "&:hover": {
                            backgroundColor: "#000000",
                            color: "white",
                            borderColor: "white",
                          },
                        }}
                      >
                        Unblock
                      </Button>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar src={block_user.user_pic}>
                        {/* <PersonIcon /> */}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={block_user.username}
                      secondary="Engineer"
                    />
                  </ListItem>
                </Paper>
              );
            })}
            {blockedUsers?.length === 0 && (
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                You haven't blocked any user yet
              </Box>
            )}
          </List>
        </Grid>
      </Grid>

      <Grid item xs={12} textAlign="center">
        {blockedUsers?.length > 0 && (
          <Button
            variant="contained"
            onClick={unBlockAll}
            sx={{
              backgroundColor: "#000000",
              color: "white",
              marginTop: "20px",
              borderRadius: "8px",
              textAlign: "center",
              "&:hover": {
                color: "#000000",
                backgroundColor: "white",
              },
            }}
          >
            Unblock All
          </Button>
        )}
      </Grid>
    </>
  );
};

export default Block;
