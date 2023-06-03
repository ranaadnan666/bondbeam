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
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { useAppContext } from "../../../context/app-context";
import {
  createLicense,
  updateLicense,
  deleteLicense,
} from "../../../utils/helpers/profile/license_crud";
import Swal from "sweetalert2";
import moment from "moment";

const License = ({
  userData,
  userId,
  userLicense: licenseData,
  getUserLicense,
}) => {
  const [licenseDialog, setLicenseDialog] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [document, setDocument] = useState(null);
  const { user } = useAppContext();

  const handleDelete = async (id) => {
    await deleteLicense(id).then((response) => {
      if (response?.success) {
        getUserLicense(userId);
        Swal.fire({
          title: "Success",
          text: "License deleted Successfully",
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
    designation,
    document,
    company_name,
    start_date,
    end_date,
    discription,
    credential_id,
    id
  ) => {
    setEditMode(true);
    setLicenseDialog(true);
    setEditObj({
      designation,
      document,
      company_name,
      start_date,
      end_date,
      discription,
      credential_id,
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
              <p>Nobody Can View the License & Certificate</p>
            </Stack>
          </Box>
        </Grid>
      </>
    );
  }

  return (
    <>
      <Grid container item xs={12} p={1}>
        <LicenseDialogInput
          licenseDialog={licenseDialog}
          setLicenseDialog={setLicenseDialog}
          getUserLicense={getUserLicense}
          editMode={editMode}
          setEditMode={setEditMode}
          editObj={editObj}
          document={document}
          setDocument={setDocument}
          userId={userId}
          createLicense={createLicense}
          updateLicense={updateLicense}
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
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>
                License & Certificate
              </p>
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
                    setLicenseDialog(true);
                    setEditMode(false);
                    setEditObj({});
                  }}
                />
              )}
            </Stack>
          </Grid>
          {licenseData?.data?.length === 0 && (
            <Grid item xs={12} p={1} sx={{ backgroundColor: "white" }}>
              <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <p style={{ color: "silver", textAlign: "center" }}>
                  No license & certificate added yet
                </p>
                {+userId === user?.data?.id && (
                  <AddCircleIcon
                    color="info"
                    onClick={() => setLicenseDialog(true)}
                    sx={{ cursor: "pointer", "&:hover": { color: "green" } }}
                  />
                )}
              </Stack>
            </Grid>
          )}
          {licenseData?.data?.map(
            ({
              designation,
              document,
              company_name: company,
              start_date: dateStart,
              end_date: dateEnd,
              discription: desc,
              credential_id: crdId,
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
                  <WorkspacePremiumIcon
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
                        {designation}
                      </p>
                      <Stack direction="row" columnGap={2} alignItems="center">
                        {+userId === user?.data?.id && (
                          <>
                            <EditIcon
                              onClick={() =>
                                handleUpdate(
                                  designation,
                                  document,
                                  company,
                                  dateStart,
                                  dateEnd,
                                  desc,
                                  crdId,
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
                    </Stack>
                    <p style={{ color: "#0A66C2" }}>{company}</p>
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
                    <Stack
                      direction="row"
                      columnGap={2}
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <p style={{ color: "silver" }}>
                        {crdId && `Credential ID: ${crdId}`}
                      </p>
                      {/* download and preview button for uploaded document */}
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => window.open(document)}
                      >
                        Preview
                      </Button>
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

export default License;
const LicenseDialogInput = ({
  licenseDialog,
  setLicenseDialog,
  getUserLicense,
  editMode,
  setEditMode,
  editObj,
  document: doc,
  setDocument,
  createLicense,
  updateLicense,
  userId,
}) => {
  // create refs for input fields
  const desigRef = useRef();
  const companyRef = useRef();
  const dateStartRef = useRef();
  const dateEndRef = useRef();
  const descriptionRef = useRef();
  const credentialIdRef = useRef();

  const [displayImage, setDisplayImage] = useState(null);

  // destruct editObj
  const {
    designation,
    // document,
    company_name: companyName,
    start_date: dateStart,
    end_date: dateEnd,
    discription: description,
    credential_id: credentialId,
    id,
  } = editObj;

  const handleUpdate = async () => {
    const designation = desigRef.current.value;
    const companyName = companyRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef.current.value;
    const credentialId = credentialIdRef.current.value;

    // const formData = new FormData();
    // formData.append("document", document);
    // formData.append("designation", designation);
    // formData.append("company_name", companyName);
    // formData.append("start_date", dateStart);
    // formData.append("end_date", dateEnd);
    // formData.append("discription", description);
    // formData.append("credential_id", credentialId);
    // formData.append("id", id);
    // await updateLicense(formData)

    await updateLicense({
      designation,
      // document,
      company_name: companyName,
      start_date: dateStart,
      end_date: dateEnd,
      discription: description,
      credential_id: credentialId,
      id,
    }).then((res) => {
      if (res?.success) {
        getUserLicense(userId);
        Swal.fire({
          title: "Success",
          text: "License Updated Successfully",
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
    setLicenseDialog(false);
    setEditMode(false);
  };

  const fileHandler = (e) => {
    if (e.target.files?.length < 1) {
      return;
    } else {
      setDocument(e.target.files[0]);
      setDisplayImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    if (!doc) {
      Swal.fire({
        title: "Error",
        text: "File Required",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }

    const designation = desigRef.current.value;
    const companyName = companyRef.current.value;
    const dateStart = dateStartRef.current.value;
    const dateEnd = dateEndRef?.current?.value;
    const description = descriptionRef.current.value;
    const credentialId = credentialIdRef.current.value;

    const formData = new FormData();
    formData.append("document", doc);
    formData.append("designation", designation);
    formData.append("company_name", companyName);
    formData.append("start_date", dateStart);
    formData.append("end_date", dateEnd);
    formData.append("discription", description);
    formData.append("credential_id", credentialId);

    await createLicense(formData).then((response) => {
      if (response.success) {
        getUserLicense(userId);
        Swal.fire({
          title: "Success",
          text: "License Added Successfully",
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
    setLicenseDialog(false);
  };
  return (
    <div>
      <Dialog open={licenseDialog} onClose={() => setLicenseDialog(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <p>License & Certificate</p>
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
              onClick={() => setLicenseDialog(false)}
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
                  ref={desigRef}
                  defaultValue={designation}
                  placeholder="Certificate name"
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
                  ref={companyRef}
                  defaultValue={companyName}
                  placeholder="Company Name"
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
                  ref={credentialIdRef}
                  defaultValue={credentialId}
                  placeholder="Credential ID"
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
                  id="name"
                  type="text"
                  placeholder="Start Date"
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
                  id="name"
                  placeholder="End Date"
                  type="text"
                  ref={dateEndRef}
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
              <Grid item xs={12} p={1}>
                {/* inpuvt for upload document */}
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
                    accept=".*"
                  />
                  <p style={{ margin: "0" }}>
                    {doc?.name ? `Uploaded: ${doc?.name}` : "Upload File"}
                  </p>
                </label>
              </Grid>
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
