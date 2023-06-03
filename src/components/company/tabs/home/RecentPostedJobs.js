import { Box, Button, Grid, Hidden, Stack } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useAppContext } from "../../../../context/app-context";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteJobs } from "../../../../utils/helpers/job/job_crud";
import { useState } from "react";
import Modal from "../../../modal/Modal";
const RecentPostedJobs = (props) => {
  const { editmode, setEditmode } = useAppContext();
  const { user } = useAppContext();
  const [showMsg, setShowMsg] = useState({
    isError: false,
    displayMessage: "",
    isModalOpen: false,
  });
  let company_id = props.companyId;

  // delete job

  const deleteJobByid = async (job_id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const obj = { company_id: company_id };
    //
    const response = await deleteJobs(job_id, obj, lsUser?.token?.access);
    //
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
  };
  return (
    <>
      {showMsg.isModalOpen && (
        <Modal msg={showMsg.displayMessage} isError={showMsg.isError} />
      )}

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
          border: "1px solid silver",
        }}
      >
        <h3>Recent Posted Jobs</h3>
        <Grid container rowGap={1}>
          {/* job 1 */}
          {props?.recentJobs?.map((item, index) => (
            <Grid
              key={index}
              item
              xs={12}
              sx={{ border: "1px solid silver", borderRadius: "10px" }}
            >
              <Stack p={1} direction="column" rowGap={1}>
                <h4>{item?.job_title}</h4>
                <p>{item?.job_description}</p>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  alignItems="center"
                  rowGap={1}
                  columnGap={1}
                >
                  <Stack direction="row" alignItems="center" columnGap={1}>
                    {/* icon */}
                    <PlaceIcon />
                    {/* text */}
                    <p>{item?.job_location}</p>
                  </Stack>
                  {/* divider */}
                  <Hidden lgDown>|</Hidden>
                  {/* total employees and Link for List */}
                  <Stack direction="row" columnGap={1} alignItems="center">
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
                          sx={{
                            width: "fit-content",
                          }}
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
                        sx={{
                          width: "fit-content",
                        }}
                      >
                        Delete
                      </Button>
                    </>
                  )}
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/job/apply/${item.id}`}
                  >
                    {user?.data?.id !== item?.company?.user?.id && (
                      <Button variant="contained" color="info">
                        Apply
                      </Button>
                    )}
                  </Link>
                </Stack>
                <p>Updated {moment(item?.updated_at).fromNow()}</p>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default RecentPostedJobs;
