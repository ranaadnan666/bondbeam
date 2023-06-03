import { Box, Button, Grid, Hidden } from "@mui/material";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import About from "../../components/profile/about/About";
import Banner from "../../components/profile/banner/Banner";
import Education from "../../components/profile/education/Education";
import Experience from "../../components/profile/experience/Experience";
import Follower from "../../components/profile/follower/Follower";
import Following from "../../components/profile/following/Following";
import Group from "../../components/profile/group/Group";
import Image from "../../components/profile/image/Image";
import Info from "../../components/profile/info/Info";
import Language from "../../components/profile/language/Language";
import License from "../../components/profile/license/License";
import LikedGroup from "../../components/profile/likedGroup/LikedGroup";
import Product from "../../components/profile/product/Product";
import Project from "../../components/profile/project/Project";
import Skill from "../../components/profile/skill/Skill";
import TimeLine from "../../components/profile/timeline/TimeLine";
import Video from "../../components/profile/video/Video";
import { useAppContext } from "../../context/app-context";
import { useState } from "react";
import { getUserExperience } from "../../utils/helpers/profile/experience_crud";
import { getUserEducation } from "../../utils/helpers/profile/education_crud";
import {
  getUserBio,
  followUser,
  unFollowUser,
} from "../../utils/helpers/user/user_data";
import { getUserSkill } from "../../utils/helpers/profile/skill_crud";
import { getUserLanguage } from "../../utils/helpers/profile/language_crud";
import { getUserLicense } from "../../utils/helpers/profile/license_crud";
import { getUserProject } from "../../utils/helpers/profile/project_crud";
import PostDialog from "../../components/dialog/PostDialog";
import Loading from "../../components/loading/Loading";

const Profile = () => {
  const { userId } = useParams();
  const { getUserTimeline, loading } = useAppContext();
  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [albums, setAlbums] = useState([]);
  const [error, setError] = useState(false);
  const [userVideoAlbumsState, setUserVideoAlbumsState] = useState([]);
  const [userData, setUserData] = useState({});
  const [userExperience, setUserExperience] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [userSkill, setUserSkill] = useState([]);
  const [userLanguage, setUserLanguage] = useState([]);
  const [userLicense, setUserLicense] = useState([]);
  const [userProject, setUserProject] = useState([]);
  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));

  // ================== Get User Info ==================
  const userInfo = async (id, token) => {
    const response = await getUserBio(id, token);
    if (response?.status_code === 200) {
      setUserData(response);
    }
    if (response?.status_code === 401) {
      setError(true);
      setErrorMessage(response?.msg);
      return;
    }
    if (response?.status_code === 400) {
      setErrorMessage(response?.msg);
      return;
    }
  };

  // ================== Get Followers ==================
  const getFollowers = async (id) => {
    const response = await fetch(
      `https://api.bondbeam.com/api/user_followers/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${lsUser?.token?.access}`,
        },
      }
    );
    const data = await response.json();
    setFollowers(data.results);
  };
  // ================== Get Followings ==================
  const getFollowings = async (id) => {
    const response = await fetch(
      `https://api.bondbeam.com/api/user_following/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${lsUser?.token?.access}`,
        },
      }
    );
    const data = await response.json();
    setFollowings(data.results);
  };
  // ================== Get Album ==================
  const getAlbums = async (id) => {
    const response = await fetch(
      `https://api.bondbeam.com/api/user_photo_album/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${lsUser?.token?.access}`,
        },
      }
    );
    const data = await response.json();
    setAlbums(data?.results);
  };

  // ================== Get User video Album ==================
  const getUserVideoAlbums = async (id) => {
    const response = await fetch(
      `https://api.bondbeam.com/api/user_video_album/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${lsUser?.token?.access}`,
        },
      }
    );
    const data = await response.json();
    setUserVideoAlbumsState(data.results);
  };

  // ================== Follow ==================
  const onFollow = async (followingUser) => {
    const response = await followUser(followingUser, lsUser?.token?.access);
    if (response?.status) {
      userInfo(userId, lsUser?.token?.access);
    }
  };
  // ================== Un-Follow ==================
  const onUnFollow = async (followingUser) => {
    const response = await unFollowUser(followingUser, lsUser?.token?.access);
    if (response?.status) {
      userInfo(userId, lsUser?.token?.access);
    }
  };
  // ================== Get User Experience ==================
  const getExperience = async (id) => {
    const response = await getUserExperience(id);
    setUserExperience(response);
    return response;
  };
  // ================== Get User Education ==================
  const getEducation = async (id) => {
    const response = await getUserEducation(id);
    setUserEducation(response);
    return response;
  };
  // ================== Get User Skill ==================
  const getSkill = async (id) => {
    const response = await getUserSkill(id);
    setUserSkill(response);
    return response;
  };
  // ================== Get User Language ==================
  const getLanguage = async (id) => {
    const response = await getUserLanguage(id);
    setUserLanguage(response);
    return response;
  };
  // ================== Get User License ==================
  const getLicense = async (id) => {
    const response = await getUserLicense(id);
    setUserLicense(response);
    return response;
  };
  // ================== Get User Project ==================
  const getProject = async (id) => {
    const response = await getUserProject(id);
    setUserProject(response);
    return response;
  };

  useEffect(() => {
    userInfo(userId, lsUser?.token?.access);
    getFollowers(userId);
    getFollowings(userId);
    getAlbums(userId);
    getUserVideoAlbums();
    getUserTimeline(userId);
    getExperience(userId);
    getEducation(userId);
    getSkill(userId);
    getLanguage(userId);
    getLicense(userId);
    getProject(userId);
    // eslint-disable-next-line
  }, [userId]);

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          fontSize: "2rem",
          color: "red",
          flexDirection: "column",
          rowGap: "1rem",
        }}
      >
        <h3>{errorMessage}</h3>
        <br />
        <Link to="/">Go back to Home</Link>
      </Box>
    );
  }

  loading && <Loading />;

  return (
    <>
      <PostDialog />
      <Grid container backgroundColor="#F1F3F4">
        <Grid container item xs={12} md={8} maxHeight="fit-content">
          {/* Left side --------------- Main Area */}
          <Banner
            userData={userData}
            onFollow={onFollow}
            onUnFollow={onUnFollow}
            userInfo={userInfo}
          />
          <Info userData={userData} userInfo={userInfo} />
          <About userData={userData} userInfo={userInfo} />
          <Experience
            userId={userId}
            userData={userData}
            userExperience={userExperience}
            getUserExperience={getExperience}
          />
          <Education
            userId={userId}
            userData={userData}
            userEducation={userEducation}
            getUserEducation={getEducation}
          />
          <Skill
            userId={userId}
            userData={userData}
            userSkill={userSkill}
            getUserSkill={getSkill}
          />
          <Language
            userId={userId}
            userData={userData}
            userLanguage={userLanguage}
            getUserLanguage={getLanguage}
          />
          <License
            userId={userId}
            userData={userData}
            userLicense={userLicense}
            getUserLicense={getLicense}
          />
          <Project
            userId={userId}
            userData={userData}
            userProject={userProject}
            getUserProject={getProject}
          />
          <TimeLine userId={userId} />
          <Hidden mdDown>
            <Grid xs={12} item p={2} textAlign="center">
              <Button
                sx={{
                  width: "50%",
                  borderRadius: "34px",
                  backgroundColor: "white",
                  color: "#464646",
                  border: "none",
                  outline: "none",
                }}
                variant="outlined"
              >
                End of the Page
              </Button>
            </Grid>
          </Hidden>
        </Grid>
        {/* =============== Right side of Profile page ================= */}
        <Grid item xs={12} md={4} p={1} height="fit-content">
          <Follower followers={followers} userId={userId} />
          <Following followings={followings} userId={userId} />
          <Image albums={albums} userId={userId} />
          <Video userVideo={userVideoAlbumsState} userId={userId} />
          <Group />
          <LikedGroup />
          <Product />
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
