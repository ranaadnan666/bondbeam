import { useEffect, useState } from "react";
import { useAppContext } from "../../context/app-context";
import NotificationCard from "../../layouts/notification/NotificationCard";
import { Grid, Stack, Typography, Pagination, Button } from "@mui/material";
import { Link } from "react-router-dom";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { readNotifications } from "../../utils/helpers/notification/notifications";

const NotificationList = () => {
  const { notifications, getAllNotifications, setAllNotifications } =
    useAppContext();
  const [currentPage, setCurrentPage] = useState(1);
  const handleClickNotification = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"))
    const response = await readNotifications(lsUser?.token?.access, "mark_all_read")
    


  };


  useEffect(() => {
    getAllNotifications(currentPage || 1);
  }, [currentPage]);
  // console.log(notifications)
  return (
    <>
      <Grid
        justifyContent={"center"}
        alignItems={"center"}
        container
        item
        md={6}
        xs={12}
        p={4}
        fontSize={{ xs: "10px", sm: "14px", md: "normal" }}
        height="fit-content"
      >
        <Grid item xs={10}>
          <Typography mb={3} textAlign={"center"} variant="h5">
            {notifications?.length === 0
              ? "No Notifications found"
              : "All Notifications"}
          </Typography>
        </Grid>
          <Button variant="text" startIcon={<DoneAllIcon />} onClick={() => handleClickNotification()}>
            Mark all as read
          </Button>

        {notifications?.results?.map((notification) => (
          <Grid direction="row" key={notification?.id} item xs={12}>
            <Link
              className="notification-card-link"
              to={`/single-post-detail/${notification?.details?.object_id}/${notification?.details?.type}`}
            >
              <NotificationCard obj={notification} />
            </Link>
          </Grid>
        ))}
        {/* <Pagination count={notifications?.count / notifications?.results?.length} /> */}
      </Grid>
    </>
  );
};

export default NotificationList;
