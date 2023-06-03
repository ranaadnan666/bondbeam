import { Box, Button, Grid, Stack, Hidden } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { postJobs } from "../../utils/helpers/job/job_crud";
import CloseIcon from "@mui/icons-material/Close";
import { getSinglejob } from "../../utils/helpers/job/get_all_jobs";
import { useAppContext } from "../../context/app-context";
import { updateJob } from "../../utils/helpers/job/job_crud";
import Modal from "../../components/modal/Modal";
const PostNewJob = () => {
  const { editmode, setEditmode } = useAppContext();
  const [related_skills, setRelated_skills] = useState([]);
  const { companyId } = useParams();
  const [postjob, setPost] = useState({
    company_id: companyId,
    job_title: "",
    department: "",
    job_type: "",
    required_experience: "",
    vacancy_count: "",
    job_location: "",
    job_prefer: "",
    job_description: "",
    max_salary: "",
    hiring_period: "",
    opening_timing: "",
    closing_timing: "",
  });

  const [skil, setSkil] = useState("");

  // ===================== modal state   =====================

  const [showMsg, setShowMsg] = useState({
    isError: false,
    displayMessage: "",
    isModalOpen: false,
  });

  // ===================== onchange function   =====================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setPost((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };

  // ===================== create a job  first check condition  =====================
  const createNewPost = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));

    if (
      postjob.job_title === "" ||
      postjob.job_prefer === "" ||
      postjob.job_type === "" ||
      postjob.job_description === "" ||
      postjob.department === "" ||
      postjob.job_prefer === "" ||
      postjob.job_location === "" ||
      postjob.required_experience === "" ||
      postjob.vacancy_count === "" ||
      postjob.max_salary === "" ||
      postjob.hiring_period === "" ||
      postjob.opening_timing === "" ||
      postjob.closing_timing === ""
    ) {
      alert("Please fill all fields");
      return;
    } else {
      const formData = new FormData();
      formData.append("related_skills", JSON.stringify(related_skills));
      formData.append("job_title", postjob.job_title);
      formData.append("company_id", postjob.company_id);
      formData.append("department", postjob.department);
      formData.append("job_type", postjob.job_type);
      formData.append("job_prefer", postjob.job_prefer);
      formData.append("job_description", postjob.job_description);
      formData.append("job_location", postjob.job_location);
      formData.append("required_experience", postjob.required_experience);
      formData.append("vacancy_count", postjob.vacancy_count);
      formData.append("max_salary", postjob.max_salary);
      formData.append("hiring_period", postjob.hiring_period);
      formData.append("opening_timing", postjob.opening_timing);
      formData.append("closing_timing", postjob.closing_timing);

      const response = await postJobs(formData, lsUser?.token?.access);

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

      setPost((prev) => {
        return {
          ...prev,
          job_title: "",
          department: "",
          job_type: "",
          required_experience: "",
          vacancy_count: "",
          job_location: "",
          job_prefer: "",
          job_description: "",
          max_salary: "",
          hiring_period: "",
          opening_timing: "",
          closing_timing: "",
        };
      });
      setRelated_skills([]);
    }
  };

  // ===================== add skill in array  =====================

  const addSkill = () => {
    if (skil === "") {
      return;
    } else {
      setRelated_skills((pre) => [...pre, skil]);
      setSkil("");
    }
  };

  // ===================== remove skill from array  =====================

  const removeElement = (index) => {
    const newFruits = related_skills.filter((_, i) => i !== index);
    setRelated_skills(newFruits);
  };

  // ===================== edit Jobs  =====================
  const updatesingleJob = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await updateJob(companyId, postjob, lsUser?.token?.access);

    if (response?.status || response?.status_code === 200) {
      setShowMsg((prev) => {
        return {
          ...prev,
          isError: false,
          displayMessage: "Company Successfully Updated",
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
    setEditmode(false);
  };

  // ===================== get single job  =====================

  const getJob = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getSinglejob(companyId, lsUser?.token?.access);
    const {
      job_title,
      job_description,
      job_location,
      job_prefer,
      job_type,
      department,
      related_skills,
      vacancy_count,
      required_experience,
      max_salary,
      hiring_period,
      opening_timing,
      closing_timing,
    } = response?.data;

    setPost((prev) => {
      return {
        ...prev,
        job_title,
        job_description,
        job_location,
        job_prefer,
        job_type,
        department,
        related_skills,
        vacancy_count,
        max_salary,
        hiring_period,
        opening_timing,
        required_experience,
        closing_timing,
      };
    });
  };

  // =====================  if user press edit button then code run  =====================

  useEffect(() => {
    editmode ? getJob() : console.log("not edit mode");
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
        <h3>Post a New Job</h3>
        <p>Put the job details to post it</p>
        <Grid container>
          {/* upload company logo */}
          {/* <Grid item xs={12} sm={6} md={4} p={1}>
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
              <h4>Company Logo</h4>
              <p>Upload the logo of the company</p>
            </Stack>
            <label htmlFor="inputFile">
              <input
                style={{ display: "none" }}
                name="inputFile"
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
        </Grid> */}
          {/* job title */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_title">Job title</label>
              <input
                name="job_title"
                value={postjob.job_title}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter the job title (e.g. position in company)"
                type="text"
                id="job_title"
              />
            </Stack>
          </Grid>
          {/* department */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="department">Department</label>
              <input
                name="department"
                value={postjob.department}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Department of the job (e.g. Construction)"
                type="text"
                id="department"
              />
            </Stack>
          </Grid>
          {/* job type */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_type">
                Job type (e.g. full-time, part-time, contract)
              </label>
              <select
                style={inputStyles}
                value={postjob.job_type}
                name="job_type"
                onChange={handleChange}
                id="job_type"
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Select Job Type
                </option>
                <option value="full_time">Full Time</option>
                <option value="part_time">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </Stack>
          </Grid>
          {/* job preference */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_preference">Job you prefer?</label>
              <select
                style={inputStyles}
                name="job_prefer"
                value={postjob.job_prefer}
                onChange={handleChange}
                id="job_preference"
                defaultValue={"DEFAULT"}
              >
                <option value="DEFAULT" disabled>
                  Select Job preference
                </option>
                <option value="remote">Remote</option>
                <option value="on_site">On-site</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </Stack>
          </Grid>
          {/* number of positions */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="positions">No. of Positions</label>
              <input
                name="vacancy_count"
                value={postjob.vacancy_count}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Total no. of vacancies (i.e. 3, 5, 10 etc.)"
                type="positions"
                id="positions"
              />
            </Stack>
          </Grid>

          {/* expected salary */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="expected_salary">
                Expected Salary (per month)
              </label>
              <input
                name="max_salary"
                value={postjob.max_salary}
                onChange={handleChange}
                style={inputStyles}
                placeholder="$1000/-"
                type="text"
                id="expected_salary"
              />
            </Stack>
          </Grid>
          {/* experience */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="experience">Year's of experiennce</label>
              <input
                name="required_experience"
                value={postjob.required_experience}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter years of experience you require"
                type="text"
                id="experience"
              />
            </Stack>
          </Grid>
          {/* hiring periods*/}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="experience">Hiring Periods</label>
              <input
                name="hiring_period"
                value={postjob.hiring_period}
                onChange={handleChange}
                style={inputStyles}
                placeholder="Enter hiring periods"
                type="text"
                id="experience"
              />
            </Stack>
          </Grid>

          {/* job location */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_location">Job Location</label>
              <input
                name="job_location"
                value={postjob.job_location}
                onChange={handleChange}
                style={inputStyles}
                placeholder="13 Main Street, New York, NY 10001"
                type="text"
                id="job_location"
              />
            </Stack>
          </Grid>

          {/* opping time  */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_location">Opening Time</label>
              <input
                name="opening_timing"
                value={postjob.opening_timing}
                onChange={handleChange}
                style={inputStyles}
                placeholder="select time"
                type="time"
                id="job_location"
              />
            </Stack>
          </Grid>

          {/* closing time  */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="job_location">Closing Time</label>
              <input
                name="closing_timing"
                value={postjob.closing_timing}
                onChange={handleChange}
                style={inputStyles}
                placeholder="select time"
                type="time"
                id="job_location"
              />
            </Stack>
          </Grid>
          {/* hiring manager */}
          {/* <Grid item xs={12} sm={6} md={4} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="hiring_manager">Hiring manager</label>
            <select
              style={inputStyles}
              name="hiring_manager"
              id="hiring_manager"
              defaultValue={"DEFAULT"}
            >
              <option value="DEFAULT" disabled>
                Select hiring manager
              </option>
              <option value="day">Wendy Devis Byrde</option>
              <option value="night">John Doe</option>
            </select>
          </Stack>
        </Grid> */}
          {/* add skills */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="skills">Add Skills</label>

              <input
                name="skil"
                value={skil}
                style={inputStyles}
                placeholder="Enter Skill here"
                type="text"
                onChange={(e) => {
                  setSkil(e.target.value);
                }}
              />
              <Button
                onClick={addSkill}
                id="skills"
                variant="contained"
                endIcon={<AddIcon />}
              >
                Add
              </Button>
            </Stack>
          </Grid>
          {/* preview skills */}
          <Grid item xs={12} sm={6} md={4} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="skills">Preview Skills</label>
              <Grid container rowGap={1} columnGap={1}>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  {related_skills?.map((item, index) => {
                    return (
                      <>
                        <Stack
                          key={index}
                          direction="row"
                          sx={{
                            backgroundColor: "lightgray",
                            borderRadius: "5px",
                            padding: "2px",
                            fontSize: "1rem",
                            m: "5px",
                          }}
                        >
                          <p>{item}</p>

                          <CloseIcon
                            onClick={() => removeElement(index)}
                            sx={{
                              marginTop: "-5px",
                              marginLeft: "10px",
                              width: "20px",
                              cursor: "pointer",
                              "&:hover": {
                                color: "red",
                              },
                            }}
                          />
                        </Stack>
                      </>
                    );
                  })}
                </Box>
                {/* <Grid
                item
                sx={{
                  backgroundColor: "silver",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                html
              </Grid>
              <Grid
                item
                sx={{
                  backgroundColor: "silver",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                css
              </Grid>
              <Grid
                item
                sx={{
                  backgroundColor: "silver",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                javascript
              </Grid> */}
              </Grid>
            </Stack>
          </Grid>
          {/* job description */}
          <Grid item xs={12} p={1}>
            <Stack direction={"column"} rowGap={1}>
              <label htmlFor="description">Job Description</label>
              <textarea
                name="job_description"
                value={postjob.job_description}
                onChange={handleChange}
                style={{
                  ...inputStyles,
                  height: "100px",
                  resize: "none",
                }}
                placeholder="Description of the job"
                id="description"
              />
            </Stack>
          </Grid>
          {/* post button */}
          <Grid item xs={12} p={1}>
            {editmode ? (
              <Button
                onClick={updatesingleJob}
                variant="contained"
                color="info"
              >
                Edit Job
              </Button>
            ) : (
              <Button onClick={createNewPost} variant="contained" color="info">
                Post Job
              </Button>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default PostNewJob;
