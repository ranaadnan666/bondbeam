import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InfoProfileCard from "../info_profile_card/InfoProfileCard";
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import { useAppContext } from "../../context/app-context";
import { getAllPages } from "../../utils/helpers/page/page_crud";
function TabPanel(props) {
  const { children, value, index, ...other } = props;
console.log(props)
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
          {/* <Typography>{children}</Typography> */}
          {children}
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

export default function List(props) {
  const [page, setPage] = useState([]);

  const getAllListOfPages = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getAllPages(lsUser?.token?.access);

    setPage(response.results);
  };

  useEffect(() => {
    getAllListOfPages();

    // eslint-disable-next-line
  }, []);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
              <Tab
                sx={{
                  fontSize: { xs: "7px", sm: "12px", md: "14px" },
                }}
                label={"Yours"}
                {...a11yProps(0)}
              />
              <Tab
                sx={{ fontSize: { xs: "7px", sm: "12px", md: "14px" } }}
                label={
                  props.title === "Company"
                    ? "Followed"
                    : props.title === "Group"
                    ? "Joined"
                    : props.title === "Page"
                    ? "Followed"
                    : null
                }
                {...a11yProps(1)}
              />
              <Tab
                sx={{
                  fontSize: { xs: "7px", sm: "12px", md: "14px" },
                }}
                label={"Suggested"}
                {...a11yProps(2)}
              />
              <Tab
                sx={{ fontSize: { xs: "7px", sm: "12px", md: "14px" } }}
                label={"Requested"}
                {...a11yProps(3)}
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
          {/* map functions will be applicable later after filter main array */}
          <Stack direction="column" rowGap={2}>
            {page?.map((obj) => {
              return (
                <>
                  <InfoProfileCard title={props.title} item={obj} />
                </>
              );
            })}
            {/* <InfoProfileCard title={props.title} />
            <InfoProfileCard title={props.title} />
            <InfoProfileCard title={props.title} /> */}
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Stack direction="column" rowGap={2}>
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Stack direction="column" rowGap={2}>
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
          </Stack>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Stack direction="column" rowGap={2}>
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
            <InfoProfileCard />
          </Stack>
        </TabPanel>
      </Box>
    </Box>
  );
}
