import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import ReactPlayer from "react-player";

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function UserVideosList() {
  const [userAlbum, setUserAlbums] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userid } = useParams();

  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));

  const getAlbums = async (id) => {
    setLoading(true);
    const response = await fetch(
      `https://api.bondbeam.com/api/user_video_album/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authUser?.token?.access}`,
        },
      }
    );
    const data = await response.json();
    setUserAlbums(data.results);
    setLoading(false);
  };

  useEffect(() => {
    getAlbums(userid);

    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Box textAlign="center">
        <p style={{ fontSize: "30px" }}>User Videos</p>
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
          {userAlbum?.map(({ video, ind }) => (
            <ImageListItem
              key={ind}
              cols={video.cols || 1}
              rows={video.rows || 1}
            >
              <ReactPlayer
                width={"100%"}
                height={"100%"}
                url={video}
                controls={true}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </>
  );
}
