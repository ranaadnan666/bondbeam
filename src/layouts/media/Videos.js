import { testingDataforVideos } from "./testing_data.js";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import { Box, Button, Grid } from "@mui/material";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

const Videos = (props) => {
  return (
    <SimpleReactLightBox>
      <SRLWrapper>
        <Box
          sx={{
            padding: "10px",
            backgroundColor: "white",
            borderRadius: "10px",
            border: "1px solid silver",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Videos</p>
          <Grid container>
            {props?.videoArr?.length === 0 ? (
              <Grid item xs={12} p={1}>
                <p>Nothing to show here</p>
              </Grid>
            ) : (
              props?.videoArr?.slice(0, 4).map(({ id, video }) => (
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
              ))
            )}
          </Grid>
          {props?.videoArr?.length > 4 && (
            <Grid item xs={12}>
              <Link
                // to={`/user_images/${userId}`}
                style={{ textDecoration: "none" }}
              >
                <Button sx={{ width: "100%" }} variant="contained" color="info">
                  See more
                </Button>
              </Link>
            </Grid>
          )}
        </Box>
      </SRLWrapper>
    </SimpleReactLightBox>
  );
};

export default Videos;
