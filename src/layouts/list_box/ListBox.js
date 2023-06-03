import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InfoProfileCard from "../info_profile_card/InfoProfileCard";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

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

export default function ListBox(props) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("props", props);
  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#F3F2EF",
        minHeight: "100vh",
        py: 2,
      }}
    >
       <Box
        sx={{
          width: { xs: "99%", sm: "80%", md: "70%" },
          mx: "auto",
          borderRadius: "10px",
          backgroundColor: "white",
        }}
      >
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            px: 2,
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            {props.title === "Company"
              ? "Companies"
              : props.title === "Group"
              ? "Groups"
              : props.title === "Page"
              ? "Pages"
              : null}
          </h2>
          <Stack
            direction={"row"}
            columnGap={1}
            justifyContent="space-between"
            alignItems={"center"}
            fontSize={{ xs: "9px", sm: "12px", md: "14px" }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{
                backgroundColor: "#F3F2EF",
              }}
            >
              {/*==================== Tab no. 1 =====================*/}
              <Tab
                sx={{
                  fontSize: { xs: "7px", sm: "12px", md: "14px" },
                }}
                label={"Yours"}
                {...a11yProps(0)}
                onClick={
                  props.title === "Company"
                    ? () => props.getListOfCompanies("YourCompanies")
                    : props.title === "Group"
                    ? () => props.getListOfGroups("YourGroups")
                    : props.title === "Page"
                    ? () => props.getListOfPages("YourPages")
                    : null
                }
              />
              {/*==================== Tab no. 2 =====================*/}
              <Tab
                sx={{ fontSize: { xs: "7px", sm: "12px", md: "14px" } }}
                label={
                  props.title === "Company"
                    ? "Followed"
                    : props.title === "Group"
                    ? "Joined"
                    : props.title === "Page"
                    ? "Liked"
                    : null
                }
                {...a11yProps(1)}
                onClick={
                  props.title === "Company"
                    ? () => props.getListOfCompanies("FollowedCompanies")
                    : props.title === "Group"
                    ? () => props.getListOfGroups("JoinedGroups")
                    : props.title === "Page"
                    ? () => props.getListOfPages("JoinedPages")
                    : null
                }
              />
              {/*==================== Tab no. 3 =====================*/}
              <Tab
                sx={{
                  fontSize: { xs: "7px", sm: "12px", md: "14px" },
                }}
                label={"Suggested"}
                {...a11yProps(2)}
                onClick={
                  props.title === "Company"
                    ? () => props.getListOfCompanies("SuggestedCompanies")
                    : props.title === "Group"
                    ? () => props.getListOfGroups("SuggestedGroups")
                    : props.title === "Page"
                    ? () => props.getListOfPages("SuggestedPages")
                    : null
                }
              />
              {/*==================== Tab no. 4 =====================*/}
              <Tab
                sx={{ fontSize: { xs: "7px", sm: "12px", md: "14px" } }}
                label={"Requested"}
                {...a11yProps(3)}
                onClick={
                  props.title === "Company"
                    ? () => props.getListOfCompanies("RequestedCompanies")
                    : props.title === "Group"
                    ? () => props.getListOfGroups("RequestedGroups")
                    : props.title === "Page"
                    ? () => props.getListOfPages("RequestedPages")
                    : null
                }
              />
            </Tabs>
            <Link
              to={
                props.title === "Page"
                  ? "/page/create"
                  : props.title === "Group"
                  ? "/group/create"
                  : props.title === "Company"
                  ? "/company/create"
                  : null
              }
              style={{ textDecoration: "none" }}
            >
              Create {props.title}
            </Link>
          </Stack>
        </Box>
        <TabPanel value={value} index={0}>
          <Stack direction="column" rowGap={2}>
            {props?.data?.length === 0
              ? "Nothing to show here"
              : props?.data?.map((item) => (
                  <>
                    <InfoProfileCard
                      key={item.id}
                      title={props.title}
                      id={item.id}
                      userId={item?.user?.id  || item?.user }
                      member={item?.member}
                      name={
                        props.title === "Company"
                          ? item.company_name
                          : props.title === "Page"
                          ? item.page_name
                          : props.title === "Group"
                          ? item.group_name
                          : null
                      }
                      profilePic={item.profile_pic}
                      headline={item.headline}
                      about={
                        props.title === "Company"
                          ? item.company_about
                          : props.title === "Page"
                          ? item.page_about
                          : props.title === "Group"
                          ? item.group_about
                          : null
                      }
                    />
                  </>
                ))}
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stack direction="column" rowGap={2}>
            {props?.data?.length === 0
              ? "Nothing to show here"
              : props?.data?.map((item) => (
                  <>
                    <InfoProfileCard
                      key={item.id}
                      title={props.title}
                      id={item.id}
                      userId={item?.user?.id  || item?.user }
                      member={item?.member}
                      name={
                        props.title === "Company"
                          ? item.company_name
                          : props.title === "Page"
                          ? item.page_name
                          : props.title === "Group"
                          ? item.group_name
                          : null
                      }
                      profilePic={item.profile_pic}
                      headline={item.headline}
                      about={
                        props.title === "Company"
                          ? item.company_about
                          : props.title === "Page"
                          ? item.page_about
                          : props.title === "Group"
                          ? item.group_about
                          : null
                      }
                    />
                  </>
                ))}
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Stack direction="column" rowGap={2}>
            {props?.data?.length === 0
              ? "Nothing to show here"
              : props?.data?.map((item) => (
                  <>
                    <InfoProfileCard
                      key={item.id}
                      title={props.title}
                      id={item.id}
                      userId={item?.user?.id || item?.user }
                      member={item?.member}
                      name={
                        props.title === "Company"
                          ? item.company_name
                          : props.title === "Page"
                          ? item.page_name
                          : props.title === "Group"
                          ? item.group_name
                          : null
                      }
                      profilePic={item.profile_pic}
                      headline={item.headline}
                      about={
                        props.title === "Company"
                          ? item.company_about
                          : props.title === "Page"
                          ? item.page_about
                          : props.title === "Group"
                          ? item.group_about
                          : null
                      }
                    />
                  </>
                ))}
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Stack direction="column" rowGap={2}>
            {props?.data?.length === 0
              ? "Nothing to show here"
              : props?.data?.map((item) => (
                  <>
                    <InfoProfileCard
                      key={item.id}
                      title={props.title}
                      id={item.id}
                      userId={item?.user?.id || item?.user }
                      member={item?.member}
                      name={
                        props.title === "Company"
                          ? item.company_name
                          : props.title === "Page"
                          ? item.page_name
                          : props.title === "Group"
                          ? item.group_name
                          : null
                      }
                      profilePic={item.profile_pic}
                      headline={item.headline}
                      about={
                        props.title === "Company"
                          ? item.company_about
                          : props.title === "Page"
                          ? item.page_about
                          : props.title === "Group"
                          ? item.group_about
                          : null
                      }
                    />
                  </>
                ))}
          </Stack>
        </TabPanel>
      </Box>
    </Box>
  );
}
