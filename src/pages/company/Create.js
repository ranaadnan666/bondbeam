import { Button, Grid, Stack, Box, Typography } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
// import Resizer from "react-image-file-resizer";
import { useEffect, useState, useRef } from "react";
import {
    createCompany,
    getCompanyCategories,
    editCompanyDetails
} from "../../utils/helpers/company/company_crud";
import Modal from "../../components/modal/Modal";

// my code ................
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from "react-places-autocomplete";
import { useAppContext } from "../../context/app-context";

const Create = () => {
    // state for company create and edit
    const { companyFormData, setCompanyFormData } = useAppContext();
    console.log("data", companyFormData)
    // const [resizedProfileImages, setResizedProfileImages] = useState([]);
    // const [resizedCoverImages, setResizedCoverImages] = useState([]);
    const [companyCategories, setCompanyCategories] = useState([]);
    const [selectedprof_pic, setSelectedprof_pic] = useState({ profile_pic: "" });
    const [selectedcov_pic, setSelectedcov_pic] = useState({ cover_pic: "" });
    const locationRef = useRef();
    console.log("locationRef", locationRef?.current?.value);
    // ======================== input styles
    const inputStyles = {
        border: "none",
        backgroundColor: "#F1F3F4",
        padding: "10px",
        borderRadius: "5px",
    };

    const [address, setAddress] = useState(companyFormData?.editMode ? companyFormData?.address : "");
    // const [setcoordinates] = useState({
    //   lat: null,
    //   lng: null,
    // });
    const handleSelect = async (value) => {
        // console.log("value", value);
        const result = await geocodeByAddress(value);
        const li = await getLatLng(result[0]);
        setAddress(value);
        // setcoordinates(li);
    };

    console.log("companyFormData in Edit page", companyFormData);
    console.log(
        "companyFormData.profile_pic",
        companyFormData?.profile_pic[0]?.name
    );
    console.log('type of companyFormData.profile_pic', typeof companyFormData?.profile_pic);
    if (typeof companyFormData?.profile_pic === "string") {
        console.log("yes this is string");
    } else { console.log("this is something else") }
    // ======================== submit form
    const handleSubmit = async () => {
        const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
        // check if all fields are filled
        if (
            companyFormData.name === "" ||
            companyFormData.headline === "" ||
            companyFormData.mail === "" ||
            companyFormData.weblink === "" ||
            companyFormData.shifts === "" ||
            companyFormData.category === "" ||
            companyFormData.description === "" ||
            // companyFormData.address === "" ||
            companyFormData.employees === "" ||
            // companyFormData.profile_pic === "" ||
            // companyFormData.cover_pic === "" ||
            companyFormData.about === "" ||
            companyFormData.opening_time === "" ||
            companyFormData.closing_time === ""
        ) {
            alert("Please fill all fields");
            return;
        } else {
            console.log("create company object: ", companyFormData);
            // make form data and append all data of companyFormData state
            const formData = new FormData();
            formData.append("company_name", companyFormData.name);
            formData.append("company_description", companyFormData.description);
            formData.append("headline", companyFormData.headline);
            formData.append("company_mail", companyFormData.mail);
            formData.append("web_link", companyFormData.weblink);
            formData.append("working_shift", companyFormData.shifts);
            formData.append("category", companyFormData.category);
            formData.append("company_address", locationRef.current.value);
            formData.append("company_employees", companyFormData.employees);
            formData.append("company_about", companyFormData.about);
            formData.append("opening_timing", companyFormData.opening_time);
            formData.append("closing_timing", companyFormData.closing_time);
            // formData.append("company_address", address);
            // append profile pic
            typeof companyFormData?.profile_pic[0] !== "undefined" && formData.append(
                "profile_pic",
                companyFormData?.profile_pic[0]
                // companyFormData.profile_pic[0]?.name
                //   ? companyFormData.profile_pic[0]?.name
                //   : null
            );
            // for (let i = 0; i < companyFormData.profile_pic?.length; i++) {
            //   formData.append(
            //     "profile_pic",
            //     companyFormData.profile_pic[i],
            //     companyFormData.profile_pic[i].name
            //       ? companyFormData.profile_pic[i].name
            //       : null
            //   );
            // }
            // append cover pic
            typeof companyFormData?.cover_pic[0] !== "undefined" && formData.append(
                "cover_pic",
                companyFormData.cover_pic[0]
                // companyFormData.cover_pic[0]?.name
                //   ? companyFormData.cover_pic[0]?.name
                //   : null
            );
            // for (let i = 0; i < companyFormData.cover_pic?.length; i++) {
            //   formData.append(
            //     "cover_pic",
            //     companyFormData.cover_pic[i],
            //     companyFormData.cover_pic[i].name
            //       ? companyFormData.cover_pic[i].name
            //       : null
            //   );
            // }
            // call create company function
            const response = companyFormData.editMode ? 
            await editCompanyDetails(lsUser?.token?.access, companyFormData?.id, formData) : 
            await createCompany(lsUser?.token?.access, formData);
            if (response?.status || response?.status_code === 200) {
                console.log("create company response: ", response);
                setCompanyFormData((prev) => {
                    return {
                        ...prev,
                        isError: false,
                        displayMessage: response?.msg,
                        isModalOpen: true,
                    };
                });
                // setAddress("");
            } else {

                setCompanyFormData((prev) => {
                    return {
                        ...prev,
                        isError: true,
                        displayMessage: response?.msg,
                        isModalOpen: true,
                    };
                });
                // setAddress("");
            }
        }
    };
    // ======================== handle change
    const handleChange = (e) => {
        setCompanyFormData({ ...companyFormData, [e.target.name]: e.target.value });
    };
    // ======================== Image Resizing and Conversion
    // const resizeFile = (file) =>
    //   new Promise((resolve) => {
    //     Resizer.imageFileResizer(
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
        setCompanyFormData({ ...companyFormData, profile_pic: e.target.files });
        setSelectedprof_pic({ profile_pic: e.target.files[0].name });

        // handleProfilePicResize(e.target.files);
    };
    // display filename

    const handleCoverPicChange = (e) => {
        setCompanyFormData({ ...companyFormData, cover_pic: e.target.files });
        setSelectedcov_pic({ cover_pic: e.target.files[0].name });
        // handleCoverPicResize(e.target.files);
    };

    // ======================== get all categories
    const getAllCategories = async () => {
        const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
        const response = await getCompanyCategories(lsUser?.token?.access);
        console.log("all categories response: ", response?.results);
        setCompanyCategories(response?.results);
    };

    //  Validation
    const validateEmail = (mail) => {
        const regex = /^\S+@\S+\.\S+$/;
        return regex.test(mail);
    };
    const validatewebLink = (web_link) => {
        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
        return regex.test(web_link);
    };
    useEffect(() => {
        getAllCategories();
    }, []);

    return (
        <>
            {companyFormData.isModalOpen && (
                <Modal
                    msg={companyFormData.displayMessage}
                    isError={companyFormData.isError}
                />
            )}
            {/* make input fields for  name,  description,  address,  about,  employees, cover_pic, profile_pic, category and then make submit button at the end of form */}
            <Grid
                container
                width={{ xs: "99%", sm: "80%", md: "60%", lg: "40%" }}
                mx="auto"
                rowGap={2}
            >
                <Grid item xs={12} textAlign="center">
                    <h2>{companyFormData.editMode ? "Update" : "Create"} Company</h2>
                </Grid>
                {/* Company Name */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="name">Name</label>
                        <input
                            name="name"
                            value={companyFormData.name}
                            onChange={handleChange}
                            style={inputStyles}
                            placeholder="Enter your company name"
                            type="text"
                            id="name"
                        />
                    </Stack>
                </Grid>

                {/* Company headline */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="headline">Headline</label>
                        <input
                            name="headline"
                            value={companyFormData.headline}
                            onChange={handleChange}
                            style={inputStyles}
                            placeholder="Enter your company headline"
                            type="text"
                            id="headline"
                        />
                    </Stack>
                </Grid>
                {/* Company mail */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="mail">Company Email</label>
                        <input
                            name="mail"
                            value={companyFormData.mail}
                            onChange={handleChange}
                            style={inputStyles}
                            placeholder="Enter your company e-mail"
                            type="email"
                            id="mail"
                        />
                        {!companyFormData.mail == "" &&
                            !validateEmail(companyFormData.mail) && (
                                <p style={{ color: "red", textTransform: "lowercase" }}>
                                    hint: abc@xyz.com
                                </p>
                            )}
                    </Stack>
                </Grid>
                {/* Company web-link */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="weblink">Company Web-Link</label>
                        <input
                            name="weblink"
                            value={companyFormData.weblink}
                            onChange={handleChange}
                            style={inputStyles}
                            placeholder="e.g. https://www.example.com"
                            type="text"
                            id="weblink"
                        />
                        {!companyFormData.weblink == "" &&
                            !validatewebLink(companyFormData.weblink) && (
                                <p style={{ color: "red", textTransform: "lowercase" }}>
                                    hint: https://www.xyz.com
                                </p>
                            )}
                    </Stack>
                </Grid>
                {/* Company shifts in options day & night */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="shifts">Shifts</label>
                        <select
                            style={inputStyles}
                            onChange={handleChange}
                            name="shifts"
                            id="shifts"
                            defaultValue={companyFormData.shifts}
                        >
                            <option value="select" disabled>
                                Select Day/Night shifts
                            </option>
                            <option value="day">Day</option>
                            <option value="night">Night</option>
                        </select>
                    </Stack>
                </Grid>
                {/* Company category list */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="category">Category</label>
                        <select
                            style={inputStyles}
                            onChange={handleChange}
                            name="category"
                            id="category"
                            defaultValue={companyFormData.category}
                        >
                            <option value="select" disabled>
                                Select Category
                            </option>
                            {companyCategories?.map((category) => (
                                <option key={category.id} value={category?.id}>
                                    {category?.category}
                                </option>
                            ))}
                        </select>
                    </Stack>
                </Grid>

                {/* Company Address */}
                {/* <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="address">Address</label>
            <input
              name="address"
              value={companyFormData.address}
              onChange={handleChange}
              style={inputStyles}
              placeholder="Enter your company address"
              type="text"
              id="address"
            />
          </Stack>
        </Grid> */}

                <Grid item xs={12} p={1}>
                    <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                    >
                        {({
                            getInputProps,
                            suggestions,
                            getSuggestionItemProps,
                            loading,
                        }) => (
                            <>
                                <Grid item xs={12} md={6} p={1}></Grid>
                                <Stack direction={"column"} rowGap={1}>
                                    <label htmlFor="address">Address</label>
                                    <input
                                        name="address"
                                        // value={companyFormData.address}
                                        // onChange={handleChange}
                                        style={inputStyles}
                                        ref={locationRef}
                                        defaultValue={"localhost"}
                                        // defaultValue={companyFormData.address}

                                        placeholder="Company Location"
                                        type="text"
                                        {...getInputProps({
                                            placeholder: "Search Places ...",
                                            className: "location-search-input",
                                        })}
                                    />
                                </Stack>
                                <Grid />
                                <Box
                                    className="autocomplete-dropdown-container"
                                    sx={{ backgroundColor: "#F1F3F4", margin: "0.6rem" }}
                                >
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion, index) => {
                                        const className = suggestion.active
                                            ? "suggestion-item--active"
                                            : "suggestion-item";
                                        const style = suggestion.active
                                            ? { backgroundColor: "white", cursor: "pointer" }
                                            : { backgroundColor: "#F1F3F4", cursor: "pointer" };
                                        return (
                                            <Box
                                                key={index}
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
                            </>
                        )}
                    </PlacesAutocomplete>
                </Grid>

                {/* Company Employees */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="employees">Employees</label>
                        <input
                            name="employees"
                            value={companyFormData.employees}
                            onChange={handleChange}
                            style={inputStyles}
                            placeholder="Enter your company employees"
                            type="number"
                            id="employees"
                        />
                    </Stack>
                </Grid>
                {/* Company opening time */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="opening_time">Opening Time</label>
                        <input
                            name="opening_time"
                            value={companyFormData.opening_time}
                            onChange={handleChange}
                            style={inputStyles}
                            placeholder="Enter opening time"
                            type="time"
                            id="opening_time"
                        />
                    </Stack>
                </Grid>
                {/* Company closing time */}
                <Grid item xs={12} md={6} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="closing_time">Closing Time</label>
                        <input
                            name="closing_time"
                            value={companyFormData.closing_time}
                            onChange={handleChange}
                            style={inputStyles}
                            placeholder="Enter closing time"
                            type="time"
                            id="closing_time"
                        />
                    </Stack>
                </Grid>
                {/* upload company profile pic */}
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
                        <label htmlFor="inputProfilePic">
                            <input
                                style={{ display: "none" }}
                                name="profile_pic"
                                onChange={handleProfilePicChange}
                                id="inputProfilePic"
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
                    {companyFormData.profile_pic !== "" && (
                        <p>
                            uploaded file :{" "}
                            {companyFormData?.profile_pic[0]?.name ||
                                companyFormData?.profile_pic}
                        </p>
                    )}
                </Grid>
                {/* upload company cover pic */}
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
                        <label htmlFor="inputCoverPic">
                            <input
                                style={{ display: "none" }}
                                name="cover_pic"
                                onChange={handleCoverPicChange}
                                id="inputCoverPic"
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
                    {companyFormData.cover_pic !== "" && (
                        <p>
                            uploaded file :{" "}
                            {companyFormData?.cover_pic[0]?.name ||
                                companyFormData?.cover_pic}
                        </p>
                    )}
                </Grid>
                {/* Company About */}
                <Grid item xs={12} p={1}>
                    <Stack direction={"column"} rowGap={1}>
                        <label htmlFor="about">About</label>
                        <textarea
                            name="about"
                            value={companyFormData.about}
                            onChange={handleChange}
                            style={{
                                ...inputStyles,
                                height: "100px",
                                resize: "none",
                            }}
                            placeholder="Write about company"
                            id="about"
                        />
                    </Stack>
                </Grid>
                {/* Submit button */}
                <Grid item xs={12} p={1}>
                    <Button
                        onClick={handleSubmit}
                        variant={companyFormData.editMode ? "contained" : "outlined"}
                        color="info"
                    >
                        {companyFormData.editMode ? "Update Company" : "Create Company"}
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

export default Create;
