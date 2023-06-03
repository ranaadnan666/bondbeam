import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";

export default function AlignItemsList({
  list,
  setlistdata,
  setinp,
  inp,
  setBlur,
}) {
  window.document.addEventListener("click", function () {
    if (inp !== "") {
      setlistdata([]);
      setinp("");
    }
  });
  const userData = JSON.parse(localStorage.getItem("userLoggedIn"));
  //
  const LoguserId = userData?.data?.id;
  const click = () => {
    setlistdata([]);
    setinp("");
  };
  return (
    <>
      {list?.length > 0 && (
        <List
          // width={{xl:'28%'}}
          sx={{
            minWidth: "100%",
            bgcolor: "background.paper",
            top: "5vh",
            zIndex: "999",
            position: "absolute",
            maxHeight: "50vh",
            overflowY: "auto",
          }}
        >
          {list?.map((item, index) => {
            return (
              <Link
                key={index}
                onClick={() => {
                  click();
                  setBlur(false);
                }}
                to={`profile/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt="Travis Howard"
                      src={
                        item.profile_pic
                          ? item.profile_pic
                          : "/static/images/avatar/2.jpg"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                        variant={"subtitle1"}
                      >
                        {item.first_name + " " + item.last_name}
                        {item.is_verified === "Approved" && (
                          <VerifiedIcon
                            color="info"
                            fontSize={"18"}
                            sx={{ marginRight: "5px" }}
                          />
                        )}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          @{item.username}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </Link>
            );
          })}
        </List>
      )}
    </>
  );
}
