import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { Button, Divider } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Swal from "sweetalert2";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/app-context";

export default function ManageExperience() {
  const { user } = useAppContext();
  const [verificationText, setVerificationText] = useState("");
  const [expState, setExpState] = useState([]);
  const [experienceState, setExperienceState] = useState(false);
  useEffect(() => {
    window.scrollY = 0;
  }, []);
  const [start_dates, setstart_dates] = useState();
  const [end_dates, setend_dates] = useState();
  const [ExpId, setExpId] = useState();
  // get Exp api
  const [open, setOpen] = useState(false);

  let ExperienceData = expState.map((item) => {
    return item;
  });

  let experienceResult = ExperienceData.filter(
    (item) => item.is_verified === "Not_Requested"
  );

  const handleClickOpen = (data) => {
    const { start_date, end_date, id } = data;
    setstart_dates(start_date);
    setend_dates(end_date);
    setExpId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;
  let userId = authUser.data.id;

  const saveVerify = async (id) => {
    if (verificationText === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter verification reason",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    try {
      let verifyData = await fetch(
        `https://api.bondbeam.com/api/user_experience/${ExpId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            verify_reason: verificationText,
            start_date: start_dates,
            end_date: end_dates,
            is_continue: true,
            is_verified: "Pending",
          }),
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          },
        }
      );
      verifyData = await verifyData.json();
      if (verifyData.status === true) {
        setExperienceState(true);
      }
      if (verifyData?.status_code === 200) {
        Swal.fire({
          title: "Success",
          text: "Experience verification request sent successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setVerificationText("");
      } else if (verifyData?.status_code === 400) {
        Swal.fire({
          title: "Error",
          text: "Experience verification request already submitted",
          icon: "error",
          confirmButtonText: "OK",
        });
        setVerificationText("");
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {}
  };

  const expFun = async () => {
    const expData = await fetch(
      `https://api.bondbeam.com/api/user_experience/?profile_id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    let FinalDataExperience = await expData.json();
    setExpState(FinalDataExperience.data);
  };

  useEffect(() => {
    expFun();
    // eslint-disable-next-line
  }, [experienceState]);

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} sm={10}>
        <Typography
          sx={{ mt: 4, mb: 2, fontWeight: "700" }}
          variant="h6"
          component="div"
        >
          Experience Verification
        </Typography>

        {experienceResult?.map((item, ind) => {
          const { id, start_date, end_date } = item;
          return (
            <Grid key={ind}>
              <Grid sx={{ backgroundColor: "white", padding: "1rem 2rem" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <WorkOutlineIcon color="info" />
                      <p>{item.experience_title}</p>
                    </Stack>
                  </Box>
                  <Box>
                    {/* <NavLink style={{ textDecoration: "none" }}   > */}
                    <Button
                      onClick={() =>
                        handleClickOpen({ id, start_date, end_date })
                      }
                      variant="contained"
                      sx={{
                        backgroundColor: "#000000",
                        color: "white",
                        borderRadius: "8px",
                        width: "120px",
                        textAlign: "center",
                        "&:hover": {
                          color: "#000000",
                          backgroundColor: "white",
                        },
                      }}
                    >
                      Verify
                    </Button>
                    {/* </NavLink> */}
                  </Box>
                </Stack>
              </Grid>
              <Divider />
            </Grid>
          );
        })}
        {experienceResult?.length === 0 && (
          <Stack
            direction={"column"}
            rowGap={2}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <h4>No Experience to verify</h4>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
                fontSize: "20px",
                borderRadius: "10px",
                padding: "10px",
                backgroundColor: "#DFDFDF",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
              }}
              to={`/profile/${user?.data?.id}`}
            >
              Add Experience
            </Link>
          </Stack>
        )}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          sx={{
            "& .MuiDialog-paper": {
              width: "100%",
              bgcolor: "background.paper",
              boxShadow: 24,
              backgroundColor: "#DFDFDF",
              borderRadius: "10px",
              p: 1,
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {"Experience Verification"}
          </DialogTitle>
          <DialogContent>
            <textarea
              placeholder="Why do you want to verify this experience?"
              rows="10"
              value={verificationText}
              onChange={(e) => setVerificationText(e.target.value)}
              style={{
                width: "95%",
                margin: "0 auto",
                resize: "none",
                padding: "10px",
                backgroundColor: "silver",
              }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: "0px 30px 30px 30px" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                saveVerify(userId);
              }}
            >
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
}
