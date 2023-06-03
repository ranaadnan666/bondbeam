// import * as React from "react";
import { useState } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { NavLink } from "react-router-dom";

// .............................................................
import SettingsSharpIcon from "@mui/icons-material/SettingsSharp";




import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
const drawerWidth = 280;

function LeftSidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [open, setOpen] = useState(true);
  const [openplan, setOpenplan] = useState(true);
  const [openAnalyz, setOpenAnalyz] = useState(true);


  const handleClick = () => {
    setOpen(!open);
  };

  const [advertise, setAdvertise] = useState(true);
  const handleAdvertise = () => {
    setAdvertise(!advertise);
  };

  const handleClickplan = () => {
    setOpenplan(!openplan);
  };
  const handleClickanalyz = () => {
    setOpenAnalyz(!openAnalyz);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (

    <List
    sx={{
      width: "100%",
      bgcolor: "background.paper",
      border: "1px solid lightgrey",
    }}
    component="nav"
    aria-labelledby="nested-list-subheader"
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        Megzel Advertisement
      </ListSubheader>
    }
  >
       <NavLink
      to="/advertisements/advertise"
      style={{
        textDecoration: "none",
        color: "black",
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Advertise" />
        {/* onClick={() => setSelectedAdvertiseContent("analyze")} */}
      </ListItemButton>
    </NavLink>
    <ListItemButton onClick={handleClickplan}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Plan" />
      {openplan ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openplan} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <NavLink
          to="/advertisements/audience"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Audiences" />
          </ListItemButton>
        </NavLink>
      </List>
    </Collapse>

    <ListItemButton onClick={handleClickanalyz}>
      <ListItemIcon>
        <InboxIcon />
      </ListItemIcon>
      <ListItemText primary="Analyze" />

      {openAnalyz ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={openAnalyz} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <NavLink
          to="/advertisements/analytics"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItemButton>
        </NavLink>
        <NavLink
          to="/advertisements/Websitedemographic"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Website Demographic" />
          </ListItemButton>
        </NavLink>

        <NavLink
          to="/advertisements/insightTag"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Insight Tag" />
          </ListItemButton>
        </NavLink>
        <NavLink
          to="/advertisements/conversion"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Conversion track" />
          </ListItemButton>
        </NavLink>
      </List>
    </Collapse>
    <hr />
    <ListItemButton onClick={handleAdvertise}>
      <ListItemIcon>
        {/* <InboxIcon /> */}
        <SettingsSharpIcon sx={{ color: "blueviolet" }} />
      </ListItemIcon>
      <ListItemText primary="Account settings" sx={{ color: "blueviolet" }} />
      {advertise ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={advertise} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <NavLink
          to="/advertisements/manage"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Manage access" />
          </ListItemButton>
        </NavLink>
      </List>
    </Collapse>
    <Collapse in={advertise} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <NavLink
          to="/advertisements/billing"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Billing center" />
          </ListItemButton>
        </NavLink>
      </List>
    </Collapse>
    <Collapse in={advertise} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <NavLink
          to="/advertisements/editaccount"
          style={{
            textDecoration: "none",
            color: "black",
          }}
          className={({ isActive }) => (isActive ? "active" : "inactive")}
        >
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Edit account" />
          </ListItemButton>
        </NavLink>
      </List>
    </Collapse>
    <NavLink
      style={{
        textDecoration: "none",
        color: "black",
      }}
      to="/analyze"
    ></NavLink>
  </List>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
   
      
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
       
       
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }  }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
      
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
        
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,marginTop:"70px" },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
  
    </Box>
  );
}

LeftSidebar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default LeftSidebar;