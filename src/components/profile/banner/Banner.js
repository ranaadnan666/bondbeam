import {
  Box,
  Button,
  Dialog,
  Grid,
  Hidden,
  IconButton,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import CoverDefault2 from "../../../images/defaultCover.webp";
import RoundedPic from "../../../images/album/album1.jpeg";
import EditIcon from "@mui/icons-material/Edit";
import DefaultProfilePic from "../../../images/default.png";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
import { useAppContext } from "../../../context/app-context";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Report from "./Report";
import InfoIcon from "@mui/icons-material/Info";
import AboutProfile from "./Joined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import BlockIcon from "@mui/icons-material/Block";
import { block, unBlock } from "../../../utils/helpers/user/user_data";

const Banner = ({ userData, userInfo, onFollow, onUnFollow }) => {
  const { user, userProfileUpdate } = useAppContext();
  const [profileloading, setProfileloading] = useState(false);
  const [coverloading, setCoverloading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [aboutDialog, setAboutDialog] = useState(false);

  // block user
  const blockUser = async (id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await block(id, lsUser?.token?.access);
    if (response?.status) {
      userInfo(id, lsUser?.token?.access);
      Swal.fire({
        title: "Success",
        text: "User blocked successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // unblock user
  const unBlockUser = async (id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await unBlock(id, lsUser?.token?.access);
    if (response?.status) {
      userInfo(id, lsUser?.token?.access);
      Swal.fire({
        title: "Success",
        text: "User unblocked successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  // data destructuring
  const firstName = userData?.data?.first_name;
  const lastName = userData?.data?.last_name;
  const userName = userData?.data?.username;
  const isVerified = userData?.data?.is_verified;
  const profilePic = userData?.data?.profile_pic;
  const coverImg = userData?.data?.cover_pic;

  const updateProfileImages = async (newFile, fileType) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const formdata = new FormData();
    formdata.append(fileType, newFile);
    const response = await userProfileUpdate(formdata, userData?.data?.id);

    if (response?.status_code === 200) {
      userInfo(userData?.data?.id, lsUser?.token?.access);
      Swal.fire({
        title: "Success",
        text: "Image uploaded successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  // handle cover image
  const handleCoverImage = (e) => {
    const newProfile = e.target.files[0];
    setProfileloading(true);
    updateProfileImages(newProfile, "cover_pic");
    setProfileloading(false);
  };

  // handle profile image
  const handleProfileImage = (e) => {
    const newProfile = e.target.files[0];
    setCoverloading(true);
    updateProfileImages(newProfile, "profile_pic");
    setCoverloading(false);
  };

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDots = () => {
    setAnchorEl(null);
  };

  if (userData?.status_code === 406) {
    return (
      <>
        <Grid item xs={12} maxHeight="251px" p={2}>
          <Box className="bg-text">
            <Stack
              direction="row"
              columnGap={1}
              alignItems="center"
              justifyContent="center"
            >
              <LockPersonIcon />
              <p>Nobody Can View the Banner</p>
            </Stack>
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Hidden mdDown>
        <Grid item xs={4} height="283px" p={1}>
          {/* profile picture */}
          <Box
            sx={{
              backgroundImage: `url(${profilePic || DefaultProfilePic})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              height: "100%",
              borderRadius: "10px",
              border: "1px solid silver",
              overflow: "hidden",
            }}
          >
            {user?.data?.id === userData?.data?.id && (
              <Stack
                direction="column"
                justifyContent="space-between"
                height="100%"
              >
                <Stack direction="row" justifyContent="flex-end">
                  <IconButton
                    color="primary"
                    disabled={profileloading ? true : false}
                    sx={{
                      background: "rgba(0, 0, 0, 0.4)",
                      color: "white",
                      width: "fit-content",
                      margin: "10px 10px 0px 0px",
                    }}
                    aria-label="edit"
                    component="label"
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      onChange={handleProfileImage}
                    />
                    {profileloading ? <CircularProgress /> : <EditIcon />}
                  </IconButton>
                </Stack>
                <Box
                  sx={{
                    background:
                      "linear-gradient(180deg, rgba(122, 122, 135, 0.0001) 0%, #171725 131.54%)",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    paddingLeft: "10px",
                  }}
                ></Box>
              </Stack>
            )}
          </Box>
        </Grid>
      </Hidden>
      <Grid item xs={12} md={8} height="283px" p={1}>
        {/* cover picture */}
        <Box
          sx={{
            backgroundImage: `url(${coverImg || CoverDefault2})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            height: "100%",
            borderRadius: "10px",
            border: "1px solid silver",
            overflow: "hidden",
          }}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            height="100%"
          >
            <Stack direction="row" justifyContent="flex-end">
              {user?.data?.id === userData?.data?.id && (
                <IconButton
                  color="primary"
                  disabled={coverloading ? true : false}
                  sx={{
                    background: "rgba(0, 0, 0, 0.4)",
                    color: "white",
                    width: "fit-content",
                    margin: "10px 10px 0px 0px",
                  }}
                  aria-label="edit"
                  component="label"
                >
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={handleCoverImage}
                  />
                  {coverloading ? <CircularProgress /> : <EditIcon />}
                </IconButton>
              )}
            </Stack>
            <Box
              sx={{
                background:
                  "linear-gradient(180deg, rgba(122, 122, 135, 0.0001) 0%, #171725 131.54%)",
                height: "100px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingLeft: "10px",
              }}
            >
              <Hidden mdDown>
                <Stack
                  direction={"column"}
                  color="white"
                  alignItems="flex-start"
                  fontWeight={"bold"}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    columnGap={1}
                  >
                    {firstName}&nbsp;{lastName}
                    {isVerified === "Approved" && (
                      <VerifiedIcon
                        color="info"
                        sx={{
                          fontSize: "18px",
                        }}
                      />
                    )}
                  </Stack>
                  <p style={{ fontWeight: "normal" }}>@{userName}</p>
                </Stack>
              </Hidden>
              {user?.data?.id !== userData?.data?.id && (
                <Stack direction="row" alignItems={"center"}>
                  <Button
                    sx={{
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={
                      userData?.data?.follower
                        ? () =>
                            onUnFollow({ following_user: userData?.data?.id })
                        : () => onFollow({ following_user: userData?.data?.id })
                    }
                    variant="contained"
                  >
                    {userData?.data?.follower ? "UnFollow" : "Follow"}
                  </Button>
                  {/* profile menu */}
                  <MoreVertIcon
                    onClick={handleClick}
                    fontSize="large"
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "teal",
                        transform: "scale(1.1)",
                        transition: "all 0.3s ease-in-out",
                      },
                    }}
                  />
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleCloseDots}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                  >
                    <MenuItem
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                      }}
                      onClick={
                        userData?.data?.is_blocked_user
                          ? () => {
                              handleCloseDots();
                              unBlockUser(userData?.data?.id);
                            }
                          : () => {
                              handleCloseDots();
                              blockUser(userData?.data?.id);
                            }
                      }
                    >
                      <Stack
                        direction={"row"}
                        columnGap={1}
                        alignItems={"center"}
                      >
                        {userData?.data?.is_blocked_user ? (
                          <LockOpenIcon />
                        ) : (
                          <BlockIcon />
                        )}
                        {userData?.data?.is_blocked_user ? "UnBlock" : "Block"}
                      </Stack>
                    </MenuItem>
                    <MenuItem
                      sx={{
                        "&:hover": {
                          color: "red",
                        },
                      }}
                    >
                      <Report handleCloseDots={handleCloseDots} />
                    </MenuItem>
                    <MenuItem
                      sx={{
                        "&:hover": {
                          color: "skyblue",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        columnGap={1}
                        alignItems="center"
                        onClick={() => {
                          setAboutDialog(true);
                        }}
                      >
                        <InfoIcon />
                        <p>About this profile</p>
                      </Stack>
                    </MenuItem>
                    {/* Dialog for profile info */}
                    <Dialog
                      open={aboutDialog}
                      onClose={() => setAboutDialog(false)}
                      sx={{
                        "& .MuiDialog-paper": {
                          borderRadius: "10px",
                          border: "1px solid silver",
                          overflow: "hidden",
                          padding: "1rem",
                          width: { xs: "90%", sm: "50%", md: "30%" },
                        },
                      }}
                    >
                      <AboutProfile
                        setAboutDialog={setAboutDialog}
                        userData={userData}
                      />
                    </Dialog>
                  </Menu>
                </Stack>
              )}
            </Box>
          </Stack>
        </Box>
      </Grid>
      <Hidden mdUp>
        <Grid item xs={12} marginTop="-50px" textAlign="center">
          <Stack direction="column">
            <Box
              sx={{
                width: "90px",
                height: "90px",
                margin: "0 auto",
                borderRadius: "50%",
                backgroundColor: "silver",
                backgroundImage: `url(${profilePic})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <IconButton
                color="primary"
                aria-label="edit"
                component="label"
                sx={{
                  padding: "2px",
                  m: "2px",
                  borderRadius: "50%",
                  backgroundColor: "lightgray",
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                }}
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleProfileImage}
                />
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
            {/* <img
        width="90px"
        height="90px"
        style={{
          margin: "0 auto",
          borderRadius: "50%",
          backgroundColor: "silver",
        }}
        src={profilePic}
        alt="profile_picture"
      /> */}
            <p>
              <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
                {/* {props.firstName}&nbsp;{props.lastName} */}
                {userData?.data?.first_name}&nbsp;{userData?.data?.last_name}
              </span>
              <br />
              {/* <span style={{ opacity: "0.4" }}>@{props.userName}</span> */}
              <span style={{ opacity: "0.4" }}>
                @{userData?.data?.username}
              </span>
            </p>
          </Stack>
        </Grid>
        {/* <Grid item xs={12} textAlign="center">
          <p>
            <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
              {firstName} {lastName}
            </span>
            <br />
            <span style={{ opacity: "0.4" }}>@{userName}</span>
          </p>
        </Grid> */}
      </Hidden>
    </>
  );
};

export default Banner;
