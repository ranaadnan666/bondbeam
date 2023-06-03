import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import { Button, Grid } from "@mui/material";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Video = ({ userVideo, userId }) => {
  return (
    <>
      <SimpleReactLightBox>
        <SRLWrapper>
          <Grid
            item
            mt={3}
            container
            xs={12}
            p={2}
            backgroundColor="white"
            borderRadius="10px"
            border="1px solid silver"
          >
            <Grid item xs={12}>
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Videos</p>
            </Grid>
            {userVideo?.slice(0, 4).map(({ video, id }) => (
              <Grid
                item
                xs={4}
                md={6}
                key={id}
                p={1}
                sx={{
                  cursor: "pointer",
                  transition: "all 0.5s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.05)",
                  },
                }}
                textAlign="center"
              >
                <ReactPlayer
                  width={"100%"}
                  height={"100%"}
                  url={video}
                  controls={true}
                />
              </Grid>
            ))}
            {userVideo?.length > 4 && (
              <Grid item xs={12}>
                <Link
                  to={`/user_videos/${userId}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button sx={{ width: "100%" }} variant="outlined">
                    See more
                  </Button>
                </Link>
              </Grid>
            )}
          </Grid>
        </SRLWrapper>
      </SimpleReactLightBox>
    </>
  );
};

export default Video;
