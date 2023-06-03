import { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Banner from "../../components/company/banner/Banner";
import Home from "../../components/company/tabs/home";
import { tabMenuData } from "../../components/company/tabs/tab_menu_data";
import About from "../../components/company/tabs/about/About";
import Posts from "../../components/company/tabs/posts/Posts";
import Jobs from "../../components/company/tabs/jobs/Jobs";
import Employees from "../../components/company/tabs/employees/Employees";
import Settings from "../../components/company/tabs/settings/Settings";
import {
  getCompanyDetailsById,
  getCompanyJobsById,
} from "../../utils/helpers/company/company_crud";
import { useParams } from "react-router-dom";
import { useAppContext } from "../../context/app-context";
import Loading from "../../components/loading/Loading";
// =================== Material UI Tabs ===================
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
        <Box sx={{ p: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
// =================== Material UI Tabs.propsTypes ===================
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

const CompanyDetails = () => {
  const {
    getCompanyNewsfeed,
    loading,
    setGeneralIdofParent,
    setCompanyFormData,
  } = useAppContext();
  const { companyId } = useParams();
  const [value, setValue] = useState(0);
  const [companyData, setCompanyData] = useState({});
  console.log("companyData", companyData);
  const [companyJobs, setCompanyJobs] = useState([]);
  const companyCreatorId = companyData?.company?.user?.id; // company creator id
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // ====================== get single company details ======================
  const getSingleCompanyDetails = async (givenId) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getCompanyDetailsById(
      lsUser?.token?.access,
      givenId
    );
    if (response?.status) {
      setCompanyData(response?.data);
    }
  };
  // ====================== get company jobs list ======================
  const getCompanyJobs = async (givenId) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getCompanyJobsById(lsUser?.token?.access, givenId);
    //
    setCompanyJobs(response?.results);
  };

  useEffect(() => {
    getSingleCompanyDetails(companyId);
    getCompanyNewsfeed(companyId);
    getCompanyJobs(companyId);
    setGeneralIdofParent(companyId);
  }, [companyId]);
  // ====================== loading ======================
  if (loading) {
    return <Loading />;
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F1F3F4",
        minHeight: "100vh",
        minWidth: "100wh",
      }}
    >
      <Grid container p={1}>
        <Grid item xs={12} height="100%">
          {/* Banner */}
          <Banner
            companyId={companyId}
            user_id={companyCreatorId}
            companyData={companyData}
            member={companyData?.company?.member}
            setCompanyData={setCompanyData}
          />
        </Grid>
        {/* Tabs */}
        <Grid item xs={12}>
          <Box
            padding={{ xs: "0px 10", md: "0px 80px" }}
            sx={{
              backgroundColor: "#E8EBED",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              {tabMenuData.map(({ id, icon, label }, index) => (
                <Tab
                  key={id}
                  icon={icon}
                  iconPosition="start"
                  label={label}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Home
              companyData={companyData}
              companyId={companyId}
              companyCreatorId={companyCreatorId}
              setCompanyData={setCompanyData}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <About />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Posts companyId={companyId} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Jobs
              userId={companyCreatorId}
              getCompanyJobs={getCompanyJobs}
              companyId={companyId}
              companyJobs={companyJobs}
            />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <Employees />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <Settings />
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyDetails;
