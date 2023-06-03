import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Connection from "./Connection";
import NetworkCard from "../../layouts/network/NetworkCard";
import { useAppContext } from "../../context/app-context";
import {
  Button,
  Dialog,
  Grid,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function NetworkTab() {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //Suggestion
  const { getMySuggestion, allSuggestion } = useAppContext();
  useEffect(() => {
    getMySuggestion();
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", bgcolor: "#f3f2ef" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
          allowScrollButtonsMobile
        >
          <Tab label="Suggested" {...a11yProps(0)} />
          <Tab label="Connections" {...a11yProps(1)} />
          <Tab label="Pending" {...a11yProps(2)} />
          <Tab label="Requested" {...a11yProps(3)} />
        </Tabs>
      </Box>

      {/* tab1 Suggestion */}

      <TabPanel value={value} index={0}>
        <Grid container>
          <Grid item md={12} xs={12} sm={12}>
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2
                style={{
                  color: "#000000E6",
                  fontSize: "16px",
                }}
              >
                People you may know from Bondbeam
              </h2>
              {allSuggestion?.length > 0 && (
                <Button
                  variant="text"
                  sx={{
                    color: " #00000099",
                    fontSize: "16px",
                  }}
                  onClick={handleClickOpen}
                >
                  See all
                </Button>
              )}
            </Box>
          </Grid>
          {allSuggestion?.length === 0
            ? "Nothing to show here"
            : allSuggestion
                ?.sort(() => Math.random() - 0.5)
                .map((item) => {
                  return (
                    <Grid item lg={3} md={4} sm={6} xs={12} mb={2} p={1}>
                      <NetworkCard
                        cover_pic={item.cover_pic}
                        profile_pic={item.profile_pic}
                        first_name={item.first_name}
                        last_name={item.last_name}
                        about={item.about}
                        work_place={item.work_place}
                        followers_count={item.followers_count}
                        id={item.id}
                      />
                    </Grid>
                  );
                })}
        </Grid>
      </TabPanel>

      {/* tab 2 Connection */}

      <TabPanel value={value} index={1}>
        <Connection filter_by="get_connections" />
      </TabPanel>

      {/* tab 3 Pending */}

      <TabPanel value={value} index={2}>
        <Connection filter_by="request_to" />
      </TabPanel>

      {/* tab 4 Requested */}

      <TabPanel value={value} index={3}>
        <Connection filter_by="request_by" />
      </TabPanel>

      {/* Model Start */}

      <Dialog
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            position: "sticky",
            background: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {"People you may know from Bondbeam"}
          <ClearIcon
            onClick={handleClose}
            sx={{
              background: "rgb(0 0 0 / 60%)",
              borderRadius: "50%",
              fontSize: "30px",
              color: "white",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          />
        </DialogTitle>
        <hr></hr>
        <DialogContent>
          <Grid container>
            {allSuggestion?.length === 0
              ? "Nothing to show here"
              : allSuggestion
                  ?.sort(() => Math.random() - 0.5)
                  .map((item) => {
                    return (
                      <Grid item md={4} sm={6} xs={12} mb={2} p={1}>
                        <NetworkCard
                          cover_pic={item.cover_pic}
                          profile_pic={item.profile_pic}
                          first_name={item.first_name}
                          last_name={item.last_name}
                          about={item.about}
                          work_place={item.work_place}
                          followers_count={item.followers_count}
                          id={item.id}
                        />
                      </Grid>
                    );
                  })}
          </Grid>
        </DialogContent>
      </Dialog>
      {/* Model End */}
    </Box>
  );
}
export default NetworkTab;
