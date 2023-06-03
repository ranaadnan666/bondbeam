import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import axios from "axios";
const PostImagesList = () => {
  const [images, setImages] = useState([]);
  const { postid, shared } = useParams();

  const getPostImages = async (id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await axios.get(
      `https://api.bondbeam.com/newsfeed/get_single_post/?${
        shared === "post" ? "post_id" : "shared_post_id"
      }=${id}`,
      {
        headers: {
          Authorization: `Bearer ${lsUser?.token?.access}`,
        },
      }
    );
    if (response?.data?.success) {
      console.log("Response in get image list ", response?.data?.data);
      setImages(
        shared === "post"
          ? response?.data?.data?.images
          : response?.data?.data?.post?.images
      );
    }
  };

  useEffect(() => {
    getPostImages(postid);
    // eslint-disable-next-line
  }, [postid]);

  return (
    <SimpleReactLightBox>
      <SRLWrapper>
        <Grid container rowGap={1} justifyContent="center">
          <Grid item xs={12} p={1} textAlign="center">
            <p style={{ fontSize: "30px" }}>Post Images</p>
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

export default PostImagesList;
