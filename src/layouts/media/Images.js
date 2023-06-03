import { testingDataforImages } from "./testing_data.js";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import { Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Images = (props) => {
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
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Images</p>
          <Grid container>
            {props?.imageArr?.length === 0 ? (
              <Grid item xs={12} p={1}>
                <p>Nothing to show here</p>
              </Grid>
            ) : (
              props?.imageArr?.slice(0, 4).map(({ id, image }) => (
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
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    src={image}
                    alt=""
                  />
                </Grid>
              ))
            )}
          </Grid>
          {props?.imageArr?.length > 4 && (
            <Link
              // to={`/user_images/${userId}`}
              style={{ textDecoration: "none" }}
            >
              <Button sx={{ width: "100%" }} variant="contained" color="info">
                See more
              </Button>
            </Link>
          )}
        </Box>
      </SRLWrapper>
    </SimpleReactLightBox>
  );
};

export default Images;
