import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import Grid from "@mui/material/Grid";
import Dialog from "@mui/material/Dialog";
import { Button, Divider } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import Typography from "@mui/material/Typography";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddPhotoAlternateIcon from "@mui/icons-material/AddToPhotos";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import { useAppContext } from "../../../context/app-context";
import { Link } from "react-router-dom";

export default function ManageSkill() {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView();
  const { user } = useAppContext();
  const [verifySkill, setverifyskill] = useState("");
  const [skillId, setSkillId] = useState(null);
  const [skillVerifyState, setSkillVerifyState] = useState(false);
  const formData = new FormData();
  const textRef = useRef();
  const verificationText = textRef?.current?.value;
  const [skillState, setSkillState] = useState([]);
  const [UploadFile, setUploadFile] = useState([]);
  const [displayImg, setDisplayImg] = useState([]);

  let skillStateMap = skillState?.map((item) => {
    return item;
  });

  let skillStates = skillStateMap?.filter(
    (skill) => skill.is_verified === "Not_Requested"
  );
  //

  // get skill api
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    setSkillId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUploadFile([]);
  };
  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;
  let userId = authUser.data.id;

  useEffect(() => {
    skillFun();
    setSkillState(verificationText);
    // eslint-disable-next-line
  }, [skillVerifyState]);

  const saveVerify = async (id) => {
    if (verifySkill === "" && UploadFile.length === 0) {
      Swal.fire({
        title: "Error",
        text: "Please enter verification reason",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    //
    try {
      for (let i = 0; i < UploadFile?.length; i++) {
        formData.append("document", UploadFile[i], UploadFile[i].name);
      }
      for (const value of formData.values()) {
      }
      // let verifyData = await fetch(
      //   `https://api.bondbeam.com/api/user_skill/${skillId}`,
      //   {
      //     method: "PUT",
      //     body: JSON.stringify({
      //       verify_reason: verifySkill,
      //       is_verified: "Pending",
      //       document: formData,
      //     }),
      //     headers: {
      //       Authorization: token,
      //       "Content-type": "application/json",
      //     },
      //   }
      // );
      // verifyData = await verifyData.json();
      //
      // if (verifyData.status === true) {
      //   setSkillVerifyState(true);
      // }
      // if (verifyData?.status_code === 200) {
      //   Swal.fire({
      //     title: "Success",
      //     text: "Skill verification request sent successfully",
      //     icon: "success",
      //     confirmButtonText: "OK",
      //   });
      //   setverifyskill("");
      // } else if (verifyData?.status_code === 400) {
      //   Swal.fire({
      //     title: "Error",
      //     text: "Skill verification request already submitted",
      //     icon: "error",
      //     confirmButtonText: "OK",
      //   });
      //   setverifyskill("");
      // } else {
      //   Swal.fire({
      //     title: "Error",
      //     text: "Something went wrong",
      //     icon: "error",
      //     confirmButtonText: "OK",
      //   });
      // }
    } catch (error) {}
  };

  const skillFun = async () => {
    const SkillData = await fetch(
      `https://api.bondbeam.com/api/user_skill/?profile_id=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    let finalDataSkill = await SkillData.json();
    setSkillState(finalDataSkill.data);

    try {
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
          Skills Verification
        </Typography>

        {/* {skillState
          ?.filter((skill) => skill?.data?.is_verified === "Pending")
          ?.map((item, ind) => {
            
            return (
              <Grid key={ind}>
                <Grid sx={{ backgroundColor: "white", padding: "1rem 2rem" }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <CodeIcon color="info" />
                        <p>{item.skill_title}</p>
                      </Stack>
                    </Box>
                    <Box>
                      <Button
                        onClick={() => handleClickOpen(item.id)}
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
                    </Box>
                  </Stack>
                </Grid>
                <Divider />
              </Grid>
            );
          })} */}

        {skillStates?.map((item, ind) => {
          return (
            <Grid key={ind}>
              <Grid sx={{ backgroundColor: "white", padding: "1rem 2rem" }}>
                <Stack direction="row" justifyContent="space-between">
                  <Box>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <CodeIcon color="info" />
                      <p>{item.skill_title}</p>
                    </Stack>
                  </Box>
                  <Box>
                    <Button
                      onClick={() => handleClickOpen(item.id)}
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
                  </Box>
                </Stack>
              </Grid>
              <Divider />
            </Grid>
          );
        })}

        {/* (skill) => skill?.data?.is_verified === "Pending" */}
        {skillStates?.length === 0 && (
          <Stack
            direction={"column"}
            rowGap={2}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
          >
            <h4>No Skill to verify</h4>
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
              Add Skills
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
              borderRadius: "15px",
              p: 1,
            },
          }}
        >
          <DialogTitle id="alert-dialog-title">
            {"Skill Verification"}
          </DialogTitle>
          <DialogContent>
            <textarea
              placeholder="Why do you want to verify this skill?"
              rows="10"
              ref={textRef}
              required
              style={{
                width: "95%",
                margin: "0 auto",
                resize: "none",
                padding: "10px",
                backgroundColor: "silver",
                borderRadius: "15px",
              }}
              onChange={(e) => setverifyskill(e.target.value)}
            />
            <Grid
              display={displayImg.length > 0 ? "none" : "block"}
              item
              xs={12}
              p={1}
            >
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
                  onChange={(event) => {
                    setUploadFile(event.target.files);
                    setDisplayImg((prev) => [
                      ...prev,
                      URL?.createObjectURL(event?.target.files[0]),
                    ]);
                  }}
                  style={{ display: "none" }}
                  accept=".*"
                  multiple
                />
                <p style={{ margin: "0", textAlign: "center" }}>
                  <AddPhotoAlternateIcon />
                  <br />
                  Upload Media
                </p>
              </label>
            </Grid>
            {displayImg?.length > 0 && (
              <SimpleReactLightBox>
                <SRLWrapper>
                  {displayImg?.map((item, index) => {
                    return (
                      <Grid key={index} item xs={12} p={1}>
                        <Box
                          sx={{
                            width: "100%",
                            height: "300px",
                          }}
                        >
                          <img
                            style={{
                              width: "100%",
                              height: "100%",
                            }}
                            src={URL.createObjectURL(item)}
                            alt="imgpre"
                          />
                        </Box>
                      </Grid>
                    );
                  })}
                </SRLWrapper>
              </SimpleReactLightBox>
            )}
          </DialogContent>
          <DialogActions sx={{ padding: "0px 30px" }}>
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
