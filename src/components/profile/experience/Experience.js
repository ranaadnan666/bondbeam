import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Checkbox,
  Box,
  Typography,
  // Box,
} from "@mui/material";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ReportIcon from "@mui/icons-material/Report";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import { Country, State, City } from "country-state-city";
import Swal from "sweetalert2";
import moment from "moment";
import { Link } from "react-router-dom";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useAppContext } from "../../../context/app-context";

import {
  createExperience,
  updateExperience,
  deleteExperience,
} from "../../../utils/helpers/profile/experience_crud";

const Experience = ({
  userData,
  userId,
  userExperience: expData,
  getUserExperience,
}) => {
  const [expDialog, setExpDialog] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { user } = useAppContext();

  const handleDelete = async (id) => {
    await deleteExperience(id).then((response) => {
      if (response.success) {
        getUserExperience(userId);
        Swal.fire({
          title: "Success",
          text: "Experience Deleted Successfully",
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
    experience_title,
    job_status,
    company_name,
    start_date,
    end_date,
    discription,
    address,
    id
  ) => {
    setEditMode(true);
    setExpDialog(true);
    setEditObj({
      experience_title,
      job_status,
      company_name,
      start_date,
      end_date,
      discription,
      company_address: address,
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
              <p>Nobody Can View the Experience</p>
            </Stack>
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid item container xs={12} p={1}>
        <ExperienceDialogInput
          expDialog={expDialog}
          setExpDialog={setExpDialog}
          getUserExperience={getUserExperience}
          createExperience={createExperience}
          updateExperience={updateExperience}
          editMode={editMode}
          setEditMode={setEditMode}
          editObj={editObj}
          userId={userId}
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
          <Grid
            item
            xs={12}
            p={1}
            sx={{
              backgroundColor: "white",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Experience</p>
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
                    setExpDialog(true);
                    setEditMode(false);
                    setEditObj({});
                  }}
                />
              )}
            </Stack>
          </Grid>
          {expData?.data?.length === 0 && (
            <Grid item xs={12} p={1} sx={{ backgroundColor: "white" }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <p style={{ color: "silver", textAlign: "center" }}>
                  No experience added yet
                </p>
                {+userId === user?.data?.id && (
                  <AddCircleIcon
                    color="info"
                    onClick={() => setExpDialog(true)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        color: "green",
                      },
                    }}
                  />
                )}
              </Stack>
            </Grid>
          )}
          {expData?.data?.map(
            ({
              experience_title: title,
              job_status: jobType,
              company_name: company,
              start_date: dateStart,
              end_date: dateEnd,
              discription: desc,
              company_address: address,
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
                  // borderBottom: "2px solid silver",
                  borderLeft: "2px solid silver",
                  // borderRadius: "10px",
                  // border: "1px solid silver",
                }}
              >
                <Stack direction="row" alignItems="center" columnGap={2}>
                  {/* <img width="50px" height="50px" src={} alt="exp1avatar" /> */}
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
                          {isVerified === "Not_Requested" ? (
                            <Link
                              to={`/setting/manageexp`}
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
                          <EditIcon
                            onClick={() =>
                              handleUpdate(
                                title,
                                jobType,
                                company,
                                dateStart,
                                dateEnd,
                                desc,
                                address,
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
                    <p style={{ color: "#0A66C2" }}>
                      {company} - {jobType}
                    </p>
                    <p style={{ color: "silver" }}>{address}</p>
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
                        {dateEnd
                          ? moment(dateEnd).diff(moment(dateStart), "years") ===
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
                              }`
                          : "Continue"}
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

export default Experience;
const ExperienceDialogInput = ({
  expDialog,
  setExpDialog,
  getUserExperience,
  createExperience,
  updateExperience,
  editMode,
  setEditMode,
  editObj,
  userId,
}) => {
  const [isContinued, setIsContinued] = useState(false);
  // create refs for input fields
  const titleRef = useRef();
  const jobTypeRef = useRef();
  const companyNameRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();
  const descriptionRef = useRef();
  const locationRef = useRef();
  const [JobTitle, setJobTitle] = useState();
  const [SelectState, setSelectState] = useState();

  const [CountryState, setCountryState] = useState([]);
  useEffect(() => {
    setCountryState(Country.getAllCountries());
  }, []);

  // destruct editObj
  const {
    experience_title: title,
    job_status: jobType,
    company_name: companyName,
    start_date: dateStart,
    end_date: dateEnd,
    discription: description,
    company_address: location,
    id,
  } = editObj;

  const handleUpdate = async () => {
    const title = titleRef.current.value;
    const companyName = companyNameRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef.current.value;
    const location = locationRef?.current?.value;

    await updateExperience({
      experience_title: title,
      company_name: companyName,
      start_date: dateStart,
      end_date: dateEnd,
      discription: description,
      company_address: SelectState,
      company_address: location,
      is_continue: isContinued,
      job_status: JobTitle,
      id,
    }).then((response) => {
      if (response.status) {
        Swal.fire({
          title: "Success",
          text: "Experience Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: response.msg,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
    getUserExperience(userId);
    setExpDialog(false);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    const title = titleRef.current.value;
    // const jobType = jobTypeRef.current.value;
    const jobType = JobTitle;
    const companyName = companyNameRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef.current.value;
    const location = locationRef?.current?.value;

    await createExperience({
      experience_title: title,
      job_status: jobType,
      company_name: companyName,
      start_date: dateStart,
      end_date: dateEnd,
      discription: description,
      company_address: location,
      is_continue: isContinued,
    }).then((response) => {
      if (response?.success) {
        getUserExperience(userId);
        Swal.fire({
          title: "Success",
          text: "Experience Added Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Please Enter a Valid date.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    });
    setExpDialog(false);
  };

  const [address, setaddress] = useState("");
  const [setcoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const li = await getLatLng(result[0]);

    setaddress(value);
    setcoordinates(li);
  };

  return (
    <div>
      <Dialog open={expDialog} onClose={() => setExpDialog(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>Experience</p>
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
              onClick={() => setExpDialog(false)}
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
              <Grid item xs={6} p={1}>
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
                  placeholder="Title"
                  type="text"
                />
              </Grid>
              <Grid item xs={12} md={6} p={1}>
                <select
                  required
                  style={{
                    width: "-webkit-fill-available",
                    height: "40px",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    padding: "0 10px",
                    textTransform: "capitalize",
                  }}
                  // ref={jobTypeRef}
                  // defaultValue={jobType}
                  placeholder="Job Type"
                  type="text"
                  onChange={(e) => setJobTitle(e.target.value)}
                >
                  <option>Job Type</option>
                  <option>Full Time</option>
                  <option>Half Time</option>
                </select>
              </Grid>
              <Grid item xs={12} md={6} p={1}>
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
                  required
                  onFocus={(e) => {
                    e.target.type = "date";
                  }}
                  onBlur={(e) => {
                    e.target.type = "text";
                  }}
                  style={{
                    width: "-webkit-fill-available",
                    height: "40px",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    padding: "0 10px",
                  }}
                  ref={dateStartRef}
                  defaultValue={dateStart}
                  max={new Date().toISOString().split("T")[0]}
                  id="name"
                  type="text"
                  placeholder="Start Date"
                />
              </Grid>
              <Grid item xs={12} md={6} p={1}>
                <Stack direction="row" alignItems="center">
                  <Checkbox
                    id="checkboxId"
                    onChange={(e) => setIsContinued(e.target.checked)}
                  />
                  <label htmlFor="checkboxId">Continued on this Role?</label>
                </Stack>
              </Grid>
              {!isContinued && (
                <Grid item xs={12} md={6} p={1}>
                  <input
                    required={isContinued ? false : true}
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
                    max={new Date().toISOString().split("T")[0]}
                    defaultValue={dateEnd}
                    style={{
                      width: "-webkit-fill-available",
                      height: "40px",
                      border: "1px solid silver",
                      borderRadius: "5px",
                      padding: "0 10px",
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12} p={1}>
                <PlacesAutocomplete
                  value={address}
                  onChange={setaddress}
                  onSelect={handleSelect}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <input
                        style={{
                          width: "-webkit-fill-available",
                          height: "40px",
                          border: "1px solid silver",
                          borderRadius: "5px",
                          padding: "0 10px",
                          textTransform: "capitalize",
                        }}
                        ref={locationRef}
                        // defaultValue={location}
                        placeholder="Company Location"
                        type="text"
                        {...getInputProps({
                          placeholder: "Search Places ...",
                          className: "location-search-input",
                        })}
                      />

                      <Box
                        className="autocomplete-dropdown-container"
                        sx={{ backgroundColor: "#F1F3F4", margin: "0.6rem" }}
                      >
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          const style = suggestion.active
                            ? { backgroundColor: "white", cursor: "pointer" }
                            : { backgroundColor: "#F1F3F4", cursor: "pointer" };
                          return (
                            <Box
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                // style,
                              })}
                              sx={{
                                padding: "0.4rem",
                                "&:hover": { backgroundColor: "white" },
                              }}
                              // style={{ backgroundColor:'red'}}
                            >
                              <Typography
                                sx={{
                                  borderBottom: "1px solid silver",
                                  fontSize: "0.8rem",
                                  "&:hover": {
                                    borderBottom: "1px solid black",
                                    color: "red",
                                  },
                                }}
                              >
                                {suggestion.description}
                              </Typography>
                            </Box>
                          );
                        })}
                      </Box>
                    </div>
                  )}
                </PlacesAutocomplete>
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
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
