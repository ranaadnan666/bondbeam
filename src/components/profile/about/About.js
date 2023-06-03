import React, { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import { useAppContext } from "../../../context/app-context";

const About = ({ userData, userInfo }) => {
  const [aboutDialogEdit, setAboutDialogEdit] = useState(false);
  const { user, userProfileUpdate } = useAppContext();
  const dummyAboutText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Utmodi corrupti voluptate vel, facilis excepturi dolore iusto corporis voluptatibus consectetur atque, debitis eligendi unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut modi corrupti voluptate vel, facilis excepturi dolore iusto corporis voluptatibus consectetur atque, debitis eligendi unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut modi corrupti voluptate vel, facilis excepturi dolore iusto corporis voluptatibus consectetur atque, debitis eligendi unde Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut modi corrupti voluptate vel, facilis excepturi dolore iusto corporis voluptatibus consectetur atque, debitis eligendi unde laborum eius iure. Dolore, aspernatur amet!";

  const [showMoreAbout, setShowMoreAbout] = useState(false);
  const [showMoreAboutText, setShowMoreAboutText] = useState(250);
  const userAbout = userData?.data?.about;

  const handleSubmit = async (about) => {
    await userProfileUpdate({ about }, user?.data?.id).then((response) => {
      if (response.status === true) {
        userInfo(user?.data?.id);
        Swal.fire({
          title: "Success",
          text: "About Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "something worng",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
    setAboutDialogEdit(false);
  };

  return (
    <>
      <Grid
        item
        xs={12}
        md={userData?.data?.id === user?.data?.id ? 6 : 12}
        p={1}
      >
        <AboutDialogEdit
          aboutDialogEdit={aboutDialogEdit}
          setAboutDialogEdit={setAboutDialogEdit}
          userAbout={userAbout}
          userProfileUpdate={userProfileUpdate}
          handleSubmit={handleSubmit}
        />
        <Stack
          direction="column"
          rowGap={3}
          p={2}
          backgroundColor="white"
          sx={{
            borderRadius: "10px",
            border: "1px solid silver",
            height:
              userData?.data?.id === user?.data?.id ? "200px" : "fit-content",
            // height: "200px",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>About</p>
            {userData?.data?.id === user?.data?.id && (
              <EditIcon
                onClick={() => setAboutDialogEdit(true)}
                sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
              />
            )}
          </Stack>
          {userAbout ? (
            <Box
              sx={{
                height:
                  userData?.data?.id === user?.data?.id
                    ? "200px"
                    : "fit-content",
                overflow: "auto",
              }}
            >
              <p>{userAbout.slice(0, showMoreAboutText)}</p>
            </Box>
          ) : userData?.data?.id === user?.data?.id ? (
            <Stack
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <p style={{ color: "silver", textAlign: "center" }}>
                You Can Write About Yourself, And Your Experience Or Skills.
                People Also Talk About Their Achievements And About The Previous
                Job.
              </p>
              <AddCircleIcon
                color="info"
                onClick={() => setAboutDialogEdit(true)}
                sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
              />
            </Stack>
          ) : (
            <Box>
              <p style={{ color: "silver", textAlign: "center" }}>
                This User Has Not Written Anything About Himself.
              </p>
            </Box>
          )}
          {userAbout?.length > 250 &&
            (showMoreAbout ? (
              <Button
                sx={{
                  width: "fit-content",
                  backgroundColor: "#E8EBED",
                  color: "black",
                  mx: "auto",
                }}
                variant="contained"
                onClick={() => {
                  setShowMoreAbout(false);
                  setShowMoreAboutText(250);
                }}
              >
                See less
              </Button>
            ) : (
              <Button
                sx={{
                  width: "fit-content",
                  mx: "auto",
                  backgroundColor: "#E8EBED",
                  color: "black",
                }}
                variant="contained"
                onClick={() => {
                  setShowMoreAbout(true);
                  setShowMoreAboutText(dummyAboutText.length);
                }}
              >
                See More
              </Button>
            ))}
        </Stack>
      </Grid>
    </>
  );
};

export default About;
const AboutDialogEdit = ({
  userAbout,
  aboutDialogEdit,
  setAboutDialogEdit,
  handleSubmit,
}) => {
  const aboutRef = useRef();
  return (
    <div>
      <Dialog
        open={aboutDialogEdit}
        onClose={() => setAboutDialogEdit(false)}
        sx={{ width: "100%" }}
      >
        <Box sx={{ width: "550px", height: "fit-content" }}>
          <DialogTitle>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <p>About</p>
              <CloseIcon
                sx={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  "&:hover": {
                    color: "blue",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
                onClick={() => setAboutDialogEdit(false)}
              />
            </Stack>
          </DialogTitle>
          <DialogContent>
            <Grid container>
              <Grid item xs={12} p={1}>
                <textarea
                  style={{
                    width: "95%",
                    height: "15vh",
                    padding: "10px",
                    borderRadius: "5px",
                    resize: "none",
                  }}
                  defaultValue={userAbout}
                  multiline="true"
                  rows={4}
                  placeholder="Write here..."
                  type="text"
                  ref={aboutRef}
                />
              </Grid>

              <Grid item xs={12} p={1}>
                <Button
                  sx={{ width: "100%", margin: "0 auto" }}
                  variant="outlined"
                  type="button"
                  onClick={() => handleSubmit(aboutRef.current.value)}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
        </Box>
      </Dialog>
    </div>
  );
};
