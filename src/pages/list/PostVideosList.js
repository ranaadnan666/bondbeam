import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ReactPlayer from "react-player";
import axios from "axios";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function PostVideosList() {
  const [videos, setVideos] = useState([]);
  const { postid, shared } = useParams();

  const getPostVideos = async (id) => {
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
      setVideos(
        shared === "post"
          ? response?.data?.data?.videos
          : response?.data?.data?.post?.videos
      );
    }
  };

  useEffect(() => {
    getPostVideos(postid);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Box textAlign="center">
        <p style={{ fontSize: "30px" }}>Post Videos</p>
      </Box>
      <Box
        sx={{
          width: "20%",
          height: "3px",
          backgroundColor: "teal",
          margin: "0 auto",
        }}
      ></Box>
      <Box
        sx={{
          mx: "auto",
          padding: "1rem",
        }}
      >
        <ImageList variant="quilted" cols={4} rowHeight={221} gap={8}>
          {videos?.map(({ post_video, id }) => (
            <ImageListItem
              key={id}
              cols={post_video.cols || 1}
              rows={post_video.rows || 1}
            >
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                url={post_video}
                controls={true}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
