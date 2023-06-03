import { Grid, Stack } from "@mui/material";
import { likesData } from "./data";
import { useNavigate } from "react-router-dom";

const LikedGroup = () => {
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
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Likes</p>
        </Grid>
        {likesData.map(({ id, img, name, members }) => (
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
                  {members} Members
                </span>
              </p>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default LikedGroup;
