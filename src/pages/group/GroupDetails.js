import { useEffect, useState } from "react";
import { Box, Grid, Hidden } from "@mui/material";
import ProfilePic from "../../layouts/banner/ProfilePic";
import CoverPic from "../../layouts/banner/CoverPic";
import About from "../../layouts/about/About";
import Info from "../../layouts/info/Info";
import Images from "../../layouts/media/Images";
import Videos from "../../layouts/media/Videos";
import Members from "../../layouts/members/Members";
import JoinRequests from "../../layouts/join_requests/JoinRequests";
import Similars from "../../layouts/similars/Similars";
import LikedGroups from "../../layouts/liked_groups/LikedGroups";
import Products from "../../layouts/products/Products";
import ProfilePicForMobile from "../../layouts/banner/ProfilePicForMobile";
import { useParams } from "react-router-dom";
// import Timeline from "../../components/profile/timeline/TimeLine";
import CreatePost from "../../components/post/Create";
import { getGroupDetailsById } from "../../utils/helpers/group/group_crud";
import { useAppContext } from "../../context/app-context";
import Post from "../../components/post";
import Loading from "../../components/loading/Loading";

const GroupDetails = () => {
  const {
    getGroupNewsfeed,
    loading,
    setGeneralIdofParent,
    groupFormData,
    setGroupFormData,
  } = useAppContext();
  const { groupId } = useParams();
  const [groupData, setGroupData] = useState({});
 console.log("data of single group ", groupData)

  const getSingleGroupDetails = async (givenId) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getGroupDetailsById(lsUser?.token?.access, givenId);
    if (response?.status) {
      setGroupData(response?.data);
    }
  };

  useEffect(() => {
    getSingleGroupDetails(groupId);
    getGroupNewsfeed(groupId);
    setGeneralIdofParent(groupId);
  }, [groupId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid
      container
      p={1}
      backgroundColor="#F1F3F4"
      minHeight="100vh"
      minWidth="100wh"
    >
      <Hidden mdDown>
        <Grid item xs={12} md={3} p={1} height="283px">
          {/* Profile Picture */}
          <ProfilePic
            profile_pic={groupData?.group?.profile_pic}
            user_id={groupData?.group?.user}
          />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9} p={1} height="283px">
        {/* Cover Picture */}
        <CoverPic
          group={groupData?.group}
          id= { groupData?.group?.id}
          cover_pic={groupData?.group?.cover_pic}
          mainName={groupData?.group?.group_name}
          headline={groupData?.group?.headline}
          actionBtn={"Join Group"}
          user_id={groupData?.group?.user}
        />
      </Grid>
      <Hidden mdUp>
        <Grid item xs={12} p={1}>
          {/* Profile Picture for Mobile */}
          <ProfilePicForMobile
            user_id={groupData?.group?.user}
            profile_pic={groupData?.group?.profile_pic}
            mainName={groupData?.group?.group_name}
            headline={groupData?.group?.headline}
          />
        </Grid>
      </Hidden>
      {/*=========================== left Area ==========================*/}
      <Grid item container xs={12} md={3} p={1} rowGap={1} height="fit-content">
        <Grid item xs={12}>
          {/* About */}
          <About
            about={groupData?.group?.group_about}
            user_id={groupData?.group?.user}
          />
        </Grid>

        {/* Info */}
        {/* <Grid item xs={12}>
          <Info />
        </Grid> */}

        {/* Images */}
        <Grid item xs={12}>
          <Images imageArr={groupData?.group_images} />
        </Grid>
        {/* Videos */}
        <Grid item xs={12}>
          <Videos videoArr={groupData?.group_videos} />
        </Grid>
      </Grid>
      {/*============================ Middle Area ============================*/}
      <Grid item xs={12} pt={1} pb={1} md={6}>
        {/* Posts will be displayed here */}
        <CreatePost givenId={groupId} title={"Group"} />
        <Post />
      </Grid>
      <Grid item container xs={12} md={3} p={1} rowGap={1} height="fit-content">
        {/*============================= right Area =============================*/}
        {/* Members */}
        <Grid item xs={12}>
          <Members
            title={"Group"}
            membersList={groupData?.group_members}
            totalMembers={groupData?.group?.group_members_count}
            given_id={groupData?.group?.id}
          />
        </Grid>
        {/* Join Requests */}
        <Grid item xs={12}>
          <JoinRequests
            title={"Group"}
            joiningRequests={groupData?.group_joining_requests}
            totalRequests={groupData?.group?.group_joining_requests_count}
            given_id={groupData?.group?.id}
          />
        </Grid>
        {/* Similars */}
        <Grid item xs={12}>
          <Similars
            title={"Group"}
            given_id={groupData?.group?.id}
            similars={groupData?.similar_groups}
            totalSimilars={groupData?.group?.similar_groups_count}
            totalMembers={groupData?.group?.group_members_count}
          />
        </Grid>
        {/* Liked Groups */}
        {/* <Grid item xs={12}>
          <LikedGroups />
        </Grid> */}
        {/* Products */}
        <Grid item xs={12}>
          <Products />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default GroupDetails;
