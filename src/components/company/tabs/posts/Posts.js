import { Grid } from "@mui/material";
import CreatePost from "../../../post/Create";
import Post from "../../../post";

const Posts = () => {
  return (
    <Grid
      container
      rowGap={1}
      width={{ xs: "99%", sm: "80%", md: "60%", lg: "50%" }}
      mx="auto"
    >
      <CreatePost />
      <Post />
    </Grid>
  );
};

export default Posts;
