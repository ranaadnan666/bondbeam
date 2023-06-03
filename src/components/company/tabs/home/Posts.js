import { Grid } from "@mui/material";
import CreatePost from "../../../post/Create";
import Post from "../../../post";
import { useAppContext } from "../../../../context/app-context";

const Posts = (props) => {
  const { user } = useAppContext();
  return (
    <Grid container rowGap={1}>
      {user?.data?.id === props?.companyCreatorId && <CreatePost />}
      <Post />
    </Grid>
  );
};

export default Posts;
