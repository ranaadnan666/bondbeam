import { Grid } from "@mui/material";
import CreatePost from "../../post/Create";
import Post from "../../post";

const MiddleArea = () => {
  return (
    <>
      <Grid
        item
        container
        md={6}
        xs={12}
        pt={2}
        fontSize={{ xs: "10px", sm: "14px", md: "normal" }}
        height="fit-content"
      >
        <CreatePost />
        <Post />
      </Grid>
    </>
  );
};

export default MiddleArea;
