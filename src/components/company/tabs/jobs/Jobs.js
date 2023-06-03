import { Box, Button, Grid, Hidden, Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAppContext } from "../../../../context/app-context";
import moment from "moment";
import { deleteJobs } from "../../../../utils/helpers/job/job_crud";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../modal/Modal";
const Jobs = (props) => {
  const { user, setEditmode } = useAppContext();
  const [userId, setUserId] = useState();
  const company_id = props?.companyId;
  const [showMsg, setShowMsg] = useState({
    isError: false,
    displayMessage: "",
    isModalOpen: false,
  });
  //
  // ===================== Delete job  =====================
  const deleteJobByid = async (job_id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const obj = { company_id };
    const response = await deleteJobs(job_id, obj, lsUser?.token?.access);
    if (response?.status || response?.status_code === 200) {
      setShowMsg((prev) => {
        return {
          ...prev,
          isError: false,
          displayMessage: "Company Successfully Created",
          isModalOpen: true,
        };
      });
    } else {
      setShowMsg((prev) => {
        return {
          ...prev,
          isError: true,
          displayMessage: "something went wrong",
          isModalOpen: true,
        };
      });
    }
    //
    props.getCompanyJobs();
  };
  return (
    <>
       {showMsg.isModalOpen && (
        <Modal msg={showMsg.displayMessage} isError={showMsg.isError} />
      )}
 
    <Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", padding: "1rem 0" }}
      >
        {user?.data?.id === props.userId && (
          <Link
            style={{
              textDecoration: "none",
            }}
            to={`/job/post_new_job/${props?.companyId}`}
          >
            <Button variant="outlined">Post New Job</Button>
          </Link>
        )}
      </Box>
      <Grid container rowGap={1}>
        {/* job 1 */}
        {props?.companyJobs?.filter(
          (singleJob) => singleJob?.company?.id === +company_id
        ).length === 0 ? (
          <Box sx={{ textAlign: "center", width: "100%", color: "red" }}>
            {" "}
            <p>Nothing to show here yet</p>
          </Box>
        ) : (
          <>
            {props?.companyJobs
              ?.filter((singleJob) => singleJob?.company?.id === +company_id)
              ?.map((item, i) => {
                let short = item.job_description?.slice(0, 80);
                return (
                  <Grid item  xs={12} sm={10} md={9} lg={8} p={1} margin="auto">
                
                   <Stack
                   
                      key={i}
                      p={1}
                      width="100%"
                      direction="column"
                      rowGap={1}
                      sx={{ border: "1px solid silver" }}
                    >
                      <Link
                        to="/job/description/12"
                        style={{
                          textDecoration: "none",
                          fontSize: "17px",
                          fontWeight: "bold",
                        }}
                      >
                        {item?.job_title}
                      </Link>
                      <p>{short}</p>
                      <Stack   justifyContent="space-between" direction={{xs:"column", sm:"row"}}  >
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        alignItems="left"
                        rowGap={1}
                        columnGap={1}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          columnGap={1}
                        >
                          <PlaceIcon />
                          <p>{item?.job_location}</p>
                        </Stack>
                        <Hidden lgDown>|</Hidden>
                        {/* total employees and Link for List */}
                        
                        
                        
                          
                        <Stack
                          direction="row"
                          columnGap={1}
                          alignItems="center"
                        >
                          {/* icon */}
                          <AccessTimeIcon />
                          {/* text */}
                          <p>
                            {item?.opening_timing} - {item?.closing_timing}
                          </p>
                        </Stack>
                      </Stack>
                      <Stack
                        direction={{ xs: "column", md: "row" }}
                        columnGap={1}
                        rowGap={1}
                        marginTop="10px"
                      >
                        {user?.data?.id === item?.company?.user?.id && (
                          <>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/job/post_new_job/${item.id}`}
                            >
                              <Button
                                onClick={() => {
                                  setEditmode(true);
                                }}
                                variant="contained"
                                color="info"
                                sx={{ width:"100%"}}
                              >
                                Edit
                              </Button>
                            </Link>
                            <Button
                              onClick={() => {
                                deleteJobByid(item?.id);
                              }}
                              variant="contained"
                              color="error"
                            >
                              Delete
                            </Button>
                          </>
                        )}

                        {user?.data?.id !== item?.company?.user?.id && (
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/job/apply/${item.id}`}
                          >
                            <Button variant="contained" color="info">
                              Apply
                            </Button>
                          </Link>
                        )}
                      </Stack>
                      </Stack>
                      <p>Updated {moment(item?.updated_at).fromNow()}</p>
             
                   </Stack>
                  </Grid>
                );
              })}
          </>
        )}
      </Grid>
    </Box>
    </>
  );
};

export default Jobs;
