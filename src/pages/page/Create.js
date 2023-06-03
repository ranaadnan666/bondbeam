import React, { useEffect, useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import {
  createPage,
  getPageCategories,
  updatePageDetails,
} from "../../utils/helpers/page/page_crud";
import FileResizer from "react-image-file-resizer";
import Modal from "../../components/modal/Modal";
import { useAppContext } from "../../context/app-context";

const Create = () => {
  // state for page form data (create, update)
  const { pageFormData, setPageFormData } = useAppContext();
  const [resizedProfileImages, setResizedProfileImages] = useState([]);
  const [resizedCoverImages, setResizedCoverImages] = useState([]);
  const [pageCategories, setPageCategories] = useState([]);

  // console.log("pageFormData in Create File", pageFormData?.category?.id);

  // console.log("pageFormData in Create File", pageFormData);

  const inputStyles = {
    border: "none",
    backgroundColor: "#F1F3F4",
    padding: "10px",
    borderRadius: "5px",
  };

  // ======================== submit form
  const handleSubmit = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const pageId = pageFormData.id;
    // check if all fields are filled
    if (
      pageFormData.name === "" ||
      pageFormData.phone_no === "" ||
      pageFormData.phone_code === "" ||
      pageFormData.category === "" ||
      // pageFormData.profile_pic === "" ||
      // pageFormData.cover_pic === "" ||
      pageFormData.location === "" ||
      pageFormData.web_link === "" ||
      pageFormData.about === ""
    ) {
      alert("Please fill all fields");
      return;
    } else {
      // make form data and append all data of pageFormData state
      const formData = new FormData();
      formData.append("page_name", pageFormData.name);
      formData.append("phone_code", pageFormData.phone_code);
      formData.append("phone_no", pageFormData.phone_no);
      formData.append("category", pageFormData.category.id);
      formData.append("page_about", pageFormData.about);
      formData.append("location", pageFormData.location);
      formData.append("web_link", pageFormData.web_link);

      // append profile pic
      for (let i = 0; i < pageFormData.profile_pic?.length; i++) {
        formData.append(
          "profile_pic",
          pageFormData.profile_pic[i],
          pageFormData.profile_pic[i].name
            ? pageFormData.profile_pic[i].name
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
      for (let i = 0; i < pageFormData.cover_pic?.length; i++) {
        formData.append(
          "cover_pic",
          pageFormData.cover_pic[i],
          pageFormData.cover_pic[i].name ? pageFormData.cover_pic[i].name : null
        );
      }
      // for (let i = 0; i < resizedCoverImages?.length; i++) {
      //   formData.append(
      //     "cover_pic",
      //     resizedCoverImages[i],
      //     resizedCoverImages[i].name ? resizedCoverImages[i].name : null
      //   );
      // }
      // call create page function

      const response = pageFormData.editMode
        ? await updatePageDetails(lsUser?.token?.access, pageId, formData)
        : await createPage(lsUser?.token?.access, formData);

      console.log("response of page update:", response);
      if (response?.status || response?.status_code === 200) {
        setPageFormData((prev) => {
          return {
            ...prev,
            isError: false,
            displayMessage: pageFormData.editMode
              ? "Page Successfully Updated"
              : " Page Successfully Created",
            isModalOpen: true,
          };
        });
      } else {
        setPageFormData((prev) => {
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
  const resizeFile = (file) =>
    new Promise((resolve) => {
      FileResizer.imageFileResizer(
        file,
        480,
        480,
        "webp",
        70,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  // ======================== Conversion base64
  const dataURIToBlob = (dataURI) => {
    const splitDataURI = dataURI.split(",");
    const byteString =
      splitDataURI[0].indexOf("base64") >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  };
  // ========================== handle resize for profile images
  const handleProfilePicResize = async (allImages) => {
    for (let i = 0; i < allImages?.length; i++) {
      const file = allImages[i];

      const image = await resizeFile(file);
      const newFile = dataURIToBlob(image);
      setResizedProfileImages((prev) => {
        return [...prev, newFile];
      });
    }
  };
  // ========================== handle resize for cover images
  const handleCoverPicResize = async (allImages) => {
    for (let i = 0; i < allImages?.length; i++) {
      const file = allImages[i];

      const image = await resizeFile(file);
      const newFile = dataURIToBlob(image);
      setResizedCoverImages((prev) => {
        return [...prev, newFile];
      });
    }
  };

  const [selectedprof_pic, setSelectedprof_pic] = useState({ profile_pic: "" });
  const [selectedcov_pic, setSelectedcov_pic] = useState({ cover_pic: "" });
  // ======================== handle file change
  const handleProfilePicChange = (e) => {
    setPageFormData({
      ...pageFormData,
      [e.target.name]: e.target.files,
    });
    setSelectedprof_pic({ profile_pic: e.target.files[0].name });
    // handleProfilePicResize(e.target.files);
  };
  const handleCoverPicChange = (e) => {
    setPageFormData({
      ...pageFormData,
      [e.target.name]: e.target.files,
    });
    setSelectedcov_pic({ cover_pic: e.target.files[0].name });
    // handleCoverPicResize(e.target.files);
  };

  // ======================== handle change
  const handleChange = (e) => {
    setPageFormData({ ...pageFormData, [e.target.name]: e.target.value });
  };

  // ======================== get all categories
  const getAllCategories = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getPageCategories(lsUser?.token?.access);

    setPageCategories(response?.results);
  };
  // Validation
  const validatewebLink = (web_link) => {
    const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
    return regex.test(web_link);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      {pageFormData.isModalOpen && (
        <Modal
          msg={pageFormData.displayMessage}
          isError={pageFormData.isError}
        />
      )}
      <Grid
        container
        width={{ xs: "99%", sm: "80%", md: "60%", lg: "40%" }}
        mx="auto"
        rowGap={2}
      >
        <Grid item xs={12} textAlign="center">
          {/* <h2>Create Page</h2> */}
          <h2> {pageFormData.editMode ? "Edit Page" : " Create Page"}</h2>
        </Grid>
        {/* Page Name */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="page_name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              value={pageFormData?.name}
              style={inputStyles}
              placeholder="Enter your page name"
              type="text"
              id="page_name"
            />
          </Stack>
        </Grid>

        {/* Page category list */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="category">Category</label>
            <select
              style={inputStyles}
              onChange={handleChange}
              name="category"
              id="category"
              defaultValue={pageFormData?.category?.type || "select"}
            >
              <option value="select" disabled>
                Select Category
              </option>
              {pageCategories?.map((category) => (
                <option key={category.id} value={category?.id}>
                  {console.log(category?.id)}
                  {category?.type}
                </option>
              ))}
            </select>
          </Stack>
        </Grid>
        {/* Page Location */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="location">Location</label>
            <input
              onChange={handleChange}
              name="location"
              value={pageFormData?.location}
              style={inputStyles}
              placeholder="Enter your page location"
              type="text"
              id="location"
            />
          </Stack>
        </Grid>
        {/* page web link */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="web_link">Web link</label>
            <input
              onChange={handleChange}
              name="web_link"
              value={pageFormData?.web_link}
              style={inputStyles}
              placeholder="Enter your page web link"
              type="text"
              id="web_link"
            />
            {!pageFormData.web_link == "" &&
              !validatewebLink(pageFormData.web_link) && (
                <p style={{ color: "red", textTransform: "lowercase" }}>
                  hint: https://www.xyz.com
                </p>
              )}
          </Stack>
        </Grid>
        {/* Page Phone Code */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="phone_code">Phone Code</label>
            <input
              onChange={handleChange}
              name="phone_code"
              value={pageFormData?.phone_code}
              style={inputStyles}
              className="number-input"
              placeholder="Enter your page phone code"
              type="number"
              id="phone_code"
            />
          </Stack>
        </Grid>

        {/* Page Phone Number */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="phone_no">Phone Number</label>
            <input
              onChange={handleChange}
              name="phone_no"
              value={pageFormData?.phone_no}
              style={inputStyles}
              className="number-input"
              placeholder="Enter your page phone number"
              type="number"
              id="phone_no"
            />
          </Stack>
        </Grid>

        {/* upload page profile pic */}
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
          {pageFormData.profile_pic !== "" && (
            <p>
              uploaded file :{" "}
              {selectedprof_pic.profile_pic || pageFormData?.profile_pic}
            </p>
          )}
        </Grid>
        {/* upload page cover pic */}
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
          {pageFormData.cover_pic !== "" && (
            <p>
              uploaded file :{" "}
              {selectedcov_pic.cover_pic || pageFormData?.cover_pic}
            </p>
          )}
        </Grid>
        {/* Page About */}
        <Grid item xs={12} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="page_about">Page About</label>
            <textarea
              onChange={handleChange}
              name="about"
              value={pageFormData?.about}
              style={{
                ...inputStyles,
                height: "100px",
                resize: "none",
              }}
              placeholder="Write about page"
              id="page_about"
            />
          </Stack>
        </Grid>
        {/* Submit button */}
        <Grid item xs={12} p={1}>
          <Button
            onClick={handleSubmit}
            variant={pageFormData.editMode ? "contained" : "outlined"}
            color="info"
          >
            {pageFormData.editMode ? "Update Page" : " Create Page"}
          </Button>
          {/* <Button onClick={handleSubmit} variant="outlined" color="info">
            Create Page
          </Button> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Create;
