import { Grid } from "@mui/material";
import { useEffect } from "react";
import Loading from "../../components/loading/Loading";
import Modal from "../../components/modal/Modal";
import LeftArea from "../../components/newsfeed/left/LeftArea";
import MiddleArea from "../../components/newsfeed/middle";
import RightArea from "../../components/newsfeed/right/RightArea";
import { useAppContext } from "../../context/app-context";
import {getNotifications} from "./../../utils/helpers/notification/notifications";




const NewsFeed = () => {
  const { getNewsFeed, loading, getRecentArrived, allNewsFeed } =
    useAppContext();
  useEffect(() => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    getRecentArrived(lsUser?.token?.access);
    getNewsFeed();
    getNotifications(lsUser?.token?.access)
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {allNewsFeed.isModalOpen && (
        <Modal msg={allNewsFeed.msg} isError={allNewsFeed.isError} />
      )}
      <Grid
        container
        backgroundColor="#F3F2EF"
        minHeight="100vh"
        minWidth="100wh"
      >
        <LeftArea />
        <MiddleArea />
        <RightArea />
      </Grid>
    </>
  );
};

export default NewsFeed;
