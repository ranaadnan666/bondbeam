import { Stack } from "@mui/material";
import Head from "./Head";
import Body from "./Body";
import Foot from "./Foot";
import { useAppContext } from "../../context/app-context";

const Post = () => {
  const { allNewsFeed } = useAppContext();


  console.log("all news feed", allNewsFeed);
  return (
    <Stack direction={"column"} rowGap={1} width="98%" mx={"auto"}>
      {allNewsFeed.data?.slice(0)?.map((props, index) => {
        return (
          <Stack
            key={index}
            p={1}
            direction="column"
            sx={{
              backgroundColor: "white",
              borderRadius: "10px",
              border: "1px solid silver",
            }}
          >
            {/*======================= Head of Post ===================*/}
            <Head postData={props} />
            {/*======================== Body of Post ====================*/}
            <Body postData={props} />
            {/*======================== Foot of Post ====================*/}
            <Foot postData={props} />
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Post;
