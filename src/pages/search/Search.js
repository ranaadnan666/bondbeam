import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid, Stack } from "@mui/material";
import { menuDataTabs } from "./menu_data";
import All from "../../components/search/tabs/tab_all/All";
import { getSearchResultByCategory } from "../../utils/helpers/search/search_apis";
import { useAppContext } from "../../context/app-context";
import PostTab from "../../components/search/tabs/post_tab/PostTab";
import UsersTab from "../../components/search/tabs/users_tab/UsersTab";
import ImagesTab from "../../components/search/tabs/images_tab/ImagesTab";
import VideosTab from "../../components/search/tabs/videos_tab/VideosTab";
import CompaniesTab from "../../components/search/tabs/companies_tab/CompaniesTab";
import GroupsTab from "../../components/search/tabs/groups_tab/GroupsTab";
import PagesTab from "../../components/search/tabs/pages_tab/PagesTab";
import JobsTab from "../../components/search/tabs/jobs_tab/JobsTab";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const { setSearchResult, setAllNewsFeed, searchQuery, setSearchQuery } = useAppContext();
  // console.log("searchQuery", searchQuery);

  const [value, setValue] = React.useState(0);
  const [searchData, setSearchData] = React.useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTab = async (props) => {
    // console.log(props)
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getSearchResultByCategory(lsUser?.token?.access, searchQuery, props);
    // console.log("response", response?.data);
    if(response?.status === 200  ) {
      setSearchData(response?.data?.results);
      if(props === "posts") {
        setAllNewsFeed((prev) => {
          const tempArr = response?.data?.results
          return {
            ...prev,
            idOfParent: response?.data?.results[0]?.id,
            data: tempArr,
          }
        })
      }
      
    }
    

  };



  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        backgroundColor: "#F0F2F5",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Search Results</h2>
      <Box
        sx={{
          flexGrow: 1,
          // bgcolor: "background.paper",
          display: "flex",
          // height: 224,
          width: "100%",
          mx: "auto",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", minWidth: {xs: "20%", lg: "15%", xl: "10%"} }}
        >
          {menuDataTabs.map((item) => {
            return (
              <Tab
                onClick={
                  item?.query === "all" ?
                    null :
                    () => handleChangeTab(item?.query)
                }
                key={item.id}
                label={item.title}
                icon={item.icon}
                {...a11yProps(item.id)}

              />
            );
          })}
        </Tabs>

        {/* all results */}
        <TabPanel value={value} index={0}>
          <All />
        </TabPanel>

        {/* all Posts */}
        <TabPanel value={value} index={1}>
          <PostTab />
        </TabPanel>

        {/* all Peoples */}
        <TabPanel value={value} index={2}>
          <UsersTab data={searchData} />
        </TabPanel>

        {/* all Images */}
        <TabPanel value={value} index={3}>
          <ImagesTab data={searchData}/>
        </TabPanel>

        {/* all Videos */}
        <TabPanel value={value} index={4}>
         <div>

          <VideosTab data={searchData}/>
         </div>
        </TabPanel>

        {/* all Companies */}
        <TabPanel value={value} index={5}>
          <CompaniesTab data={searchData}/>
        </TabPanel>

        {/* all Groups */}
        <TabPanel value={value} index={6}>
          <GroupsTab data={searchData}/>
        </TabPanel>

        {/* all Pages */}
        <TabPanel value={value} index={7}>
          <PagesTab data={searchData}/>
        </TabPanel>

        {/* all Jobs */}
        <TabPanel value={value} index={8}>
          <JobsTab data={searchData}/>
        </TabPanel>
      </Box>
    </Box>
  );
}
