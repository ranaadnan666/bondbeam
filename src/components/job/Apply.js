import { Box, Button, Grid, Stack, Hidden } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { applyJob } from "../../utils/helpers/job/job_crud";
import { getSinglejob } from "../../utils/helpers/job/get_all_jobs";
import { useEffect, useState } from "react";
import Modal from "../../components/modal/Modal";
import moment from "moment";
const Apply = (props) => {
  const [newApply, setnewApply] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_no: "",
    applicant_experience: "",
    job_type: "",
    job_prefer: "",
    expected_salary: "",
    last_education: "",
    portfolio_link: "",
    about_yourself: "",
    job_id: props.id,
  });

  // ===================== state for success and error   =====================
  const [showMsg, setShowMsg] = useState({
    isError: false,
    displayMessage: "",
    isModalOpen: false,
  });
  const [selectedresume,setSelectedresume]=useState({resumme:""})
  const [resume, setResume] = useState("");
  const [description, setDescription] = useState({});

  // ===================== handle image   =====================
  const changeHandler = (event) => {
    setResume(event.target.files[0]);
    setSelectedresume({resumme: event.target.files[0].name})
  };

  // ===================== apply on job first check the state it it is empty  =====================

  const applyOnjob = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));

    if (
      newApply.first_name === "" ||
      newApply.last_name === "" ||
      newApply.email === "" ||
      newApply.phone_no === "" ||
      newApply.applicant_experience === "" ||
      newApply.job_prefer === "" ||
      newApply.job_type === "" ||
      newApply.expected_salary === "" ||
      newApply.last_education === "" ||
      newApply.about_yourself === "" ||
      newApply.resume === ""
    ) {
      alert("Please fill all fields");
      return;
    } else {
      const formData = new FormData();
      formData.append("first_name", newApply.first_name);
      formData.append("last_name", newApply.last_name);
      formData.append("email", newApply.email);
      formData.append("phone_no", newApply.phone_no);
      formData.append("applicant_experience", newApply.applicant_experience);
      formData.append("job_prefer", newApply.job_prefer);
      formData.append("job_type", newApply.job_type);
      formData.append("expected_salary", newApply.expected_salary);
      formData.append("last_education", newApply.last_education);
      formData.append("portfolio_link", newApply.portfolio_link);
      formData.append("about_yourself", newApply.about_yourself);
      formData.append("job_id", newApply.job_id);
      formData.append("resume", resume);
      const response = await applyJob(lsUser?.token?.access, formData);

      if (response?.status || response?.status_code === 200) {
        setShowMsg((prev) => {
          return {
            ...prev,
            isError: false,
            displayMessage: "Company Successfully Created",
            isModalOpen: true,
          };
        });
      } else {
        setShowMsg((prev) => {
          return {
            ...prev,
            isError: true,
            displayMessage: "something went wrong",
            isModalOpen: true,
          };
        });
      }

      setnewApply((prev) => {
        return {
          ...prev,
          first_name: "",
          last_name: "",
          email: "",
          phone_no: "",
          applicant_experience: "",
          job_type: "",
          job_prefer: "",
          expected_salary: "",
          last_education: "",
          portfolio_link: "",
          about_yourself: "",
          resume: "",
        };
      });
    }
  };

  // ===================== onchange function  =====================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setnewApply((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };

  // ===================== get single job  =====================

  const getDescription = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getSinglejob(props.id, lsUser?.token?.access);
    setDescription(response.data);
  };

  // ===================== validation   =====================

  const validateEmail = (mail) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(mail);
  };

  useEffect(() => {
    getDescription();
  }, []);
  const inputStyles = {
    border: "none",
    backgroundColor: "#F1F3F4",
    padding: "10px",
    borderRadius: "5px",
  };
  return (
    <>
      {showMsg.isModalOpen && (
        <Modal msg={showMsg.displayMessage} isError={showMsg.isError} />
      )}

      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid silver",
          padding: "20px",
        }}
      >
        <h3>Apply Job</h3>
        <p>Fill the required fields to apply for this job</p>
        <Grid container>
          {/* first name */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="first_name">First Name</label>
              <input
                name="first_name"
                value={newApply.first_name}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter your first name"
                type="text"
                id="first_name"
              />
            </Stack>
          </Grid>
          {/* last name */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="last_name">Last Name</label>
              <input
                name="last_name"
                value={newApply.last_name}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter your last name"
                type="text"
                id="last_name"
              />
            </Stack>
          </Grid>
          {/* email address */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="email">Email Address</label>
              <input
                name="email"
                value={newApply.email}
                onChange={handleChange}
                style={inputStyles}
                placeholder="e.g example@gmail.com"
                type="email"
                id="email"
              />
              {!newApply.email == "" && !validateEmail(newApply.email) && (
                <p style={{ color: "red", textTransform: "lowercase" }}>
                  hint: abc@xyz.com
                </p>
              )}
            </Stack>
          </Grid>
          {/* upload resume */}
          <Grid item xs={12} sm={6} md={4} p={1}>
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
              <Stack direction={"column"} rowGap={1}>
                <h4>Upload Resume/CV</h4>
                {/* <p>Upload your resume to apply on this job</p> */}
              </Stack>
              <label htmlFor="inputFile">
                <input
                  onChange={changeHandler}
                  style={{ display: "none" }}
                  name="resume"
                  id="inputFile"
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
            { resume !=="" && <p>uploaded file : {selectedresume.resumme}</p> }
          </Grid>
          {/* phone number */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="phone">Mobile Number</label>
              <input
                name="phone_no"
                value={newApply.phone_no}
                onChange={handleChange}
                style={inputStyles}
                placeholder="202 555 0144"
                type="number"
                id="phone"
              />
            </Stack>
          </Grid>
          {/* experience */}

          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="experience">
                How many year's experiennce do you have?
              </label>
              <input
                name="applicant_experience"
                value={newApply.applicant_experience}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter the number of years"
                type="number"
                id="experience"
              />
            </Stack>
          </Grid>
          {/* job type */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_type">
                Which Job Type are you looking for?
              </label>
              <select
                name="job_type"
                value={newApply.job_type}
                onChange={handleChange}
                style={inputStyles}
                id="job_type"
              >
                <option value="DEFAULT">Select Job Type</option>
                <option value="day">Day Shift</option>
                <option value="night">Night Shift</option>
              </select>
            </Stack>
          </Grid>
          {/* job preference */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_preference">
                Whick kind of job you prefer?
              </label>
              <select
                name="job_prefer"
                value={newApply.job_prefer}
                onChange={handleChange}
                style={inputStyles}
                id="job_preference"
              >
                <option value="DEFAULT">Select Job preference</option>
                <option value="remote">Remote</option>
                <option value="on_site">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </Stack>
          </Grid>
          {/* salary expectation */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="expected_salary">
                What's your expected sallary?
              </label>
              <input
                name="expected_salary"
                value={newApply.expected_salary}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter the amount in numbers"
                type="number"
                id="expected_salary"
              />
            </Stack>
          </Grid>
          {/* education level */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="education_level">
                What is your highest level of education?
              </label>
              <select
                name="last_education"
                value={newApply.last_education}
                onChange={handleChange}
                style={inputStyles}
                id="education_level"
              >
                <option value="DEFAULT">Select Education level</option>
                <option value="Master's Degree or Higher">
                  Master's Degree or Higher
                </option>
                <option value="Bachelor's Degree">Bachelor's Degree</option>
              </select>
            </Stack>
          </Grid>
          {/* portfolio link */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="portfolio_link">
                Your portfolio link (if any)
              </label>
              <input
                name="portfolio_link"
                value={newApply.portfolio_link}
                onChange={handleChange}
                style={inputStyles}
                placeholder="e.g. https://www.portfolio.com"
                type="text"
                id="portfolio_link"
              />
            </Stack>
          </Grid>
          {/* description */}
          <Grid item xs={12} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="description">Tell us about yourself</label>
              <textarea
                name="about_yourself"
                value={newApply.about_yourself}
                onChange={handleChange}
                style={{
                  ...inputStyles,
                  height: "100px",
                  resize: "none",
                }}
                placeholder="Tell us about yourself in few lines"
                id="description"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} md={4} p={1}>
            <p>You are applying against the following job</p>
            <Stack
              direction="row"
              columnGap={1}
              // justifyContent="space-around"
              p={2}
              sx={{
                border: "1px solid silver",
                borderRadius: "10px",
              }}
            >
              <img
                width="60px"
                height="60px"
                style={{borderRadius:"50%"}}
                src={description?.company?.profile_pic}
                alt=""
              />
              <Stack direction="column" rowGap={1} padding="0 0 0 3rem">
                <Link to={`/job/description/${props.id}`}>
                  <h4>{description?.job_title}</h4>
                </Link>
                <p style={{ maxWidth: "300px" }}>
                  {description?.job_description}
                </p>
                <p>
                  {description?.company?.user?.first_name}{" "}
                  {description?.company?.user?.last_name}
                </p>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  columnGap={1}
                  rowGap={1}
                  alignItems="center"
                >
                  <Stack direction="row" columnGap={1}>
                    <PlaceIcon />
                    <p>{description?.job_location}</p>
                  </Stack>
                  {/* <Hidden mdDown>|</Hidden> */}
                  {description.opening_timing && description.closing_timing ? (
                    <Stack direction="row" columnGap={1}>
                      <AccessTimeIcon />
                      {/* opening_timing */}
                      <p>{description.opening_timing}</p> -
                      <p>{description.closing_timing}</p>
                    </Stack>
                  ) : (
                    <Stack sx={{ height: "22px" }}></Stack>
                  )}
                </Stack>
                <p>{moment(description?.updated_at).fromNow()}</p>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} p={1}>
            <Button onClick={applyOnjob} variant="contained" color="info">
              Apply
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Apply;
