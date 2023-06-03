import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Swal from "sweetalert2";
import { Stack } from "@mui/system";
import { Button, Grid } from "@mui/material";
import { BorderColor } from "@mui/icons-material";
export default function Feedback() {
  const userdata = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = JSON.parse(localStorage.getItem("userLoggedIn"));
  const [description, setdescription] = useState("");
  const [document, setDocument] = useState(null);
  const [displayImage, setdisplayImage] = useState();
  const fileHandler = (e) => {
    setDocument(e.target.files[0]);
    setdisplayImage(URL.createObjectURL(e.target.files[0]));
  };
  const handleFeedback = async () => {
    // check if any field is empty then show warning
    if (!description) {
      Swal.fire({
        title: "Warning",
        text: "Please enter description",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    // if (!document) {
    //   Swal.fire({
    //     title: "Warning",
    //     text: "Please select a document",
    //     icon: "warning",
    //     confirmButtonText: "OK",
    //   });
    //   return;
    // }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token.token.access}`);
    var formdata = new FormData();
    formdata.append("description", description);
    formdata.append("media", document);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };
    await fetch("https://api.bondbeam.com/api/user_feedback/", requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res?.status === true) {
          Swal.fire({
            title: "Success",
            text: "Feedback Submitted Successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
        } else {
          Swal.fire({
            title: "Error",
            text: "Feedback Submission Failed",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .then(() => setdescription(""))
      .then(() => setDocument(null))
      .then(() => setdisplayImage(""))
      .catch((error) => {});
  };
  return (
    <Box
      component="form"
      sx={{
        m: 5,
        "& > :not(style)": { m: 2, width: "100%" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack>
        <Box component="label" fontSize={"large"} fontWeight={600} p={1}>
          Email
        </Box>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={userdata.data.email}
          readOnly
        />
        <Box component="label" fontSize={"large"} fontWeight={600} p={1}>
          User Name
        </Box>
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={userdata.data.username}
          readOnly
        />
        <Box component="label" fontSize={"large"} fontWeight={600} p={1}>
          Description
        </Box>
        <TextareaAutosize
          required
          aria-label="empty textarea"
          minRows={10}
          style={{ width: "98%", padding: "1rem", fontSize: "large" }}
          value={description}
          placeholder="Write your feedback"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        />

        <Grid
          item
          container
          md={4}
          xs={12}
          p={"1rem 0rem"}
          direction="row"
          justifyContent={"space-between"}
        >
          {!displayImage ? (
            <label
              htmlFor="document"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "20%",
                height: "40px",
                border: "1px solid silver",
                borderRadius: "5px",
                textTransform: "capitalize",
                cursor: "pointer",
              }}
            >
              <input
                type="file"
                id="document"
                onChange={(e) => fileHandler(e)}
                style={{ display: "none" }}
                accept="image/*"
              />
              <p style={{ margin: "0" }}>Upload Image</p>
            </label>
          ) : (
            <Stack width={"10rem"} height={"10rem"}>
              <Box
                component="img"
                alt="Select Image to Preview"
                src={displayImage}
                width="100%"
                height={"100%"}
              />
            </Stack>
          )}
        </Grid>

        <Stack display="inline-block">
          <Button
            variant="filled"
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": {
                backgroundColor: "black",
                color: "white",
              },
            }}
            onClick={handleFeedback}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
