import React, { useEffect } from "react";
import { Button, Grid, Stack } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useState } from "react";
import {
  createGroup,
  getGroupCategories,
  updateGroupDetails,
} from "../../utils/helpers/group/group_crud";
import FileResizer from "react-image-file-resizer";
import Modal from "../../components/modal/Modal";
import { useAppContext } from "../../context/app-context";

const Create = () => {
  // state for group form
  const { groupFormData, setGroupFormData, allNewsFeed } = useAppContext();
  const [resizedProfileImages, setResizedProfileImages] = useState([]);
  const [resizedCoverImages, setResizedCoverImages] = useState([]);
  const [groupCategories, setGroupCategories] = useState([]);
  const [groupprofilepic, setGroupprofilepic] = useState({ prof_pic: "" });
  const [groupcoverpic, setGroupcoverpic] = useState({ cover_pic: "" });

  // console.log("groupFormData in Create File", groupFormData.category);

  const inputStyles = {
    border: "none",
    backgroundColor: "#F1F3F4",
    padding: "10px",
    borderRadius: "5px",
  };

  // ======================== submit form
  const handleSubmit = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const groupId = groupFormData.id;
    // check if all fields are filled
    if (
      groupFormData.name === "" ||
      groupFormData.phone_no === "" ||
      groupFormData.phone_code === "" ||
      groupFormData.category === "" ||
      // groupFormData.profile_pic === "" ||
      // groupFormData.cover_pic === "" ||
      groupFormData.about === ""
    ) {
      alert("Please fill all fields");
      return;
    } else {
      // make form data and append all data of groupFormData state
      const formData = new FormData();
      formData.append("group_name", groupFormData.name);
      formData.append("phone_code", groupFormData.phone_code);
      formData.append("phone_no", groupFormData.phone_no);
      formData.append("category", groupFormData.category.id);
      formData.append("group_about", groupFormData.about);
      // append profile pic
      for (let i = 0; i < groupFormData.profile_pic?.length; i++) {
        formData.append(
          "profile_pic",
          groupFormData.profile_pic[i],
          groupFormData.profile_pic[i].name
            ? groupFormData.profile_pic[i].name
            : null
        );
      }
      // for (let i = 0; i < resizedProfileImages?.length; i++) {
      //   formData.append(
      //     "profile_pic",
      //     resizedProfileImages[i],
      //     resizedProfileImages[i].name ? resizedProfileImages[i].name : null
      //   );
      // }
      // append cover pic
      for (let i = 0; i < groupFormData.cover_pic?.length; i++) {
        formData.append(
          "cover_pic",
          groupFormData.cover_pic[i],
          groupFormData.cover_pic[i]?.name
            ? groupFormData.cover_pic[i]?.name
            : null
        );
      }
      // for (let i = 0; i < resizedCoverImages?.length; i++) {
      //   formData.append(
      //     "cover_pic",
      //     resizedCoverImages[i],
      //     resizedCoverImages[i].name ? resizedCoverImages[i].name : null
      //   );
      // }

      // call create group function
      const response = groupFormData.editMode
        ? await updateGroupDetails(lsUser?.token?.access, groupId, formData)
        : await createGroup(lsUser?.token?.access, formData);
      console.log("response of group update:", response);
      if (response?.status || response?.status_code === 200) {
        setGroupFormData((prev) => {
          return {
            ...prev,
            isError: false,
            displayMessage: groupFormData.editMode
              ? "Group Successfully Updated"
              : " Group Successfully Created",
            isModalOpen: true,
          };
        });
      } else {
        setGroupFormData((prev) => {
          return {
            ...prev,
            isError: true,
            displayMessage: "Something went wrong",
            isModalOpen: true,
          };
        });
      }
    }
  };

  // ======================== Image Resizing and Conversion
  // const resizeFile = (file) =>
  //   new Promise((resolve) => {
  //     FileResizer.imageFileResizer(
  //       file,
  //       480,
  //       480,
  //       "webp",
  //       70,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //   });

  // ======================== Conversion base64
  // const dataURIToBlob = (dataURI) => {
  //   const splitDataURI = dataURI.split(",");
  //   const byteString =
  //     splitDataURI[0].indexOf("base64") >= 0
  //       ? atob(splitDataURI[1])
  //       : decodeURI(splitDataURI[1]);
  //   const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  //   const ia = new Uint8Array(byteString.length);
  //   for (let i = 0; i < byteString.length; i++)
  //     ia[i] = byteString.charCodeAt(i);

  //   return new Blob([ia], { type: mimeString });
  // };
  // ========================== handle resize for profile images
  // const handleProfilePicResize = async (allImages) => {
  //   for (let i = 0; i < allImages?.length; i++) {
  //     const file = allImages[i];

  //     const image = await resizeFile(file);
  //     const newFile = dataURIToBlob(image);
  //     setResizedProfileImages((prev) => {
  //       return [...prev, newFile];
  //     });
  //   }
  // };
  // ========================== handle resize for cover images
  // const handleCoverPicResize = async (allImages) => {
  //   for (let i = 0; i < allImages?.length; i++) {
  //     const file = allImages[i];

  //     const image = await resizeFile(file);
  //     const newFile = dataURIToBlob(image);
  //     setResizedCoverImages((prev) => {
  //       return [...prev, newFile];
  //     });
  //   }
  // };

  // ======================== handle file change
  const handleProfilePicChange = (e) => {
    setGroupFormData({
      ...groupFormData,
      [e.target.name]: e.target.files,
    });
    setGroupprofilepic({ prof_pic: e.target.files[0]?.name });
    // handleProfilePicResize(e.target.files);
  };
  const handleCoverPicChange = (e) => {
    setGroupFormData({
      ...groupFormData,
      [e.target.name]: e.target.files,
    });
    setGroupcoverpic({ cover_pic: e.target.files[0]?.name });
    // handleCoverPicResize(e.target.files);
  };

  // ======================== handle change
  const handleChange = (e) => {
    setGroupFormData({ ...groupFormData, [e.target.name]: e.target.value });
  };

  // ======================== get all categories
  const getAllCategories = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getGroupCategories(lsUser?.token?.access);

    setGroupCategories(response?.results);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {groupFormData.isModalOpen && (
        <Modal
          msg={groupFormData.displayMessage}
          isError={groupFormData.isError}
        />
      )}
      <Grid
        container
        width={{ xs: "99%", sm: "80%", md: "60%", lg: "40%" }}
        mx="auto"
        rowGap={2}
      >
        <Grid item xs={12} textAlign="center">
          {/* <h2>Create Group</h2> */}
          <h2> {groupFormData.editMode ? "Edit Group" : " Create Group"}</h2>
        </Grid>
        {/*  Name */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="group_name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={groupFormData?.name}
              style={inputStyles}
              placeholder="Enter your group name"
              type="text"
              id="group_name"
            />
          </Stack>
        </Grid>

        {/* Group Phone Code */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="phone_code">Phone Code</label>
            <input
              onChange={handleChange}
              name="phone_code"
              value={groupFormData?.phone_code}
              style={inputStyles}
              className="number-input"
              placeholder="Enter your Group phone code"
              type="number"
              id="phone_code"
            />
          </Stack>
        </Grid>

        {/* Group Phone Number */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="phone_no">Phone Number</label>
            <input
              onChange={handleChange}
              name="phone_no"
              value={groupFormData?.phone_no}
              style={inputStyles}
              className="number-input"
              placeholder="Enter your Group phone number"
              type="number"
              id="phone_no"
            />
          </Stack>
        </Grid>

        {/* Group category list */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="category">Category</label>
            <select
              style={inputStyles}
              onChange={handleChange}
              name="category"
              id="category"
              defaultValue={groupFormData?.category?.type || "select"}
            >
              <option value="select" disabled>
                Select Category
              </option>
              {groupCategories?.map((category) => (
                <option key={category.id} value={category?.id}>
                  {category?.type}
                </option>
              ))}
            </select>
          </Stack>
        </Grid>

        {/* upload Group profile pic */}
        <Grid item xs={12} md={6} p={1}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            columnGap={1}
            alignItems={"center"}
            rowGap={1}
          >
            <ArticleIcon
              sx={{
                color: "#3F51B5",
                padding: "20px",
                borderRadius: "50%",
                backgroundColor: "#F1F3F4",
              }}
              fontSize={"large"}
            />
            <h4>Profile Picture</h4>
            <label htmlFor="profile_pic">
              <input
                onChange={handleProfilePicChange}
                style={{ display: "none" }}
                name="profile_pic"
                id="profile_pic"
                type="file"
                accept="image/*"
              />
              <p
                style={{
                  color: "#3F51B5",
                  cursor: "pointer",
                }}
              >
                Browse file
              </p>
            </label>
          </Stack>
          {groupFormData.profile_pic !== "" && (
            <p>
              uploaded file :{" "}
              {groupprofilepic?.prof_pic || groupFormData?.profile_pic}
            </p>
          )}
        </Grid>
        {/* upload Group cover pic */}
        <Grid item xs={12} md={6} p={1}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            columnGap={1}
            alignItems={"center"}
            rowGap={1}
          >
            <ArticleIcon
              sx={{
                color: "#3F51B5",
                padding: "20px",
                borderRadius: "50%",
                backgroundColor: "#F1F3F4",
              }}
              fontSize={"large"}
            />
            <h4>Cover Picture</h4>
            <label htmlFor="cover_pic">
              <input
                onChange={handleCoverPicChange}
                style={{ display: "none" }}
                name="cover_pic"
                id="cover_pic"
                type="file"
                accept="image/*"
              />
              <p
                style={{
                  color: "#3F51B5",
                  cursor: "pointer",
                }}
              >
                Browse file
              </p>
            </label>
          </Stack>
          {groupFormData.cover_pic !== "" && (
            <p>
              uploaded file :{" "}
              {groupcoverpic.cover_pic || groupFormData?.cover_pic}
            </p>
          )}
        </Grid>
        {/* Group About */}
        <Grid item xs={12} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="group_about">Group About</label>
            <textarea
              onChange={handleChange}
              name="about"
              value={groupFormData?.about}
              style={{
                ...inputStyles,
                height: "100px",
                resize: "none",
              }}
              placeholder="Write about group"
              id="group_about"
            />
          </Stack>
        </Grid>
        {/* Submit button */}
        <Grid item xs={12} p={1}>
          <Button
            onClick={handleSubmit}
            variant={groupFormData.editMode ? "contained" : "outlined"}
            color="info"
          >
            {groupFormData.editMode ? "Update Group" : " Create Group"}
          </Button>
          {/* <Button onClick={handleSubmit} variant="outlined" color="info">
            Create Group
          </Button> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Create;
