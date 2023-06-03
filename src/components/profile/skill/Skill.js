import { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PendingIcon from "@mui/icons-material/Pending";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useAppContext } from "../../../context/app-context";
import {
  createSkill,
  updateSkill,
  deleteSkill,
} from "../../../utils/helpers/profile/skill_crud";
import ReportIcon from "@mui/icons-material/Report";
import Swal from "sweetalert2";
import DoneIcon from "@mui/icons-material/Done";
import { Link } from "react-router-dom";

const Skill = ({ userData, userId, userSkill: skillData, getUserSkill }) => {
  const [skillDialog, setSkillDialog] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { user } = useAppContext();

  const handleDelete = async (id) => {
    await deleteSkill(id).then((response) => {
      getUserSkill(userId);
      if (response.success) {
        Swal.fire({
          title: "Success",
          text: "Skill Deleted Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
  };

  const handleUpdate = (skill_title, start_date, end_date, discription, id) => {
    setEditMode(true);
    setSkillDialog(true);
    setEditObj({
      skill_title,
      start_date,
      end_date,
      discription,
      id,
    });
  };

  if (userData?.status_code === 406) {
    return (
      <>
        <Grid item xs={12} maxHeight="251px" p={2}>
          <Box className="bg-text">
            <Stack
              direction="row"
              columnGap={1}
              alignItems="center"
              justifyContent="center"
            >
              <LockPersonIcon />
              <p>Nobody Can View the Skill</p>
            </Stack>
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container item xs={12} p={1}>
        <SkillDialogInput
          skillDialog={skillDialog}
          setSkillDialog={setSkillDialog}
          editMode={editMode}
          setEditMode={setEditMode}
          editObj={editObj}
          userId={userId}
          createSkill={createSkill}
          updateSkill={updateSkill}
          getUserSkill={getUserSkill}
        />
        <Grid
          item
          xs={12}
          container
          rowGap={1}
          sx={{
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid silver",
            overflow: "hidden",
          }}
        >
          <Grid item xs={12} p={1} sx={{ backgroundColor: "white" }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Skills</p>
              {+userId === user?.data?.id && (
                <ControlPointIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "#1DA1F2",
                      transition: "0.3s",
                    },
                  }}
                  onClick={() => {
                    setSkillDialog(true);
                    setEditMode(false);
                    setEditObj({});
                  }}
                />
              )}
            </Stack>
          </Grid>
          {skillData?.data?.length === 0 && (
            <Grid item xs={12} p={1} sx={{ backgroundColor: "white" }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <p style={{ color: "silver", textAlign: "center" }}>
                  No skill added yet
                </p>
                {+userId === user?.data?.id && (
                  <AddCircleIcon
                    color="info"
                    onClick={() => setSkillDialog(true)}
                    sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                  />
                )}
              </Stack>
            </Grid>
          )}
          {skillData?.data?.map(
            ({
              skill_title: title,
              start_date: dateStart,
              end_date: dateEnd,
              discription: desc,
              is_verified: isVerified,
              id,
            }) => (
              <Grid
                item
                xs={12}
                md={+userId === user?.data?.id ? 6 : 12}
                p={1}
                key={id}
                sx={{
                  backgroundColor: "white",
                  borderLeft: "2px solid silver",
                }}
              >
                <Stack direction="row" alignItems="center" columnGap={2}>
                  {/* <img width="50px" height="50px" src={} alt="skill1avatar" /> */}
                  <CodeIcon fontSize="large" sx={{ color: "#1DA1F2" }} />
                  <Stack direction="column" width="100%">
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <p style={{ fontWeight: "bold", color: "black" }}>
                        {title}
                      </p>
                      {user?.data?.id === userData?.data?.id && (
                        <Stack
                          direction="row"
                          columnGap={1}
                          alignItems="center"
                        >
                          {isVerified === "Not_Requested" ? (
                            <Link
                              to={`/setting/manageskill`}
                              style={{
                                textDecoration: "none",
                                color: "red",
                                fontWeight: "bold",
                                fontSize: "12px",
                              }}
                            >
                              <Stack direction="row" alignItems="center">
                                <ReportIcon color="error" fontSize="small" />{" "}
                                Verify
                              </Stack>
                            </Link>
                          ) : isVerified === "Pending" ? (
                            <Stack direction="row" alignItems="center">
                              <PendingIcon />{" "}
                              <p
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                Verification Pending
                              </p>
                            </Stack>
                          ) : isVerified === "Disapproved" ? (
                            <Stack direction="row" alignItems="center">
                              <ReportIcon color="error" fontSize="small" />{" "}
                              <p
                                style={{
                                  fontSize: "12px",
                                }}
                              >
                                Verification Disapproved
                              </p>
                            </Stack>
                          ) : (
                            <p
                              style={{
                                fontSize: "12px",
                                color: "green",
                                fontWeight: "bold",
                              }}
                            >
                              <Stack direction="row" alignItems="center">
                                <DoneIcon fontSize="small" /> <p>Verified</p>
                              </Stack>
                            </p>
                          )}
                          {+userId === user?.data?.id && (
                            <>
                              <EditIcon
                                onClick={() =>
                                  handleUpdate(
                                    title,
                                    dateStart,
                                    dateEnd,
                                    desc,
                                    id
                                  )
                                }
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "blue",
                                  },
                                }}
                              />
                              <DeleteOutlineIcon
                                onClick={() => handleDelete(id)}
                                sx={{
                                  cursor: "pointer",
                                  "&:hover": {
                                    color: "red",
                                  },
                                }}
                              />
                            </>
                          )}
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            )
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Skill;
const SkillDialogInput = ({
  skillDialog,
  setSkillDialog,
  editMode,
  setEditMode,
  editObj,
  userId,
  createSkill,
  updateSkill,
  getUserSkill,
}) => {
  // create refs for input fields
  const titleRef = useRef();

  // destruct editObj
  const { skill_title: title, id } = editObj;

  const handleUpdate = async () => {
    const title = titleRef.current.value;

    await updateSkill({
      skill_title: title,
      id,
    }).then((response) => {
      if (response.status) {
        getUserSkill(userId);
        Swal.fire({
          title: "Success",
          text: "Skill Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
    setSkillDialog(false);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    const title = titleRef.current.value;

    await createSkill({
      skill_title: title,
    }).then((response) => {
      if (response.success) {
        getUserSkill(userId);
        Swal.fire({
          title: "Success",
          text: "Skill Added Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
    setSkillDialog(false);
  };

  return (
    <div>
      <Dialog open={skillDialog} onClose={() => setSkillDialog(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>Skill</p>
            <CloseIcon
              sx={{
                cursor: "pointer",
                borderRadius: "50%",
                "&:hover": {
                  color: "blue",
                  // add some transition
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => setSkillDialog(false)}
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editMode) {
                  handleUpdate();
                } else {
                  handleSubmit();
                }
              }}
            >
              <Grid item xs={12} p={1}>
                <input
                  required
                  style={{
                    width: "-webkit-fill-available",
                    height: "40px",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    padding: "0 10px",
                    textTransform: "capitalize",
                  }}
                  ref={titleRef}
                  defaultValue={title}
                  placeholder="Skill Title"
                  type="text"
                />
              </Grid>

              <Grid item xs={12} p={1} textAlign="center">
                {editMode ? (
                  <Button
                    sx={{ width: "-webkit-fill-available", margin: "0 auto" }}
                    variant="contained"
                    type="submit"
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    sx={{ width: "-webkit-fill-available", margin: "0 auto" }}
                    variant="outlined"
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
              </Grid>
            </form>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
