import { Avatar, Badge, Box, Grid, Hidden, Stack, Switch } from "@mui/material";
import GuyWithChair from "../../../images/album/album1.jpeg";
import RoundedPic from "../../../images/album/album1.jpeg";
import { sidebar } from "../../../pages/newsfeed/side_menu_data";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import styled from "@emotion/styled";
import { useAppContext } from "../../../context/app-context";

const MenuBar = () => {
  const { user, userProfileUpdate } = useAppContext();

  const online = user?.data?.show_online;
  const isVerified = user?.data?.is_verified;
  const userId = user?.data?.id;
  const userImage = user?.data?.profile_pic;

  const userFirstName = user?.data?.first_name;
  const userLastName = user?.data?.last_name;
  const username = user?.data?.username;
  const userCoverImg = user?.data?.cover_pic;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme?.palette?.background?.paper}`,
    },
  }));
  return (
    <Hidden mdDown>
      <Grid item xs={12} md={3} p={2}></Grid>
      <Grid
        item
        p={2}
        width="25%"
        className="leftArea"
        sx={{
          overflowY: "auto",
          height: "90vh",
          position: "fixed",
        }}
      >
        <Stack
          direction="column"
          textAlign="center"
          borderRadius="10px"
          overflow="hidden"
          sx={{
            backgroundColor: "white",
            border: "1px solid silver",
          }}
        >
          <Box
            sx={{
              height: "100px",
              backgroundImage: `url(${userCoverImg || GuyWithChair})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
              backgroundRepeat: "no-repeat",
              textAlign: "right",
              padding: "10px",
            }}
          >
            {/* <img
              style={{
                padding: "7px",
                borderRadius: "50%",
                cursor: "pointer",
                backgroundColor: "#E8EBED",
              }}
              width="18px"
              height="18px"
              src={EditIcon}
              alt="editicon"
            /> */}
          </Box>
          <Link to={`/profile/${userId}`} style={{ marginTop: "-30px" }}>
            {online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#44b700",
                    color: "#44b700",
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    boxShadow: `0 0 0 2px white`,
                  },
                }}
                variant="dot"
              >
                <Avatar
                  style={{
                    margin: "-2px auto",
                    borderRadius: "3rem",
                    width: "70px",
                    height: "70px",
                  }}
                  src={userImage ? userImage : RoundedPic}
                  alt="roundedpic"
                />
              </StyledBadge>
            ) : (
              <Avatar
                style={{
                  margin: "-2px auto",
                  borderRadius: "3rem",
                  width: "70px",
                  height: "70px",
                }}
                src={userImage ? userImage : RoundedPic}
                alt="roundedpic"
              />
            )}
          </Link>
          {/* <img
            style={{ margin: "-15px auto" }}
            width="60px"
            height="35px"
            src={ ShapeForRounded}
            alt="shapeforrounded"
          /> */}
          <Stack
            marginTop="30px"
            direction="row"
            alignItems="center"
            justifyContent="center"
            columnGap={"2px"}
          >
            <Link
              to={`/profile/${userId}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <h4 style={{ textTransform: "capitalize" }}>
                {userFirstName} {userLastName}
              </h4>
            </Link>
            {isVerified === "Approved" && (
              <VerifiedIcon
                color="info"
                sx={{
                  fontSize: "14px",
                }}
              />
            )}
          </Stack>
          <p>@{username}</p>
          <Box
            sx={{
              height: "2px",
              backgroundColor: "silver",
              margin: "20px 0px",
            }}
          ></Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            padding="0px 20px"
          >
            <p>Online Status</p>
            <Switch
              color="success"
              size="large"
              checked={online}
              onChange={(e) =>
                userProfileUpdate({ show_online: e.target.checked }, userId)
              }
            />
          </Stack>
          <Box
            sx={{
              height: "2px",
              backgroundColor: "silver",
              margin: "20px 0px",
            }}
          ></Box>
          <Stack direction="column"  marginLeft="15px" pb={3}>
            {sidebar.map(({ id, name, icon, url }) => (
              <Link
                key={id}
                to={url}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Stack
                  key={id}
                  direction="row"
                  alignItems="center"
                  columnGap={2}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F3F5F6",
                      cursor: "pointer",
                    },
                    borderRadius: "30px 0px 0px 30px",
                    height: "50px",
                    marginLeft: "15px",
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#E8EBED",
                      marginLeft: "5px",
                    }}
                  >
                    {icon}
                  </Box>
                  <p>{name}</p>
                </Stack>
              </Link>
            ))}
          </Stack>
        </Stack>
      </Grid>
    </Hidden>
  );
};

export default MenuBar;
