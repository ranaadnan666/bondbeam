import { useRef, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import MapIcon from "@mui/icons-material/Map";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Swal from "sweetalert2";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useAppContext } from "../../../context/app-context";

const Info = ({ userData, userInfo }) => {
  const [infoDialogEdit, setInfoDialogEdit] = useState(false);
  const { user, userProfileUpdate } = useAppContext();
  const userAddress = userData?.data?.address;
  const userStudyAt = userData?.data?.study_at;
  const userWorkPlace = userData?.data?.work_place;

  const handleSubmit = async (workPlaceRef, studyAtRef, addressRef) => {
    if (workPlaceRef || studyAtRef || addressRef) {
      setInfoDialogEdit(false);
      await userProfileUpdate(
        {
          work_place: workPlaceRef,
          study_at: studyAtRef,
          address: addressRef,
        },
        user?.data?.id
      ).then((response) => {
        userInfo(user?.data?.id);
        if (response.status) {
          Swal.fire({
            title: "Success",
            text: "Info Updated Successfully",
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
    }
  };

  return (
    <>
      <Grid
        item
        xs={12}
        md={userData?.data?.id === user?.data?.id ? 6 : 12}
        p={1}
      >
        <InfoDialogEdit
          infoDialogEdit={infoDialogEdit}
          setInfoDialogEdit={setInfoDialogEdit}
          handleSubmit={handleSubmit}
          userAddress={userAddress}
          userStudyAt={userStudyAt}
          userWorkPlace={userWorkPlace}
        />
        <Stack
          direction="column"
          rowGap={3}
          p={2}
          backgroundColor="white"
          height="200px"
          overflow={"auto"}
          sx={{
            borderRadius: "10px",
            border: "1px solid silver",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p style={{ fontWeight: "bold", fontSize: "20px" }}>Info</p>
            {userData?.data?.id === user?.data?.id && (
              <EditIcon
                onClick={() => setInfoDialogEdit(true)}
                sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
              />
            )}
          </Stack>
          <Stack direction="row" columnGap={2} alignItems="center">
            <WorkIcon />
            <p>
              Works at{" "}
              {userWorkPlace ? (
                <span style={{ fontWeight: "bold" }}>{userWorkPlace}</span>
              ) : (
                <span style={{ fontWeight: "bold" }}>Not added yet</span>
              )}
            </p>
            {!userWorkPlace && userData?.data?.id === user?.data?.id && (
              <AddCircleIcon
                color="info"
                onClick={() => setInfoDialogEdit(true)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "green",
                  },
                }}
              />
            )}
          </Stack>
          <Stack direction="row" columnGap={2} alignItems="center">
            <AutoStoriesIcon />
            <p>
              Studied at{" "}
              {userStudyAt ? (
                <span style={{ fontWeight: "bold" }}>{userStudyAt}</span>
              ) : (
                <span style={{ fontWeight: "bold" }}>Not added yet</span>
              )}
            </p>
            {!userStudyAt && userData?.data?.id === user?.data?.id && (
              <AddCircleIcon
                color="info"
                onClick={() => setInfoDialogEdit(true)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "green",
                  },
                }}
              />
            )}
          </Stack>
          <Stack direction="row" columnGap={2} alignItems="center">
            <MapIcon />
            <p>
              Lives in{" "}
              {userAddress ? (
                <span style={{ fontWeight: "bold" }}>
                  {userAddress}
                  {/* &nbsp; */}
                  {/* {userCountry} */}
                </span>
              ) : (
                <span style={{ fontWeight: "bold" }}>Not added yet</span>
              )}
            </p>
            {!userAddress && userData?.data?.id === user?.data?.id && (
              <AddCircleIcon
                color="info"
                onClick={() => setInfoDialogEdit(true)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "green",
                  },
                }}
              />
            )}
          </Stack>
        </Stack>
      </Grid>
    </>
  );
};

export default Info;
const InfoDialogEdit = ({
  infoDialogEdit,
  handleSubmit,
  setInfoDialogEdit,
  userAddress,
  userStudyAt,
  userWorkPlace,
}) => {
  const workPlaceRef = useRef();
  const studyAtRef = useRef();
  const addressRef = useRef();

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
      <Dialog open={infoDialogEdit} onClose={() => setInfoDialogEdit(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>Info</p>
            <CloseIcon
              sx={{
                cursor: "pointer",
                borderRadius: "50%",
                "&:hover": {
                  color: "blue",
                  transition: "all 0.3s ease-in-out",
                },
              }}
              onClick={() => setInfoDialogEdit(false)}
            />
          </Stack>
        </DialogTitle>
        <DialogContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(
                workPlaceRef?.current?.value,
                studyAtRef?.current?.value,
                addressRef?.current?.value
              );
            }}
          >
            <Grid container>
              <Grid item xs={12} p={1}>
                <input
                  required
                  style={{
                    width: "-webkit-fill-available",
                    height: "40px",
                    borderRadius: "5px",
                    border: "1px solid",
                    padding: "0 10px",
                    outline: "none",
                  }}
                  placeholder="Work Place"
                  defaultValue={userWorkPlace}
                  ref={workPlaceRef}
                  type="text"
                />
              </Grid>
              <Grid item xs={12} p={1}>
                {/* <p>{address}</p> */}

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
                        defaultValue={userAddress}
                        ref={addressRef}
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
              {/* <Grid item xs={12} p={1}>

                <input
                  required
                  style={{
                    width: "-webkit-fill-available",
                    height: "40px",
                    borderRadius: "5px",
                    border: "1px solid",
                    padding: "0 10px",
                    outline: "none",
                  }}
                  placeholder="Address"
                  defaultValue={userAddress}
                  ref={addressRef}
                  type="text"
                />
              </Grid> */}
              <Grid item xs={12} p={1}>
                <input
                  required
                  style={{
                    width: "-webkit-fill-available",
                    height: "40px",
                    borderRadius: "5px",
                    border: "1px solid",
                    padding: "0 10px",
                    outline: "none",
                  }}
                  placeholder="Study At"
                  ref={studyAtRef}
                  defaultValue={userStudyAt}
                  type="text"
                />
              </Grid>

              {/* <Grid item xs={12} sm={6} p={1}>
                <select
                  style={{
                    width: "-webkit-fill-available",
                    height: "40px",
                    borderRadius: "5px",
                    border: "1px solid",
                    padding: "0 10px",
                    outline: "none",
                    textTransform: "capitalize",
                    maxWidth: "100%",
                  }}
                  placeholder="Marital Status"
                  defaultValue={userRelationship}
                  ref={relationshipRef}
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                </select>
              </Grid> */}

              <Grid item xs={12} p={1}>
                <Button
                  sx={{ width: "100%", margin: "0 auto" }}
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
