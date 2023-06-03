import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import { Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

const Image = ({ albums, userId }) => {
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
              <p style={{ fontWeight: "bold", fontSize: "20px" }}>Images</p>
            </Grid>
            {albums?.slice(0, 4).map(({ id, image }) => (
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
            ))}
            {albums?.length > 4 && (
              <Grid item xs={12}>
                <Link
                  to={`/user_images/${userId}`}
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

export default Image;
