import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
const UserImagesList = () => {
  const [images, setImages] = useState([]);
  const { userid } = useParams();

  const getAlbums = async (id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await fetch(
      `https://api.bondbeam.com/api/user_photo_album/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${lsUser?.token?.access}`,
        },
      }
    );
    const data = await response.json();
    setImages(data?.results);
  };

  useEffect(() => {
    getAlbums(userid);
    // eslint-disable-next-line
  }, [userid]);

  return (
    <SimpleReactLightBox>
      <SRLWrapper>
        <Grid container rowGap={1} justifyContent="center">
          <Grid item xs={12} p={1} textAlign="center">
            <p style={{ fontSize: "30px" }}>User Images</p>
          </Grid>
          <Grid item xs={12} p={1} textAlign="center">
            <Box
              sx={{
                width: "20%",
                height: "3px",
                backgroundColor: "teal",
                margin: "0 auto",
              }}
            ></Box>
          </Grid>
          {images?.map(({ id, image }) => (
            <Grid item xs={6} sm={3} md={2} p={1} key={id}>
              <img
                style={{ width: "100%", height: "100%", cursor: "pointer" }}
                src={image}
                alt="post images"
              />
            </Grid>
          ))}
        </Grid>
      </SRLWrapper>
    </SimpleReactLightBox>
  );
};

export default UserImagesList;
