import { Box, Grid, Stack } from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useAppContext } from "../../../../context/app-context";
import moment from "moment";

const Projects = (props) => {
  const { user } = useAppContext();
  const randomImages = [
    {
      id: 1,
      // google images form internet
      url: "https://images.unsplash.com/photo-1626126090003-8b8b1b2b2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1626126090003-8b8b1b2b2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1626126090003-8b8b1b2b2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1626126090003-8b8b1b2b2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    },
  ];
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "10px",
        padding: "10px",
        border: "1px solid silver",
      }}
    >
      <h3>Projects</h3>
      {props?.projectData?.length === 0 ? (
        <p>Nothing to show here</p>
      ) : (
        props?.projectData?.map((item) => (
          <Stack
            p={1}
            mb={1}
            sx={{ border: "1px solid silver", borderRadius: "10px" }}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack direction="row" columnGap={1}>
              {/* icon */}
              <AccountTreeIcon fontSize="large" />
              <Stack direction="column" rowGap={1}>
                <h4>{item?.project_name}</h4>
                <details>
                  <summary>Description</summary>
                  <p style={{ color: "silver", textTransform: "lowercase" }}>
                    {item?.project_description}
                  </p>
                </details>
                {/* start date - end date */}
                <p>
                  {/* {item?.start_date} - {item?.end_date} */}
                  {moment(item?.start_date).format("DD/MM/YYYY")} -{" "}
                  {moment(item?.end_date).format("DD/MM/YYYY")}
                </p>
                {/* list of images */}
                <Grid rowGap={1} columnGap={1} container>
                  {item?.images?.map((image) => (
                    <Grid item key={image?.id}>
                      <img
                        width="80px"
                        height="80px"
                        src={image?.pic}
                        alt="project pictures"
                      />
                    </Grid>
                  ))}
                </Grid>
              </Stack>
            </Stack>
            {user?.data?.id === props?.user_id && (
              <Stack direction="row" alignItems="center" columnGap={1}>
                {/* icon for delete */}
                <DeleteIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "red",
                    },
                  }}
                />
                {/* icon for edit */}
                <EditIcon
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      color: "blue",
                    },
                  }}
                />
              </Stack>
            )}
          </Stack>
        ))
      )}
    </Box>
  );
};

export default Projects;
