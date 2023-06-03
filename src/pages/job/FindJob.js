import { Box, Button, Grid, Hidden, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link, useParams } from "react-router-dom";
import { sidebar } from "../../pages/newsfeed/side_menu_data";
import { getAlljobs } from "../../utils/helpers/job/get_all_jobs";
import { getSearchjobs } from "../../utils/helpers/job/job_crud";
import { useEffect, useState } from "react";
import moment from "moment";

import { useAppContext } from "../../context/app-context";
import SidebarJob from "./sidebarJob";
import MenuBar from "../../components/newsfeed/left/LeftArea";
const FindJob = () => {
  const { user } = useAppContext();
  //

  const [jobs, setJobs] = useState([]);
  const [searchJob, setsearchJob] = useState([]);
  const [suggest, setSuggest] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  console.log("search jobs", searchJob);

  // ===================== get all jobs recomended  =====================
  const allJobsdata = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getAlljobs(lsUser?.token?.access);
    setJobs(response.results);
    setSuggest(response.results);
    // console.log("alll",searchName);
  };

  // ===================== search jobs  =====================

  const getSearchingjobs = async (e) => {
    e.preventDefault();
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getSearchjobs(
      lsUser?.token?.access,
      search,
      location
    );
    setsearchJob(response.results);

    //
  };

  // ===================== add suggested skill in search box  =====================
  const handleValueChange = (name) => {
    setSearch(name);
  };
  // ===================== remove skill from array  =====================

  const removeElement = (index) => {
    const newFruits = suggest.filter((_, i) => i !== index);
    setSuggest(newFruits);
  };

  useEffect(() => {
    allJobsdata();
  }, []);

  // ===================== store all jobs in new array =====================

  return (
    <Grid
      container
      sx={{
        width: { xs: "100%", md: "100%" },
        backgroundColor: "#F3F2EF",
        minHeight: "100vh",
      }}
      mx="auto"
    >
      <Hidden mdDown>
        <Grid item xs={3}>
        <MenuBar />
        </Grid>
      </Hidden>
   
   <Grid item xs={12} md={7}  mx="auto">
        <Stack direction="column" rowGap={1} alignItems="center">
          {/* job search */}
          {/* <Link
          style={{
            textDecoration: "none",
          }}
          to={"/job/post_new_job"}
        >
          <Button variant="outlined">Post New Job</Button>
        </Link> */}
          <form onSubmit={getSearchingjobs}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              columnGap={1}
              rowGap={1}
              p={1}
              mx="auto"
            >
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                style={{ padding: " 5px" }}
                type="text"
                placeholder="Location"
              />
              <input
                name="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{ padding: "5px" }}
                type="text"
                placeholder="Search job by title"
              />
              <Button
                onClick={getSearchingjobs}
                variant="contained"
                color="info"
              >
                Search
              </Button>
            </Stack>
          </form>
          {/* job keyword suggestions */}
          <h3>Suggested Job Searches:</h3>
          <Grid
            container
            rowGap={1}
            columnGap={1}
            justifyContent="center"
            alignItems="center"
          >
            {/* keyword no. 1 */}

            {suggest.slice(1, 6).map((item, index) => {
              if (user?.data?.id === item?.company?.user?.id) {
                return;
              } else {
                return (
                  <Grid
                    key={index}
                    item
                    p={1}
                    sx={{
                      border: "1px solid silver",
                      borderRadius: "10px",
                      "&:hover": {
                        cursor: "pointer",
                        color: "red",
                      },
                    }}
                    onClick={() => {
                      handleValueChange(item.job_title);
                    }}
                  >
                    <Stack direction="row" columnGap={1}>
                      <p>{item.job_title}</p>
                      <CloseIcon
                        onClick={() => removeElement(index)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            color: "red",
                          },
                        }}
                      />
                    </Stack>
                  </Grid>
                );
              }
            })}
          </Grid>
          {/* job search results */}
          <p>Search results : {searchJob.length}</p>
          <Grid container rowGap={1} columnGap={1} justifyContent="center">
            {searchJob?.map((item, i) => {
              let short = item.job_description?.slice(0, 70);
              if (user?.data?.id === item?.company?.user?.id) {
                return;
              } else {
                return (
                  <>
                    <Grid item xs={12} p={1}>
                      <Stack
                        backgroundColor="white"
                        direction="row"
                        columnGap={2}
                        justifyContent="space-between"
                        sx={{
                          padding: "1rem 2rem",
                          border: "1px solid silver",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                          width="60px"
                          height="60px"
                          style={{ borderRadius: "50%" }}
                          src={
                            item.company.profile_pic
                              ? item.company.profile_pic
                              : ""
                          }
                        />
                        <Stack
                          sx={{
                            width: "100%",
                            padding: { xs: "0", sm: "0rem 0rem 0 2rem" },
                          }}
                          direction="column"
                          rowGap={1}
                        >
                          <Link to={`/job/description/${item.id}`}>
                            <h4>{item.job_title}</h4>
                          </Link>
                          {/* <Box ><p style={{ maxWidth: "300px"}}>{short}</p></Box> */}
                          <span>{item.company.company_name}</span>
                          <Stack
                            // direction={{ xs: "column" }}
                            // columnGap={1}
                            // rowGap={1}
                            alignItems="left"
                          >
                            {/*  */}
                            {/* sx={{display:"flex",justifyContent:"space-between",width:"100%" ,textAlign:"center",border:"1px solid red"}} */}
                            <Stack
                              justifyContent="space-between"
                              direction={{ xs: "column", sm: "row" }}
                            >
                              <Stack direction="row">
                                {" "}
                                <PlaceIcon />
                                <p>{item.job_location}</p>
                              </Stack>

                              <Link
                                style={{ textDecoration: "none" }}
                                to={`/job/apply/${item.id}`}
                              >
                                <Button
                                  sx={{ mt: { xs: "10px", sm: "-25px" } }}
                                  variant="outlined"
                                  color="info"
                                >
                                  Apply
                                </Button>
                              </Link>
                            </Stack>
                            {/* <Hidden mdDown>|</Hidden> */}
                            {/* {item.opening_timing || item.closing_timing ? (
                            <Stack direction="row" columnGap={1}>
                              <AccessTimeIcon />
                           
                              <p>{item.opening_timing}</p> -{" "}
                              <p>{item.closing_timing}</p>
                            </Stack>
                          ) : (
                            <Stack sx={{ height: "22px" }}></Stack>
                          )} */}
                            {/* <Stack direction="row" columnGap={1}>
                          <AccessTimeIcon />
                         
                       
                          <p>{item.opening_timing}</p> -{" "}
                          <p>{item.closing_timing}</p>
                        </Stack> */}
                          </Stack>

                          <p>
                            {/* {moment(item.created_at).format("ddd h:mm yy a-Do MMM")} */}
                            {moment(item?.updated_at).fromNow()}
                          </p>
                        </Stack>
                      </Stack>
                    </Grid>
                  </>
                );
              }
              // job description limit
            })}
          </Grid>
          <h3>Recommended Jobs for you</h3>
          <Grid container rowGap={1} columnGap={1} justifyContent="center">
            {jobs?.map((item, i) => {
              let short = item.job_description?.slice(0, 80);
              if (user?.data?.id === item?.company?.user?.id) {
                return;
              } else {
                return (
                  <>
                    <Grid item xs={12} p={1}>
                      <Stack
                        backgroundColor="white"
                        direction="row"
                        columnGap={2}
                        justifyContent="space-between"
                        sx={{
                          padding: "1rem 2rem",
                          border: "1px solid silver",
                          borderRadius: "10px",
                        }}
                      >
                        <img
                          width="60px"
                          height="60px"
                          style={{ borderRadius: "50%" }}
                          src={
                            item.company.profile_pic
                              ? item.company.profile_pic
                              : ""
                          }
                        />
                        <Stack
                          sx={{
                            width: "100%",
                            padding: { xs: "0", sm: "0rem 0rem 0 2rem" },
                          }}
                          direction="column"
                          rowGap={1}
                        >
                          <Link to={`/job/description/${item.id}`}>
                            <h4>{item.job_title}</h4>
                          </Link>
                          {/* <Box ><p style={{ maxWidth: "300px"}}>{short}</p></Box> */}
                          <span>{item.company.company_name}</span>
                          <Stack
                            // direction={{ xs: "column" }}
                            // columnGap={1}
                            // rowGap={1}
                            alignItems="left"
                          >
                            {/*  */}
                            {/* sx={{display:"flex",justifyContent:"space-between",width:"100%" ,textAlign:"center",border:"1px solid red"}} */}
                            <Stack
                              justifyContent="space-between"
                              direction={{ xs: "column", sm: "row" }}
                            >
                              <Stack direction="row">
                                {" "}
                                <PlaceIcon />
                                <p>{item.job_location}</p>
                              </Stack>

                              <Link
                                style={{ textDecoration: "none" }}
                                to={`/job/apply/${item.id}`}
                              >
                                <Button
                                  sx={{ mt: { xs: "10px", sm: "-25px" } }}
                                  variant="outlined"
                                  color="info"
                                >
                                  Apply
                                </Button>
                              </Link>
                            </Stack>
                            {/* <Hidden mdDown>|</Hidden> */}
                            {/* {item.opening_timing || item.closing_timing ? (
                            <Stack direction="row" columnGap={1}>
                              <AccessTimeIcon />
                           
                              <p>{item.opening_timing}</p> -{" "}
                              <p>{item.closing_timing}</p>
                            </Stack>
                          ) : (
                            <Stack sx={{ height: "22px" }}></Stack>
                          )} */}
                            {/* <Stack direction="row" columnGap={1}>
                          <AccessTimeIcon />
                         
                       
                          <p>{item.opening_timing}</p> -{" "}
                          <p>{item.closing_timing}</p>
                        </Stack> */}
                          </Stack>

                          <p>
                            {/* {moment(item.created_at).format("ddd h:mm yy a-Do MMM")} */}
                            {moment(item?.updated_at).fromNow()}
                          </p>
                        </Stack>
                      </Stack>
                    </Grid>
                  </>
                );
                      }
              // job description limit
            })}
          </Grid>
        </Stack>
      </Grid>
 
    </Grid>
  );
};

export default FindJob;
