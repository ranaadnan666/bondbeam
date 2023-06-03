import { Button, Stack, Hidden, Grid } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ArticleIcon from "@mui/icons-material/Article";
import { Link, useParams } from "react-router-dom";
import { getSinglejob } from "../../utils/helpers/job/get_all_jobs";
import moment from "moment";
import { useEffect, useState } from "react";
const Description = (props) => {
  const [description, setDescription] = useState({});

  // ===================== get description od single job   =====================

  const getDescription = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getSinglejob(props.id, lsUser?.token?.access);
    setDescription(response.data);
  };

  useEffect(() => {
    getDescription();
  }, []);
  return (
    <Stack
      direction={"column"}
      rowGap={1}
      p={1}
      sx={{
        backgroundColor: "#fff",
        borderRadius: "10px",
        border: "1px solid silver",
      }}
    >
      <Stack p={1} direction="column" rowGap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <h4>{description.company?.company_name}</h4>
          <Stack direction={"row"} columnGap={1} alignItems={"center"}>
            <Button variant="contained">Follow</Button>
            <MoreVertIcon />
          </Stack>
        </Stack>
        <p style={{ maxWidth: "800px" }}>{description.company?.headline}</p>
        <p style={{ color: "blue" }}>
          {description?.company?.user?.first_name}{" "}
          {description?.company?.user?.last_name}
        </p>
        <Stack
          direction={{ xs: "column", lg: "row" }}
          alignItems={{ xs: "flex-start", lg: "center" }}
          rowGap={1}
          columnGap={1}
        >
          <Stack direction="row" alignItems="center" columnGap={1}>
            <PlaceIcon />

            <p>{description?.job_location}</p>
          </Stack>

          <Hidden lgDown>|</Hidden>

          <Stack direction="row" columnGap={1} alignItems="center">
            <AccessTimeIcon />

            <p>
              {description?.opening_timing} to {description?.closing_timing}
            </p>
          </Stack>
        </Stack>
        <Stack direction={{ xs: "column", md: "row" }} columnGap={1} rowGap={1}>
          <Link style={{ textDecoration: "none" }} to="/job/apply/12">
            <Button
              variant="contained"
              color="info"
              sx={{
                width: "fit-content",
              }}
            >
              Apply Now
            </Button>
          </Link>
          <Button
            variant="outlined"
            color="info"
            sx={{
              width: "fit-content",
            }}
          >
            Save Job
          </Button>
        </Stack>
        <p>{moment(description?.updated_at).fromNow()}</p>
      </Stack>
      <hr />
      <Grid container>
        <Grid item xs={12} md={9} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <h4>Job Description</h4>
            <p style={{ textAlign: "justify" }}>
              {description?.job_description}
            </p>
            <ul style={{ paddingLeft: "40px" }}>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
            </ul>
            <h4>What we require from you?</h4>
            <p style={{ textAlign: "justify" }}>
              {description?.company?.company_about}
            </p>
            <ul style={{ paddingLeft: "40px" }}>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quae.
              </li>
            </ul>
          </Stack>
        </Grid>
        <Grid item xs={12} md={3} p={1} sx={{ border: "1px solid silver" }}>
          <Stack direction={"column"} rowGap={3} textAlign={"center"}>
            <Stack direction="column" rowGap={1}>
              <h4>Job Title</h4>
              <p>{description?.job_title}</p>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <h4>Department</h4>
              <p>{description?.department}</p>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <h4>No. of Positions</h4>
              <p>{description?.vacancy_count}</p>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <h4>Shifts</h4>
              <p>{description?.company?.working_shift}</p>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <h4>Job Type</h4>
              <p>{description?.job_type}</p>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <h4>Location</h4>
              <p>{description?.job_location}</p>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <h4>Experience</h4>
              <p>{description?.required_experience}</p>
            </Stack>
            <Stack direction="column" rowGap={1}>
              <h4>Salary</h4>
              <p>{description?.max_salary}</p>
            </Stack>
          </Stack>
        </Grid>
      </Grid>

      <hr />
      <Stack
        direction={{ xs: "column", md: "row" }}
        columnGap={1}
        rowGap={1}
        justifyContent={"space-between"}
      >
        <Stack direction="row" columnGap={1}>
          <img src="" alt="hiring manager" />
          <Stack direction="column" rowGap={1}>
            <h4>{description?.company?.user?.username}</h4>
            <p>
              Hiring manager at{" "}
              <span style={{ color: "blue" }}>Company name</span>
            </p>
          </Stack>
        </Stack>
        <Stack
          direction={{ xs: "column", md: "row" }}
          columnGap={1}
          rowGap={1}
          alignItems="center"
        >
          <ArticleIcon />
          <p>98 Application received</p>
          <Button variant="contained">Contact Hiring Manager</Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Description;
