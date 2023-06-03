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
import { educationData } from "./data";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import {
  createEducation,
  updateEducation,
  deleteEducation,
} from "../../../utils/helpers/profile/education_crud";
import Swal from "sweetalert2";
import moment from "moment";
import { useAppContext } from "../../../context/app-context";

const Education = ({
  userData,
  userId,
  userEducation: eduData,
  getUserEducation,
}) => {
  const { user } = useAppContext();
  const [eduDialog, setEduDialog] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [editMode, setEditMode] = useState(false);

  const handleDelete = async (id) => {
    await deleteEducation(id).then((response) => {
      getUserEducation(userId);
      if (response.success) {
        Swal.fire({
          title: "Success",
          text: "Education Deleted Successfully",
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

  const handleUpdate = (
    education_title,
    institute_name,
    start_date,
    end_date,
    discription,
    id
  ) => {
    setEditMode(true);
    setEduDialog(true);
    setEditObj({
      education_title,
      institute_name,
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
              <p>Nobody Can View the Education</p>
            </Stack>
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container item xs={12} p={1}>
        <EducationDialogInput
          eduDialog={eduDialog}
          setEduDialog={setEduDialog}
          getUserEducation={getUserEducation}
          editMode={editMode}
          setEditMode={setEditMode}
          editObj={editObj}
          userId={userId}
          createEducation={createEducation}
          updateEducation={updateEducation}
        />
        <Grid
          item
          xs={12}
          container
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
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Education</p>
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
                    setEduDialog(true);
                    setEditMode(false);
                    setEditObj({});
                  }}
                />
              )}
            </Stack>
          </Grid>

          {eduData?.data?.length === 0 && (
            <Grid item xs={12} p={1} sx={{ backgroundColor: "white" }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <p style={{ color: "silver", textAlign: "center" }}>
                  No education added yet
                </p>
                {+userId === user?.data?.id && (
                  <AddCircleIcon
                    color="info"
                    onClick={() => setEduDialog(true)}
                    sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                  />
                )}
              </Stack>
            </Grid>
          )}
          {eduData?.data?.map(
            (
              {
                education_title: title,
                institute_name: institute,
                start_date: dateStart,
                end_date: dateEnd,
                discription: desc,
                id,
              },
              index
            ) => (
              <Grid
                item
                xs={12}
                md={+userId === user?.data?.id ? 6 : 12}
                p={1}
                key={index}
                sx={{
                  backgroundColor: "white",
                  borderLeft: "2px solid silver",
                }}
              >
                <Stack direction="row" alignItems="center" columnGap={2}>
                  {/* <img width="50px" height="50px" src={} alt="edu1avatar" /> */}
                  <WorkOutlineIcon fontSize="large" sx={{ color: "#1DA1F2" }} />
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
                          columnGap={2}
                          alignItems="center"
                        >
                          <EditIcon
                            onClick={() =>
                              handleUpdate(
                                title,
                                institute,
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
                        </Stack>
                      )}
                    </Stack>
                    <p style={{ color: "#0A66C2" }}>{institute}</p>
                    <Stack direction="row" alignItems="center" columnGap={2}>
                      <p style={{ color: "silver" }}>
                        {dateStart} - {dateEnd}
                      </p>
                      <p
                        style={{
                          color: "silver",
                          fontStyle: "italic",
                          fontWeight: "bold",
                        }}
                      >
                        {moment(dateEnd).diff(moment(dateStart), "years") === 0
                          ? `${moment(dateEnd).diff(
                              moment(dateStart),
                              "months"
                            )} ${
                              moment(dateEnd).diff(
                                moment(dateStart),
                                "months"
                              ) === 1
                                ? "month"
                                : "months"
                            }`
                          : `${moment(dateEnd).diff(
                              moment(dateStart),
                              "years"
                            )} ${
                              moment(dateEnd).diff(
                                moment(dateStart),
                                "years"
                              ) === 1
                                ? "year"
                                : "years"
                            }`}
                      </p>
                    </Stack>

                    <details>
                      <summary>Description</summary>
                      <p
                        style={{ color: "silver", textTransform: "lowercase" }}
                      >
                        {desc}
                      </p>
                    </details>
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

export default Education;
const EducationDialogInput = ({
  eduDialog,
  setEduDialog,
  getUserEducation,
  editMode,
  setEditMode,
  editObj,
  userId,
}) => {
  // create refs for input fields
  const titleRef = useRef();
  const instituteNameRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();
  const descriptionRef = useRef();

  // destruct editObj
  const {
    education_title: title,
    institute_name: instituteName,
    start_date: dateStart,
    end_date: dateEnd,
    discription: description,
    id,
  } = editObj;

  const handleUpdate = async () => {
    const title = titleRef.current.value;
    const instituteName = instituteNameRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef.current.value;

    await updateEducation({
      education_title: title,
      institute_name: instituteName,
      start_date: dateStart,
      end_date: dateEnd,
      discription: description,
      id,
    }).then((response) => {
      if (response.success) {
        getUserEducation(userId);
        Swal.fire({
          title: "Success",
          text: "Education Updated Successfully",
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

    setEduDialog(false);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    const title = titleRef.current.value;
    const instituteName = instituteNameRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef.current.value;

    await createEducation({
      education_title: title,
      institute_name: instituteName,
      start_date: dateStart,
      end_date: dateEnd,
      discription: description,
    }).then((response) => {
      if (response?.success) {
        getUserEducation(userId);
        Swal.fire({
          title: "Success",
          text: "Education Created Successfully",
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
    setEduDialog(false);
  };
  return (
    <div>
      <Dialog open={eduDialog} onClose={() => setEduDialog(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>Education</p>
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
              onClick={() => setEduDialog(false)}
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <Grid item xs={12} p={1}>
              {/* <input
                style={{
                  width: "95%",
                  height: "40px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  padding: "0 10px",
                  textTransform: "capitalize",
                }}
                ref={titleRef}
                defaultValue={title}
                placeholder="Degree Title"
                type="text"
              /> */}

              <select
                style={{
                  width: "100%",
                  height: "40px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  padding: "0 10px",
                  textTransform: "capitalize",
                }}
                ref={titleRef}
                defaultValue={title}
                placeholder="Degree Title"
                type="text"
              >
                {educationData?.map((item, ind) => {
                  return <option key={ind}>{item.name}</option>;
                })}
              </select>
            </Grid>

            <Grid item xs={12} md={6} p={1}>
              <input
                style={{
                  width: "95%",
                  height: "40px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  padding: "0 10px",
                  textTransform: "capitalize",
                }}
                ref={instituteNameRef}
                defaultValue={instituteName}
                placeholder="Institute Name"
                type="text"
              />
            </Grid>

            <Grid item xs={12} md={6} p={1}>
              <input
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
                style={{
                  width: "92%",
                  height: "40px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  padding: "0 10px",
                }}
                ref={dateStartRef}
                defaultValue={dateStart}
                id="name"
                type="text"
                placeholder="Start Date"
              />
            </Grid>
            <Grid item xs={12} md={6} p={1}>
              <input
                onFocus={(e) => {
                  e.target.type = "date";
                }}
                onBlur={(e) => {
                  e.target.type = "text";
                }}
                id="name"
                placeholder="End Date"
                type="text"
                ref={dateEndRef}
                defaultValue={dateEnd}
                style={{
                  width: "95%",
                  height: "40px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  padding: "0 10px",
                }}
              />
            </Grid>
            <Grid item xs={12} p={1}>
              <input
                style={{
                  width: "96%",
                  height: "40px",
                  border: "1px solid silver",
                  borderRadius: "5px",
                  padding: "0 10px",
                  textTransform: "capitalize",
                }}
                ref={descriptionRef}
                defaultValue={description}
                placeholder="Description"
                type="text"
              />
            </Grid>
            <Grid item xs={12} p={1} textAlign="center">
              {editMode ? (
                <Button
                  sx={{ width: "95%", margin: "0 auto" }}
                  variant="contained"
                  onClick={handleUpdate}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  sx={{ width: "95%", margin: "0 auto" }}
                  variant="outlined"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              )}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
};
