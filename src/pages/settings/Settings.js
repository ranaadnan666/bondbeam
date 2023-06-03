import * as React from "react";
import Box from "@mui/material/Box";
import InboxIcon from "@mui/icons-material/Inbox";
import {
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Stack,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
// import ClickAwayListener from '@mui-ui/core/ClickAwayListener';\
// import { ClickAwayListener } from '@mui/base';

// import { deepPurple } from "@mui/material/colors";
import { NavLink, Outlet } from "react-router-dom";
// import MenuBar from "../../components/newsfeed/MenuBar";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedIcon from "@mui/icons-material/Verified";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import RestoreIcon from "@mui/icons-material/Restore";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuIcon from "@mui/icons-material/Menu";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CodeIcon from "@mui/icons-material/Code";
import GradingIcon from "@mui/icons-material/Grading";
import { useAppContext } from "../../context/app-context";

// const drawerWidth = 240;
const drawerWidth = "25%";

const Settings = (props) => {
  const { user } = useAppContext();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { window1 } = props;
  const userImg = user?.data?.profile_pic;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const settingLinks = [
    {
      text: "General Settings",
      route: "/setting/general",
      icon: <SettingsIcon />,
    },
    {
      text: "Profile Settings",
      route: "/setting/profile",
      icon: <AccountCircleIcon />,
    },
    {
      text: "Skills",
      route: "/setting/manageskill",
      icon: <CodeIcon />,
    },
    {
      text: "Experience",
      route: "/setting/manageexp",
      icon: <WorkOutlineIcon />,
    },
    {
      text: "Projects",
      route: "/setting/manageproject",
      icon: <GradingIcon />,
    },
    {
      text: "Notification Settings",
      route: "/setting/notifications",
      icon: <NotificationsActiveIcon />,
    },

    {
      text: "Profile Verification",
      route: "/setting/profile-verification",
      icon: <VerifiedIcon />,
    },
    {
      text: "Privacy",
      route: "/setting/privacy",
      icon: <VerifiedUserIcon />,
    },
    {
      text: "Change Password",
      route: "/setting/password",
      icon: <LockOpenIcon />,
    },
    {
      text: "Manage Sessions",
      route: "/setting/sessions",
      icon: <RestoreIcon />,
    },
    {
      text: "Two-factor Authentication",
      route: "/setting/twofac-auth",
      icon: <FingerprintIcon />,
    },

    {
      text: "Blocked Users",
      route: "/setting/block",
      icon: <BlockIcon />,
    },
    {
      text: "Delete Account",
      route: "/setting/delete",
      icon: <DeleteIcon color="error" />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar
        direction="row"
        alignitems="center"
        justifycontent="center"
        sx={{ backgroundColor: "#DFDFDF", padding: { xs: 0, sm: 1 } }}
      >
        <Box
          direction="row"
          sx={{
            width: "100%",
            textAlign: "center",
            flexDirection: "row",
            alignItems: "center",
            margin: { xs: "5px", sm: "10px", md: "20px" },
          }}
        >
          <Typography
            sx={{ fontWeight: 700, fontSize: { sm: "24px", lg: "30px" } }}
            variant="h4"
            // noWrap
            align="center"
            component="div"
            mt={2}
            mb={2}
          >
            Settings
          </Typography>
          <Stack direction="row" sx={{ justifyContent: "center" }}>
            <Avatar
              src={userImg}
              alt="Remy Sharp"
              sx={{ width: { sm: 100, lg: 130 }, height: { sm: 100, lg: 130 } }}
            ></Avatar>
          </Stack>
        </Box>
      </Toolbar>

      <List sx={{ paddingTop: "0px", paddingBottom: "0px" }}>
        {settingLinks.map((link, index) => (
          <NavLink
            className="lik"
            style={{
              textDecoration: "none",
              color: link?.text === "Delete Account" ? "red" : "black",
            }}
            to={link.route}
            key={index}
            onClick={handleDrawerToggle}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  borderWidth: "1px 1px",
                  borderStyle: "solid",
                  borderColor: "#DFDFDF",
                }}
              >
                <ListItemIcon sx={{ minWidth: { sm: "25px", lg: "30px" } }}>
                  {link.icon !== "" ? link.icon : <InboxIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={link.text}
                  sx={{
                    "& .css-10hburv-MuiTypography-root": {
                      fontSize: { sm: "0.8rem", lg: "1rem" },
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </div>
  );

  const container =
    window1 !== undefined ? () => window().document.body : undefined;
  return (
    <>
      <Grid container>
        <Box
          sx={{ display: "flex", width: "100%", backgroundColor: "white" }}
          borderRadius={{ xs: "16px", md: "16px" }}
        >
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              // container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              mt={2}
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  position: "inherit",
                  margin: { sm: 1, md: 2 },
                  borderRadius: "16px",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
          <Box
            direction="row"
            sx={{
              width: "100%",
              padding: { xs: "10px", sm: "20px", md: "30px" },
            }}
          >
            <Paper
              elevation={10}
              direction="row"
              component="div"
              sx={{ bgcolor: "#E6E6E6", p: 2, m: 1 }}
            >
              <IconButton
                color="black"
                onClick={handleDrawerToggle}
                aria-label="menu"
                component="label"
                sx={{ float: "right", display: { xs: "block", sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>

              <Outlet />
            </Paper>
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default Settings;
