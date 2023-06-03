import {
  Box,
  Drawer,
  Stack,
  Menu,
  Hidden,
  Avatar,
  AppBar,
  Divider,
  Switch,
  Badge,
  Typography,
  MenuItem,
  ListItemText,
  ListItem,
} from "@mui/material";
import { useState } from "react";
import Logo from "../../images/logo.svg";
import SearchIcon from "@mui/icons-material/Search";
import { menu } from "./data";
import { Link, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DrawerLogo from "../../images/drawerlogo.svg";
import MenuIcon from "@mui/icons-material/Menu";
import { sidebar } from "../../pages/newsfeed/side_menu_data";
import VerifiedIcon from "@mui/icons-material/Verified";
import Ueserlist from "./Ueserlist";
import HelpIcon from "@mui/icons-material/Help";
import FeedbackIcon from "@mui/icons-material/Feedback";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/material/styles";
import { useAppContext } from "../../context/app-context";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getSearchResult } from "../../utils/helpers/search/search_apis";
import moment from "moment";

const Header = () => {
  const { setSearchResult, setAllNewsFeed, searchQuery, setSearchQuery } =
    useAppContext();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchNew, setsearchNew] = useState([]);
  const [openRightSide, setOpenRightSide] = useState(false);
  const open = Boolean(anchorEl);
  const [inpvalue, setvalue] = useState("");
  const [openNotification, setOpenNotification] = useState(false);
  const [anchorElnotfication, setAnchorElnotfication] = useState(null);
  // const opennotfication = Boolean(anchorElnotfication);
  const handleClickNotification = (event) => {
    setOpenNotification(true)
    // setAnchorElnotfication(event.currentTarget);
  };
  // const handleClosenotification = () => {
  //   setAnchorElnotfication(null);
  // };
  // const notficationData =
  //   localStorage.getItem("notifications") !== null || undefined
  //     ? JSON.parse(localStorage.getItem("notifications"))
  //     : "No Data";

  const navigate = useNavigate();
  const { setBlur, setUser, setToken, user, userProfileUpdate, notifications } =
    useAppContext();
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
  }));

  // console.log("Notification Data in Header", notifications);
  const profilePic = user?.data?.profile_pic;
  const firstName = user?.data?.first_name;
  const lastName = user?.data?.last_name;
  const userId = user?.data?.id;
  const online = user?.data?.show_online;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUserList = async (value) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const token = lsUser?.token?.access;
    setvalue(value);
    fetch(`https://api.bondbeam.com/newsfeed/search/?search=${value}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      resp.json().then((result) => {
        if (value === "") {
          setsearchNew([]);
        } else {
          setsearchNew(result.results);
        }
      });
    });
  };

  // global search
  const handleGlobalSearch = async (givenValue) => {
    setSearchQuery(givenValue);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const token = lsUser?.token?.access;
    const response = await getSearchResult(token, givenValue);
    console.log("search response", response?.data);
    setSearchResult(response?.data);

    //set all news feed after search
    setAllNewsFeed((prev) => {
      const tempArr = response?.data?.posts;
      return {
        ...prev,
        idOfParent: response?.data?.posts[0]?.id,
        data: tempArr,
      };
    });
  };

  // logout
  const logout = () => {
    localStorage.removeItem("userLoggedIn");
    localStorage.removeItem("notifications");
    localStorage.removeItem("fireBaseUserToken");
    setUser({});
    setToken(null);
    navigate("/");
  };

  return (
    <Box height="70px">
      <AppBar component="nav" pt={2} sx={{ backgroundColor: "white" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          columnGap={1}
          height="70px"
          padding={{ xs: "0 5px", sm: "0 10px", md: "0 30px" }}
        >
          <Link to="/">
            <img width="30px" height="30px" src={Logo} alt="logo" />
          </Link>
          <Stack
            direction="row"
            alignItems="center"
            // onClick={() => setOpen(true)}
            sx={{
              height: "36px",
              padding: "0 5px",
              borderRadius: "5px",
              boxShadow: "0px 1px 2px rgba(55, 65, 81, 0.08)",
              transition: "width 0.5s",
              position: "relative",
              width: "500px",
              "&:hover": {
                backgroundColor: "#F1F3F4",
                border: "2px solid black",
                // expand width on hover with transition
              },
              border: "1px solid silver",
            }}
            className="search-global-typeahead__input"
          >
            <Ueserlist
              list={searchNew}
              setlistdata={setsearchNew}
              setinp={setvalue}
              inp={inpvalue}
              setBlur={setBlur}
            />
            <Link to={inpvalue !== "" ? "/search" : null}>
              <SearchIcon
                fontSize="small"
                sx={{
                  cursor: "pointer",
                  color: "black",
                  "&:hover": {
                    color: "#0073b1",
                  },
                }}
                onClick={() => {
                  handleGlobalSearch(inpvalue);
                  // getUserList();
                  setBlur(false);
                }}
              />
            </Link>
            <input
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "90%",
                height: "100%",
                padding: "0 5px",
                fontSize: "12px",
                color: "#555B6E",
              }}
              value={inpvalue}
              onChange={(e) => getUserList(e.target.value)}
              type="text"
              placeholder="Search"
              onClick={() => setBlur(true)}
            />
          </Stack>
          <Hidden mdDown>
            <Stack
              direction="row"
              justifyContent="center"
              columnGap={3}
              alignItems="center"
            >
              {menu.map(({ id, title, url, icon }) => (
                <Link className="link" key={id} to={url}>
                  <Stack direction="column" alignItems="center">
                    {icon}
                    <p style={{ fontSize: "13px" }}>{title}</p>
                  </Stack>
                </Link>
              ))}
              <Link className="link" to="/notifications">
                <Stack
                  direction="column"
                  alignItems="center"
                  sx={{ cursor: "pointer" }}
                  onClick={handleClickNotification}
                >
                  <Badge
                    variant={notifications?.count === 0 ? "dot" : "default"}
                    color="error"

                    badgeContent={!openNotification ? notifications?.count : null}
                    max={notifications?.count}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <NotificationsIcon
                      id="notification-btn"
                      // aria-controls={
                      //   opennotfication ? "notification-menu" : undefined
                      // }
                      // aria-haspopup="true"
                      // aria-expanded={opennotfication ? "true" : undefined}
                      fontSize="medium"
                    />
                  </Badge>

                  <p style={{ fontSize: "13px" }}>Notifications</p>
                </Stack>
              </Link>
            </Stack>

            {/* <Menu
              id="notification-menu"
              anchorEl={anchorElnotfication}
              open={opennotfication}
              onClose={handleClosenotification}
              MenuListProps={{
                "aria-labelledby": "notification-btn",
              }}
              PaperProps={{
                style: {
                  maxHeight: 50 * 5,
                  width: "fit-content",
                  backgroundColor: "#F3F2EF",
                },
              }}
             
            >
              {notifications?.length === 0 ? (
                <Stack>
                  <Typography>No Notification found</Typography>
                </Stack>
              ) : (
                <Stack>
                  {notifications?.slice(0, 10).map((notification) => {
                    return (
                      <MenuItem
                        className="notification-list-item"
                        key={notification?.id}
                        onClick={() => {}}
                      >
                        <p className="notification-list-item-single">
                          {notification?.message}
                        </p>
                        

                        <p className="notification-list-item-single-time">
                
                          {moment(notification?.created_at)
                            .startOf("minute")
                            .fromNow()}
                        </p>
                      </MenuItem>
                    );
                  })}
                  <Link  style={{textDecoration: "none", textAlign: "center"}} to="/notifications">see all notifications</Link>
                </Stack>
              )}
            </Menu> */}
          </Hidden>
          <Stack direction="row" alignItems="center" columnGap={2}>
            <Hidden mdDown>
              <Box
                sx={{ height: "50px", width: "3px", backgroundColor: "silver" }}
              ></Box>
            </Hidden>

            <Stack
              direction={{ xs: "row", md: "column" }}
              alignItems="center"
              columnGap={1}
            >
              <Hidden mdUp>
                <MenuIcon
                  onClick={() => setOpenRightSide(true)}
                  fontSize="small"
                  sx={{ color: "black", cursor: "pointer" }}
                />
              </Hidden>
              <Stack
                direction="row"
                alignItems="center"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{ cursor: "pointer" }}
              >
                {/* ================== checking online status ================ */}

                {user?.data?.show_online ? (
                  <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    variant="dot"
                  >
                    <Avatar alt="Remy Sharp" src={profilePic} />
                  </StyledBadge>
                ) : (
                  <Avatar alt="Remy Sharp" src={profilePic} />
                )}
              </Stack>
              <Menu
                sx={{
                  mt: "1.5rem",
                  ".MuiMenu-paper": {
                    width: { xs: "70%", sm: "50%", md: "25%" },
                  },
                }}
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Stack
                  direction="column"
                  mb={1}
                  p={1}
                  width="90%"
                  mx="auto"
                  boxShadow="0px 1px 10px silver"
                  borderRadius="5px"
                >
                  <Link
                    to={`/profile/${user?.data?.id}`}
                    style={{ textDecoration: "none", color: "black" }}
                    onClick={handleClose}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      columnGap={2}
                      sx={{
                        padding: { xs: "0.5rem 0.5rem", md: "0.5rem 1rem" },
                        width: { xs: "90%" },
                        borderRadius: "5px",
                        mx: "auto",
                        "&:hover": {
                          backgroundColor: "#F1F3F4",
                        },
                      }}
                    >
                      {user?.data?.show_online ? (
                        <StyledBadge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar alt="Remy Sharp" src={profilePic} />
                        </StyledBadge>
                      ) : (
                        <Avatar alt="Remy Sharp" src={profilePic} />
                      )}
                      <p
                        style={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        {firstName}&nbsp;{lastName}
                      </p>
                    </Stack>
                    <Divider sx={{ margin: "10px 0px" }} />
                  </Link>
                </Stack>
                <Link
                  to="/setting/profile"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleClose}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={2}
                    sx={{
                      padding: "0.5rem 1rem",
                      width: "90%",
                      borderRadius: "5px",
                      mx: "auto",
                      "&:hover": {
                        backgroundColor: "#F1F3F4",
                      },
                    }}
                  >
                    <SettingsIcon />
                    <p>Profile Settings</p>
                  </Stack>
                </Link>
                <Link
                  to={"/setting/profile-verification"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={2}
                    sx={{
                      padding: "0.5rem 1rem",
                      width: "90%",
                      borderRadius: "5px",
                      mx: "auto",
                      "&:hover": {
                        backgroundColor: "#F1F3F4",
                      },
                    }}
                  >
                    <VerifiedIcon />
                    <p>Profile Verification</p>
                  </Stack>
                </Link>
                <Link
                  to="/commingsoon"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleClose}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={2}
                    sx={{
                      padding: "0.5rem 1rem",
                      width: "90%",
                      borderRadius: "5px",
                      mx: "auto",
                      "&:hover": {
                        backgroundColor: "#F1F3F4",
                      },
                    }}
                  >
                    <HelpIcon />
                    <p>Help & Support</p>
                  </Stack>
                </Link>
                <Link
                  to="/feedback"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleClose}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={2}
                    sx={{
                      padding: "0.5rem 1rem",
                      width: "90%",
                      borderRadius: "5px",
                      mx: "auto",
                      "&:hover": {
                        backgroundColor: "#F1F3F4",
                      },
                    }}
                  >
                    <FeedbackIcon />
                    <p>Give Feedback</p>
                  </Stack>
                </Link>
                <Link
                  to="/new"
                  style={{ textDecoration: "none", color: "black" }}
                  onClick={handleClose}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={2}
                    sx={{
                      padding: "0.5rem 1rem",
                      width: "90%",
                      borderRadius: "5px",
                      mx: "auto",
                      "&:hover": {
                        backgroundColor: "#F1F3F4",
                      },
                    }}
                  >
                    <FeedbackIcon />
                    <p>Advertisement</p>
                  </Stack>
                </Link>

                <Stack
                  direction="row"
                  alignItems="center"
                  columnGap={2}
                  onClick={logout}
                  sx={{
                    padding: "0.5rem 1rem",
                    cursor: "pointer",
                    width: "90%",
                    borderRadius: "5px",
                    mx: "auto",
                    "&:hover": {
                      backgroundColor: "#F1F3F4",
                    },
                  }}
                >
                  <LogoutIcon />
                  <p>Logout</p>
                </Stack>
              </Menu>
            </Stack>
            <Hidden mdUp>
              <Box
                sx={{ height: "50px", width: "2px", backgroundColor: "silver" }}
              ></Box>
            </Hidden>
            <Hidden mdUp>
              <MoreVertIcon
                onClick={() => setDrawerOpen(true)}
                fontSize="small"
                sx={{ cursor: "pointer", color: "black" }}
              />
            </Hidden>
          </Stack>
        </Stack>
        {/* ============================= top to bottom MENU ============================= */}
        <Drawer
          anchor={"top"}
          open={openRightSide}
          onClose={() => setOpenRightSide(false)}
        >
          <Stack direction="column" rowGap={1} alignItems="center" pb={3}>
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
            {sidebar.map(({ id, name, icon, url }) => (
              <Link
                key={id}
                to={url}
                onClick={() => setOpenRightSide(false)}
                style={{
                  textDecoration: "none",
                  color: "black",
                  width: "100%",
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
                    padding: "0.5rem",
                    borderRadius: "10px",
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
        </Drawer>
        {/* ============================= left to right MENU ============================= */}
        <Drawer
          anchor={"left"}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Stack
            sx={{ width: "200px", padding: "10px 0px" }}
            direction="column"
            rowGap={1}
            alignItems="center"
            onClick={() => setDrawerOpen(false)}
          >
            <Box sx={{ width: "150px", margin: "0 auto" }}>
              <img width="100%" src={DrawerLogo} alt="drawerlogo" />
            </Box>
            {menu.map(({ id, title, url, icon }) => (
              <Link className="link-drawer" key={id} to={url}>
                <Stack direction="column" alignItems="center">
                  {icon}
                  <p>{title}</p>
                </Stack>
              </Link>
            ))}
            <Link className="link-drawer" to="/notifications">
              <Stack
                direction="column"
                alignItems="center"
                sx={{ cursor: "pointer" }}
              >
                <NotificationsIcon fontSize="medium" />
                <p>Notifications</p>
              </Stack>
            </Link>
          </Stack>
        </Drawer>
      </AppBar>
    </Box>
  );
};

export default Header;
