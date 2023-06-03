import { useEffect, useState } from "react";
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
import GradingIcon from "@mui/icons-material/Grading";
import AddPhotoAlternateIcon from "@mui/icons-material/AddToPhotos";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/app-context";

export default function ManageProject() {
  const { user } = useAppContext();
  const [ExpId, setExpId] = useState();
  const [start_dates, setstart_date] = useState();
  const [end_dates, setend_date] = useState();
  const [projectState, setProState] = useState([]);
  const [projectVerify, setProjectVerify] = useState("");
  const [projectUpdate, setProjectUpdate] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);

  const selectFiles = (event) => {
    let images = [];

    for (let i = 0; i < event.target.files.length; i++) {
      images.push(URL.createObjectURL(event.target.files[i]));
    }

    setSelectedFiles(event.target.files[0]);
    setImagePreviews(images);
  };

  // get Exp api
  const [open, setOpen] = useState(false);

  const handleClickOpen = (data) => {
    const { id, start_date, end_date } = data;
    setExpId(id);
    setstart_date(start_date);
    setend_date(end_date);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedFiles("");
    setImagePreviews([]);
  };

  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;
  let userId = authUser.data.id;

  const proFun = async () => {
    const expData = await fetch(
      `https://api.bondbeam.com/api/user_project/?profile_id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    let FinalDataProject = await expData.json();
    setProState(FinalDataProject.data);
  };

  useEffect(() => {
    proFun();
    // eslint-disable-next-line
  }, [projectUpdate]);

  let data = projectState.map((item) => {
    return item;
  });

  let finalData = data.filter((item) => item.is_verified === "Not_Requested");
  //

  const saveVerify = async (id) => {
    if (projectVerify === "") {
      Swal.fire({
        title: "Error",
        text: "Please enter verification reason",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    const fromData = new FormData();

    fromData.append("verify_reason", projectVerify);
    fromData.append("is_verified", "Pending");
    fromData.append("start_date", start_dates);
    fromData.append("end_date", end_dates);
    fromData.append("is_continue", "true");
    fromData.append("document", selectedFiles);

    try {
      let verifyData = await fetch(
        `https://api.bondbeam.com/api/user_project_verify/${ExpId}`,
        {
          method: "PATCH",
          body: fromData,
          headers: {
            Authorization: token,
            // "Content-type": "application/json",
          },
        }
      );
      verifyData = await verifyData.json();

      if (verifyData.status === true) {
        setProjectUpdate(true);
      }
      if (verifyData?.status_code === 200) {
        Swal.fire({
          title: "Success",
          text: "Project verification request sent successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
        setProjectVerify("");
      } else if (verifyData.status_code === 400) {
        Swal.fire({
          title: "Error",
          text: "Project verification request already submitted",
          icon: "error",
          confirmButtonText: "OK",
        });
        setProjectVerify("");
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

  //

  return (
    <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
      <Grid item xs={12} sm={10}>
        <Typography
          sx={{ mt: 4, mb: 2, fontWeight: "700" }}
          variant="h6"
          component="div"
        >
          Project Verification
        </Typography>

        {finalData?.map((item, ind) => {
          const { end_date, start_date, id } = item;
          return (
            <Grid key={ind}>
              <Grid sx={{ backgroundColor: "white", padding: "1rem 2rem" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <GradingIcon color="info" />
                      <p>{item.project_title}</p>
                    </Stack>
                  </Box>
                  <Box>
                    {/* <NavLink style={{ textDecoration: "none" }}   > */}
                    <Button
                      onClick={() =>
                        handleClickOpen({ id, end_date, start_date })
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
        {finalData?.length === 0 && (
          <Stack
            direction={"column"}
            rowGap={2}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <h4>No Project to verify</h4>
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
              Add Projects
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
            {"Project Verification"}
          </DialogTitle>
          <DialogContent>
            <textarea
              onChange={(e) => setProjectVerify(e.target.value)}
              placeholder="Why do you want to verify this project?"
              rows="10"
              style={{
                width: "95%",
                margin: "0 auto",
                resize: "none",
                padding: "10px",
                backgroundColor: "silver",
              }}
            />
            <Grid display={false ? "none" : "block"} item xs={12} p={1}>
              <label
                htmlFor="document"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "-webkit-fill-available",
                  height: "300px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  padding: "0 10px",
                  textTransform: "capitalize",
                  cursor: "pointer",
                }}
              >
                <input
                  type="file"
                  name="certificate"
                  id="document"
                  style={{ display: "none" }}
                  accept=".*"
                  multiple
                  onChange={selectFiles}
                />

                {imagePreviews.length > 0 ? (
                  <Stack
                    direction="row"
                    flexWrap={"wrap"}
                    overflow="auto"
                    maxHeight="18rem"
                  >
                    {imagePreviews.map((img, i) => {
                      return (
                        <Stack width={"5rem"} p={1}>
                          <img
                            width="100%"
                            height="100%"
                            className="preview"
                            src={img}
                            alt={"image-" + i}
                            key={i}
                          />
                        </Stack>
                      );
                    })}
                  </Stack>
                ) : (
                  <p style={{ margin: "0", textAlign: "center" }}>
                    <AddPhotoAlternateIcon />
                    <br />
                    Upload Media
                  </p>
                )}
              </label>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ padding: "0px 30px 30px 30px" }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              variant="contained"
              onClick={() => {
                handleClose();
                saveVerify(userId);
              }}
              disabled={!selectedFiles}
            >
              Send Request
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Box>
  );
}
