import { useRef, useState, useEffect } from "react";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import {
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "../../../utils/helpers/profile/language_crud";
import CountryLanguage from "country-language";
import Swal from "sweetalert2";
import { useAppContext } from "../../../context/app-context";

const Language = ({
  userData,
  userId,
  userLanguage: languageData,
  getUserLanguage,
}) => {
  const [languageDialog, setLanguageDialog] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [editMode, setEditMode] = useState(false);
  const { user } = useAppContext();

  const handleDelete = async (id) => {
    await deleteLanguage(id).then((response) => {
      if (response.success) {
        getUserLanguage(userId);
        Swal.fire({
          title: "Success",
          text: "Language Deleted Successfully",
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

  const handleUpdate = (language, id) => {
    setEditMode(true);
    setLanguageDialog(true);
    setEditObj({
      language,
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
      <Grid container item xs={12} p={1}>
        <LanguageDialogInput
          languageDialog={languageDialog}
          setLanguageDialog={setLanguageDialog}
          getUserLanguage={getUserLanguage}
          editMode={editMode}
          setEditMode={setEditMode}
          editObj={editObj}
          userId={userId}
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
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Languages</p>
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
                    setLanguageDialog(true);
                    setEditMode(false);
                    setEditObj({});
                  }}
                />
              )}
            </Stack>
          </Grid>
          {languageData?.data?.length === 0 && (
            <Grid item xs={12} p={1} sx={{ backgroundColor: "white" }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <p style={{ color: "silver", textAlign: "center" }}>
                  No language added yet
                </p>
                {+userId === user?.data?.id && (
                  <AddCircleIcon
                    color="info"
                    onClick={() => setLanguageDialog(true)}
                    sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                  />
                )}
              </Stack>
            </Grid>
          )}
          {languageData?.data?.map(({ language, id }) => (
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
                <Stack direction="column" width="100%">
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <p style={{ fontWeight: "bold", color: "black" }}>
                      {language}
                    </p>
                    <Stack direction="row" columnGap={2} alignItems="center">
                      {+userId === user?.data?.id && (
                        <>
                          <EditIcon
                            onClick={() => handleUpdate(language, id)}
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
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Language;
const LanguageDialogInput = ({
  languageDialog,
  setLanguageDialog,
  editMode,
  setEditMode,
  editObj,
  userId,
  getUserLanguage,
}) => {
  const [CLanguage, setCLanguage] = useState([]);

  CLanguage.map((item) => {
    return item.displayName;
  }, []);

  useEffect(() => {
    CountryLanguage.getCountry("GB", function (err, country) {
      if (err) {
      } else {
        var languagesInGB = country.languages;
        setCLanguage(languagesInGB[0].langCultureMs);
      }
    });
  }, []);

  // create refs for input fields
  const languageRef = useRef();

  // destruct editObj
  const { language, id } = editObj;

  const handleUpdate = async () => {
    const language = languageRef.current.value;

    await updateLanguage({
      language,
      id,
    }).then((response) => {
      if (response.success) {
        getUserLanguage(userId);
        Swal.fire({
          title: "Success",
          text: "Language Updated Successfully",
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
    setLanguageDialog(false);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    const language = languageRef.current.value;

    await createLanguage({
      language,
    }).then((response) => {
      if (response?.status) {
        getUserLanguage(userId);
        Swal.fire({
          title: "Success",
          text: "Language Added Successfully",
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
    setLanguageDialog(false);
  };

  return (
    <div>
      <Dialog open={languageDialog} onClose={() => setLanguageDialog(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>Language</p>
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
              onClick={() => setLanguageDialog(false)}
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
                <select
                  ref={languageRef}
                  defaultValue={language}
                  style={{
                    width: "-webkit-fill-available",
                    height: "100%",
                    border: "1px solid silver",
                    borderRadius: "5px",
                    padding: "10px 10px",
                    textTransform: "capitalize",
                  }}
                >
                  <option value="Afrikaans">Afrikaans</option>
                  <option value="Albanian">Albanian</option>
                  <option value="Arabic">Arabic</option>
                  <option value="Armenian">Armenian</option>
                  <option value="Basque">Basque</option>
                  <option value="Bengali">Bengali</option>
                  <option value="Bulgarian">Bulgarian</option>
                  <option value="Catalan">Catalan</option>
                  <option value="Cambodian">Cambodian</option>
                  <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
                  <option value="Croatian">Croatian</option>
                  <option value="Czech">Czech</option>
                  <option value="Danish">Danish</option>
                  <option value="Dutch">Dutch</option>
                  <option value="English">English</option>
                  <option value="Estonian">Estonian</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finnish">Finnish</option>
                  <option value="French">French</option>
                  <option value="Georgian">Georgian</option>
                  <option value="German">German</option>
                  <option value="Greek">Greek</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="Hebrew">Hebrew</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Hungarian">Hungarian</option>
                  <option value="Icelandic">Icelandic</option>
                  <option value="Indonesian">Indonesian</option>
                  <option value="Irish">Irish</option>
                  <option value="Italian">Italian</option>
                  <option value="Japanese">Japanese</option>
                  <option value="Javanese">Javanese</option>
                  <option value="Korean">Korean</option>
                  <option value="Latin">Latin</option>
                  <option value="Latvian">Latvian</option>
                  <option value="Lithuanian">Lithuanian</option>
                  <option value="Macedonian">Macedonian</option>
                  <option value="Malay">Malay</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Maltese">Maltese</option>
                  <option value="Maori">Maori</option>
                  <option value="Marathi">Marathi</option>
                  <option value="Mongolian">Mongolian</option>
                  <option value="Nepali">Nepali</option>
                  <option value="Norwegian">Norwegian</option>
                  <option value="Persian">Persian</option>
                  <option value="Polish">Polish</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="Punjabi">Punjabi</option>
                  <option value="Quechua">Quechua</option>
                  <option value="Romanian">Romanian</option>
                  <option value="Russian">Russian</option>
                  <option value="Samoan">Samoan</option>
                  <option value="Serbian">Serbian</option>
                  <option value="Slovak">Slovak</option>
                  <option value="Slovenian">Slovenian</option>
                  <option value="Spanish">Spanish</option>
                  <option value="Swahili">Swahili</option>
                  <option value="Swedish ">Swedish </option>
                  <option value="Tamil">Tamil</option>
                  <option value="Tatar">Tatar</option>
                  <option value="Telugu">Telugu</option>
                  <option value="Thai">Thai</option>
                  <option value="Tibetan">Tibetan</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Turkish">Turkish</option>
                  <option value="Ukrainian">Ukrainian</option>
                  <option value="Urdu">Urdu</option>
                  <option value="Uzbek">Uzbek</option>
                  <option value="Vietnamese">Vietnamese</option>
                  <option value="Welsh">Welsh</option>
                  <option value="Xhosa">Xhosa</option>
                </select>
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
