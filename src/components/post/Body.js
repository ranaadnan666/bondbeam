import { Avatar, Box, Grid, Stack } from "@mui/material";
import Linkify from "react-linkify";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
import ReactPlayer from "react-player";
import moment from "moment";

const Body = ({ postData }) => {
  const description = postData?.description;
  const isShared = postData?.shared_by ? true : false;
  const images = postData?.images || postData?.original_post?.images;
  const videos = postData?.videos || postData?.original_post?.videos;
  const originalPostUserId = postData?.original_post?.user?.id;
  const originalPostUserProfilePic = postData?.original_post?.user?.profile_pic;
  const originalPostUserFirstName = postData?.original_post?.user?.first_name;
  const originalPostUserLastName = postData?.original_post?.user?.last_name;
  const originalPostUserIsVerified = postData?.original_post?.user?.is_verified;
  const originalPostCreatedAt = postData?.original_post?.created_at;
  const originalPostDescription = postData?.original_post?.description;

  const urlify = (text) => {
    const regex =
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%.~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%.~#?&//=]*)/;
    return regex?.exec(text) && regex?.exec(text)[0];
  };
  // console.log("urlify", urlify(originalPostDescription));
  return (
    <>
      {/* description for shared post */}
      <Linkify
        componentDecorator={(decoratedHref, decoratedText, key) => (
          <a target="blank" href={decoratedHref} key={key}>
            {decoratedText}
          </a>
        )}
      >
        <p
          style={{
            padding: "0px 10px",
          }}
        >
          <div
            className="post_description"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          {/* {description} */}
        </p>
      </Linkify>
      {urlify(description) && (
        <Box sx={{ width: "100%" }}>
          <ReactPlayer
            width={"100%"}
            height={"400px"}
            style={{ height: "400px" }}
            url={urlify(description)}
            controls={true}
          />
        </Box>
      )}
      <Box
        sx={{
          border: isShared ? "2px solid #e6e6e6" : "none",
          borderRadius: "10px",
          p: "5px",
          mt: "10px",
        }}
      >
        {/* first part of body  s*/}
        {isShared && (
          <Stack direction="row" alignItems="center" columnGap={2}>
            <Link to={`/profile/${originalPostUserId}`}>
              <Avatar alt="Remy Sharp" src={originalPostUserProfilePic} />
            </Link>
            <Stack direction="column">
              <Link
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  color: "black",
                }}
                to={`/profile/${originalPostUserId}`}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  // justifyContent="center"
                  columnGap={"2px"}
                >
                  <p
                    style={{
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    {originalPostUserFirstName}&nbsp;
                    {originalPostUserLastName}
                  </p>
                  {originalPostUserIsVerified === "Approved" && (
                    <VerifiedIcon
                      color="info"
                      sx={{
                        fontSize: "14px",
                      }}
                    />
                  )}
                </Stack>
              </Link>
              <p style={{ color: "silver" }}>
                {moment(originalPostCreatedAt).startOf("minute").fromNow()}
              </p>
            </Stack>
          </Stack>
        )}

        {/* second part of body */}
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          <Box
            sx={{
              padding: "0px 10px",
              fontSize: { xs: "8px", sm: "10px", md: "14px" },
              // overflow: "auto",
            }}
          >
            <div
              className="post_description"
              dangerouslySetInnerHTML={{ __html: originalPostDescription }}
            ></div>
            {/* {originalPostDescription} */}
          </Box>
        </Linkify>
        {/* <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a target="blank" href={decoratedHref} key={key}>
              {decoratedText}
            </a>
          )}
        >
          <p
            style={{
              padding: "0px 10px",
            }}
          >
            {description}
          </p>
        </Linkify> */}
        {urlify(originalPostDescription) && (
          <Box sx={{ width: "100%" }}>
            <ReactPlayer
              width={"100%"}
              height={"400px"}
              style={{ height: "400px" }}
              url={urlify(originalPostDescription)}
              controls={true}
            />
          </Box>
        )}
        {/* render post videos */}
        {videos?.length > 0 && (
          <Box sx={{ width: "100%" }}>
            <Grid item xs={12} container>
              {videos?.slice(0, 4)?.map(({ id, video }, index) => (
                <Grid
                  item
                  container
                  key={id}
                  md={
                    videos?.length === 2
                      ? 6
                      : videos?.length === 3
                      ? index === 0
                        ? 12
                        : 6
                      : videos?.length > 3
                      ? 6
                      : 12
                  }
                  xs={12}
                >
                  {index === 3 ? (
                    <>
                      <Grid item xs={12} p={1}>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/post_videos/${
                            isShared ? "shared_post" : "post"
                          }`}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "rgba(0,0,0,0.5)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              color: "white",
                              fontSize: "1.5rem",
                              fontWeight: "bold",
                              cursor: "pointer",
                              "&:hover": {
                                backgroundColor: "rgba(0,0,0,0.7)",
                                transition: "all 0.5s",
                              },
                            }}
                          >
                            <p>+{videos?.length - 3}</p>
                          </Box>
                        </Link>
                      </Grid>
                    </>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      p={1}
                      sx={{
                        width: "100%",
                        // add some transition
                        "&:hover": {
                          transform: "scale(1.01)",
                          transition: "linear 0.5s",
                        },
                      }}
                    >
                      <ReactPlayer
                        width={"100%"}
                        height={"100%"}
                        url={video}
                        controls={true}
                        style={{
                          borderRadius: "10px",
                        }}
                      />
                    </Grid>
                  )}
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
        {/* render post postData?.images */}
        <SimpleReactLightBox>
          <SRLWrapper>
            <Grid item xs={12} container>
              {images?.slice(0, 4).map(({ id, image }, index) => (
                <Grid
                  item
                  container
                  key={id}
                  md={
                    images?.length === 2
                      ? 6
                      : images?.length === 3
                      ? index === 0
                        ? 12
                        : 6
                      : images?.length > 3
                      ? 6
                      : 12
                  }
                  xs={12}
                >
                  {index === 3 ? (
                    <Grid item xs={12} p={1}>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/post_images/${postData?.id}/${
                          isShared ? "shared_post" : "post"
                        }`}
                      >
                        <Box
                          sx={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "rgba(0,0,0,0.5)",
                            borderRadius: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white",
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            cursor: "pointer",
                            "&:hover": {
                              backgroundColor: "rgba(0,0,0,0.7)",
                              transition: "all 0.5s",
                            },
                          }}
                        >
                          <p>+{images?.length - 3}</p>
                        </Box>
                      </Link>
                    </Grid>
                  ) : (
                    <Grid
                      item
                      xs={12}
                      p={1}
                      sx={{
                        width: "100%",
                        // add some transition
                        "&:hover": {
                          transform: "scale(1.01)",
                          transition: "linear 0.5s",
                        },
                      }}
                    >
                      <img
                        style={{
                          cursor: "pointer",
                          borderRadius: "10px",
                        }}
                        width="100%"
                        height="100%"
                        src={image}
                        alt=""
                      />
                    </Grid>
                  )}
                </Grid>
              ))}
            </Grid>
          </SRLWrapper>
        </SimpleReactLightBox>
      </Box>
    </>
  );
};

export default Body;
