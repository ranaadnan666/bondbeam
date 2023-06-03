import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, Grid, Stack } from "@mui/material";
import moment from "moment";
import defaultPic from "../../images/default.png";
import { Link } from "react-router-dom";
import { useAppContext } from "../../context/app-context";
import { singlePost } from "../../data/Dummy";
import { readNotifications } from "../../utils/helpers/notification/notifications";

const NotificationCard = ({ obj }) => {
  // const { setAllNewsFeed, allNewsFeed } = useAppContext();


  const handleClickNotification = async (id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"))
    const response = await readNotifications(lsUser?.token?.access, id)
    console.log("response", response)


  };

  console.log("Obj in NotificationCard", obj)

  return (
    <>
      <Stack
        direction="column"
        className={obj?.is_read === false ? "notification-card" : "notification-card-read"}
        // sx={obj?.is_read === false ?{ background : "blue"} : {background: "green"}}
        onClick={() => handleClickNotification(obj?.id)}
      >
        <Stack
          direction="row"
          justifyContent={"space-between"}
          columnGap={"2px"}
        >
          <Link
            className="notification-card-user"
            to={`/profile/${obj?.sender?.id}`}
          >
            <Stack direction="row" alignItems={"center"} columnGap={1}>
              <Avatar
                src={obj?.sender?.profile_pic || defaultPic}
                sx={{ height: 60, width: 60 }}
              />
              <p
                style={{
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {obj?.sender?.first_name}&nbsp;
                {obj?.sender?.last_name}
              </p>
            </Stack>
          </Link>
          <Stack direction="column" alignItems={"flex-end"} columnGap={1}>
            <p>{moment(obj?.created_at).format("MMM YYYY, h:mm A")}</p>
            <p> {moment(obj?.created_at).startOf("minute").fromNow()}</p>
          </Stack>
        </Stack>
        <Stack direction="row" alignItems="center" columnGap={"2px"}>
          <Typography p={1}>{obj?.message}</Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default NotificationCard;
