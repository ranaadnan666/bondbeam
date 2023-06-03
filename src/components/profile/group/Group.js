import { Grid, Stack } from "@mui/material";
import { groupData } from "./data";
import { useNavigate } from "react-router-dom";

const Group = () => {
  let navigate = useNavigate();
  const ComingSoon = () => {
    navigate("/commingsoon");
  };
  return (
    <>
      <Grid
        item
        mt={3}
        rowGap={2}
        container
        xs={12}
        p={2}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
        }}
      >
        <Grid item xs={12}>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Groups</p>
        </Grid>
        {groupData.map(({ id, img, name, followers }) => (
          <Grid item xs={6} md={12} key={id}>
            <Stack
              onClick={ComingSoon}
              sx={{ cursor: "pointer" }}
              direction="row"
              columnGap={1}
              alignItems="center"
            >
              <img src={img} alt="follower1" />
              <p style={{ fontWeight: "bold" }}>
                {name}
                <br />
                <span style={{ color: "#0A66C2", fontWeight: "normal" }}>
                  {followers} Followers
                </span>
              </p>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Group;
