import { Grid, Hidden } from "@mui/material";
import ProfilePic from "../../layouts/banner/ProfilePic";
import CoverPic from "../../layouts/banner/CoverPic";
import About from "../../layouts/about/About";
// import Info from "../../layouts/info/Info";
import Images from "../../layouts/media/Images";
import Videos from "../../layouts/media/Videos";
import Members from "../../layouts/members/Members";
// import JoinRequests from "../../layouts/join_requests/JoinRequests";
import Similars from "../../layouts/similars/Similars";
// import LikedGroups from "../../layouts/liked_pages/LikedGroups";
import Products from "../../layouts/products/Products";
import ProfilePicForMobile from "../../layouts/banner/ProfilePicForMobile";
import { useParams } from "react-router-dom";
// import Timeline from "../../components/profile/timeline/TimeLine";
import CreatePost from "../../components/post/Create";
import { useAppContext } from "../../context/app-context";
import { useEffect, useState } from "react";
import { getPageDetailsById } from "../../utils/helpers/page/page_crud";
import Post from "../../components/post";
import Loading from "../../components/loading/Loading";

const PageDetails = () => {
  const { getPageNewsfeed, loading, setGeneralIdofParent, user } =
    useAppContext();
  const [pageData, setPageData] = useState({});
  const { pageId } = useParams();
  const creatorOfPageId = pageData?.page?.user.id; // page creator id

  const getSinglePageDetails = async (givenId) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getPageDetailsById(lsUser?.token?.access, givenId);
    if (response?.status) {
      setPageData(response?.data);
    }
  };

  useEffect(() => {
    getSinglePageDetails(pageId);
    getPageNewsfeed(pageId);
    setGeneralIdofParent(pageId);
  }, [pageId]);

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
            profile_pic={pageData?.page?.profile_pic}
            user_id={pageData?.page?.user}
          />
        </Grid>
      </Hidden>
      <Grid item xs={12} md={9} p={1} height="283px">
        {/* Cover Picture */}
        <CoverPic
          page={pageData}
          id={pageData.id}
          cover_pic={pageData?.page?.cover_pic}
          mainName={pageData?.page?.page_name}
          headline={pageData?.page?.headline}
          actionBtn={"Like Page"}
          user_id={pageData?.page?.user}
        />
      </Grid>
      <Hidden mdUp>
        <Grid item xs={12} p={1}>
          {/* Profile Picture for Mobile */}
          <ProfilePicForMobile
            user_id={pageData?.page?.user}
            profile_pic={pageData?.page?.profile_pic}
            mainName={pageData?.page?.page_name}
            headline={pageData?.page?.headline}
          />
        </Grid>
      </Hidden>
      <Grid item container xs={12} md={3} p={1} rowGap={1} height="fit-content">
        {/*=========================== left Area ==========================*/}
        <Grid item xs={12}>
          {/* About */}
          <About about={pageData?.page?.page_about} />
        </Grid>

        {/* Info */}
        {/* <Grid item xs={12}>
          <Info />
        </Grid> */}

        {/* Images */}
        <Grid item xs={12}>
          <Images imageArr={pageData?.page_images} />
        </Grid>
        {/* Videos */}
        <Grid item xs={12}>
          <Videos videoArr={pageData?.page_videos} />
        </Grid>
      </Grid>
      <Grid item xs={12} md={6} p={1}>
        {/*============================ Middle Area ============================*/}
        {/* Posts will be displayed here */}
        {creatorOfPageId === user?.data?.id && (
          <CreatePost givenId={pageId} title={"Page"} />
        )}
        {/* <TimeLine userId={userId} /> */}
        <Post />
      </Grid>
      <Grid item container xs={12} md={3} p={1} rowGap={1} height="fit-content">
        {/*============================= right Area =============================*/}
        {/* Members */}
        <Grid item xs={12}>
          <Members
            title={"Page"}
            membersList={pageData?.page_followers}
            totalMembers={pageData?.page?.page_members_count}
            given_id={pageData?.page?.id}
          />
        </Grid>
        {/* Join Requests */}
        {/* <Grid item xs={12}>
          <JoinRequests
            title={"Page"}
            joiningRequests={pageData?.page_joining_requests}
            totalRequests={pageData?.page?.page_joining_requests_count}
            given_id={pageData?.page?.id}
          />
        </Grid> */}
        {/* Similars */}
        <Grid item xs={12}>
          <Similars
            title={"Page"}
            given_id={pageData?.page?.id}
            similars={pageData?.similar_pages}
            totalSimilars={pageData?.page?.similar_pages_count}
            totalMembers={pageData?.page?.page_members_count}
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

export default PageDetails;
