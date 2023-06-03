import { useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SimpleReactLightBox from "@bimbeo160/simple-react-lightbox";
// import img from "../../images/album/album2.png";
import ReportIcon from "@mui/icons-material/Report";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import Swal from "sweetalert2";
import { Box } from "@mui/system";
import moment from "moment";
import { SRLWrapper } from "@bimbeo160/simple-react-lightbox";
import { Link } from "react-router-dom";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useAppContext } from "../../../context/app-context";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../../../utils/helpers/profile/project_crud";

const Project = ({
  userData,
  userId,
  userProject: projectData,
  getUserProject,
}) => {
  const [projectDialog, setProjectDialog] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [document, setDocument] = useState(null);
  const { user } = useAppContext();

  const handleDelete = async (id) => {
    await deleteProject(id).then((response) => {
      if (response.success) {
        getUserProject(userId);
        Swal.fire({
          title: "Success",
          text: "Project deleted Successfully",
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
    project_title,
    company_name,
    start_date,
    end_date,
    discription,
    id
  ) => {
    setEditMode(true);
    setProjectDialog(true);
    setEditObj({
      project_title,
      company_name,
      start_date,
      end_date,
      discription,
      id,
    });
  };
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
              <p>Nobody Can View the Project</p>
            </Stack>
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container item xs={12} p={1}>
        <ProjectDialogInput
          projectDialog={projectDialog}
          setProjectDialog={setProjectDialog}
          getUserProject={getUserProject}
          editMode={editMode}
          setEditMode={setEditMode}
          editObj={editObj}
          document={document}
          setDocument={setDocument}
          userId={userId}
          createProject={createProject}
          updateProject={updateProject}
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
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Project</p>
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
                    setProjectDialog(true);
                    setEditMode(false);
                    setEditObj({});
                  }}
                />
              )}
            </Stack>
          </Grid>
          {projectData?.data?.length === 0 && (
            <Grid item xs={12} p={1} sx={{ backgroundColor: "white" }}>
              <Stack
                direction="column"
                columnGap={1}
                alignItems="center"
                justifyContent="center"
              >
                <p style={{ color: "silver", textAlign: "center" }}>
                  No project added yet
                </p>
                {+userId === user?.data?.id && (
                  <AddCircleIcon
                    color="info"
                    onClick={() => setProjectDialog(true)}
                    sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                  />
                )}
              </Stack>
            </Grid>
          )}
          {projectData?.data?.map(
            ({
              project_title: title,
              company_name: company,
              start_date: dateStart,
              end_date: dateEnd,
              discription: desc,
              images,
              is_verified: isVerified,
              id,
            }) => {
              return (
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
                    <WorkOutlineIcon
                      fontSize="large"
                      sx={{ color: "#1DA1F2" }}
                    />
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
                            {isVerified === "Not_Requested" ? (
                              <Link
                                to={`/setting/manageproject`}
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
                                      company,
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
                          {moment(dateEnd).diff(moment(dateStart), "years") ===
                          0
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
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <p style={{ color: "silver" }}>{company}</p>
                        <div>
                          <Button variant="outlined" onClick={handleClickOpen}>
                            open
                          </Button>
                          <Dialog
                            open={open}
                            onClose={handleClose}
                            // PaperComponent={PaperComponent}
                            aria-labelledby="draggable-dialog-title"
                          >
                            <DialogContent>
                              <DialogContentText>
                                <SimpleReactLightBox>
                                  <SRLWrapper>
                                    {images?.map((item, index) => {
                                      return (
                                        <img
                                          key={index}
                                          style={{ height: "50vh" }}
                                          src={item?.img}
                                          alt="hi"
                                        />
                                      );
                                    })}
                                  </SRLWrapper>
                                </SimpleReactLightBox>
                              </DialogContentText>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </Stack>
                      <details>
                        <summary>Description</summary>
                        <p
                          style={{
                            color: "silver",
                            textTransform: "lowercase",
                          }}
                        >
                          {desc}
                        </p>
                      </details>
                    </Stack>
                  </Stack>
                </Grid>
              );
            }
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Project;
const ProjectDialogInput = ({
  projectDialog,
  setProjectDialog,
  editMode,
  setEditMode,
  document,
  setDocument,
  editObj,
  userId,
  createProject,
  updateProject,
  getUserProject,
}) => {
  // const [isContinued, setIsContinued] = useState(false);
  // create refs for input fields
  const titleRef = useRef();
  const companyNameRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();
  const descriptionRef = useRef();

  const [displayImage, setdisplayImage] = useState();

  // destruct editObj
  const {
    project_title: title,
    company_name: companyName,
    start_date: dateStart,
    end_date: dateEnd,
    discription: description,
    id,
  } = editObj;

  const handleUpdate = async () => {
    const title = titleRef.current.value;
    const companyName = companyNameRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef.current.value;

    const formData = new FormData();
    formData.append("project_title", title);
    formData.append("company_name", companyName);
    formData.append("images", document);
    formData.append("start_date", dateStart);
    formData.append("end_date", dateEnd);
    formData.append("discription", description);

    await updateProject({ formData, id }).then((res) => {
      if (res?.status) {
        getUserProject(userId);
        Swal.fire({
          title: "Success",
          text: "Project Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Project Update Failed",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
    setProjectDialog(false);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    const title = titleRef?.current?.value;
    const companyName = companyNameRef?.current?.value;
    const dateStart = dateStartRef?.current?.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef?.current?.value;

    const formData = new FormData();
    formData.append("project_title", title);
    formData.append("company_name", companyName);
    formData.append("images", document);
    formData.append("start_date", dateStart);
    formData.append("end_date", dateEnd);
    formData.append("discription", description);

    await createProject(formData).then((res) => {
      if (res?.success) {
        getUserProject(userId);
        Swal.fire({
          title: "Success",
          text: "Project Created Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "something went wrong",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
    setProjectDialog(false);
    setdisplayImage("");
  };

  const fileHandler = (e) => {
    setDocument(e.target.files[0]);
    setdisplayImage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <Dialog open={projectDialog} onClose={() => setProjectDialog(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>Project</p>
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
              onClick={() => setProjectDialog(false)}
            />
          </Stack>
        </DialogTitle>

        <DialogContent>
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
            <Grid container>
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
                  placeholder="Project Title"
                  type="text"
                />
              </Grid>
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
                  ref={companyNameRef}
                  defaultValue={companyName}
                  placeholder="Company Name"
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
                    width: "95%",
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
                    width: "90%",
                    height: "40px",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    padding: "0 10px",
                  }}
                />
              </Grid>

              <Grid item xs={12} p={1}>
                <label
                  htmlFor="document"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "-webkit-fill-available",
                    height: "40px",
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
                    onChange={(e) => fileHandler(e)}
                    style={{ display: "none" }}
                    accept="*"
                    multiple
                  />
                  <p style={{ margin: "0" }}>
                    {document?.name
                      ? `Uploaded: ${document?.name}`
                      : "Upload Images"}
                  </p>
                </label>
              </Grid>

              <Grid item xs={12} p={1}>
                <input
                  style={{
                    width: "95%",
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
              {displayImage && (
                <Grid item xs={12} p={1}>
                  <Box
                    sx={{
                      width: "300px",
                      height: "300px",
                      textAlign: "center",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      width="100%"
                      height="100%"
                      src={displayImage ? displayImage : ""}
                      alt="uploaded file"
                    />
                  </Box>
                </Grid>
              )}
              <Grid item xs={12} p={1} textAlign="center">
                <Button
                  sx={{ width: "-webkit-fill-available", margin: "0 auto" }}
                  variant="outlined"
                  type="submit"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
