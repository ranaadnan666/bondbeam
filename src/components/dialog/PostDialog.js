import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import PanoramaIcon from "@mui/icons-material/Panorama";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SimpleReactLightBox, {
  SRLWrapper,
} from "@bimbeo160/simple-react-lightbox";
// import Resizer from "react-image-file-resizer";
import { useAppContext } from "../../context/app-context";
import {
  createPost,
  updatePost,
  updateSharedPost,
} from "../../utils/helpers/news_feed/crud_operations";
import { postInitialState } from "../../context/initial_states/post_initial_state";
import { styleForIcons, styleForLabel, styleForTextArea } from "./styles";
import { createCompanyPost } from "../../utils/helpers/company/company_crud";
import { createPagePost } from "../../utils/helpers/page/page_crud";
import { createGroupPost } from "../../utils/helpers/group/group_crud";
import { repost } from "../../utils/helpers/post/post_extra";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostDialog = () => {
  const {
    post,
    setPost,
    getNewsFeed,
    getUserTimeline,
    getCompanyNewsfeed,
    getGroupNewsfeed,
    getPageNewsfeed,
    allNewsFeed,
    setAllNewsFeed,
    generalIdofParent,
  } = useAppContext();
  // const [resizedImages, setResizedImages] = React.useState([]);
  const postOf = allNewsFeed.postOf;
  const idOfParent = allNewsFeed.idOfParent;

  //  ======================== input Data Formatig purpose =======================
  PostDialog.modules = {
    toolbar: [
      [
        { header: "1" },
        { header: "2" },
        { header: [3, 4, 5, 6] },
        { font: [] },
      ],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      // ["link","image","video"],
      // ["clean"],
      // ["code-block"],
    ],
  };
  PostDialog.formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "video",
    "code-block",
  ];
  //  ======================== Image Resize =======================
  // const resizeFile = (file) =>
  //   new Promise((resolve) => {
  //     Resizer.imageFileResizer(
  //       file,
  //       480,
  //       480,
  //       "webp",
  //       70,
  //       0,
  //       (uri) => {
  //         resolve(uri);
  //       },
  //       "base64"
  //     );
  //   });

  //  ======================== Convert Again =======================
  // const dataURIToBlob = (dataURI) => {
  //   const splitDataURI = dataURI.split(",");
  //   const byteString =
  //     splitDataURI[0].indexOf("base64") >= 0
  //       ? atob(splitDataURI[1])
  //       : decodeURI(splitDataURI[1]);
  //   const mimeString = splitDataURI[0].split(":")[1].split(";")[0];

  //   const ia = new Uint8Array(byteString.length);
  //   for (let i = 0; i < byteString.length; i++)
  //     ia[i] = byteString.charCodeAt(i);

  //   return new Blob([ia], { type: mimeString });
  // };
  //   handle resize for images
  // const handleResize = async (allImages) => {
  //   for (let i = 0; i < allImages?.length; i++) {
  //     const file = allImages[i];

  //     const image = await resizeFile(file);
  //     const newFile = dataURIToBlob(image);
  //     setResizedImages((prev) => {
  //       return [...prev, newFile];
  //     });
  //   }
  // };
  //================================ submit post ============================
  const handleSubmit = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const token = lsUser?.token?.access;
    const data = new FormData();
    if (post.desc !== "" || post.media?.length > 0) {
      data.append("description", post.desc);
      data.append(
        postOf === "company"
          ? "company_id"
          : postOf === "group"
          ? "group_id"
          : postOf === "page"
          ? "page_id"
          : null,
        idOfParent || generalIdofParent
      );
      data.append(
        post.postIsShared ? "shared_post_id" : "post_id",
        post.editPostId
      );
      data.append(
        "request_for",
        postOf === "company"
          ? "company_post"
          : postOf === "group"
          ? "group_post"
          : postOf === "page"
          ? "page_post"
          : null
      );
      // if (post.imageMode) {
      //   for (let i = 0; i < resizedImages?.length; i++) {
      //     data.append(
      //       "images",
      //       resizedImages[i],
      //       resizedImages[i].name ? resizedImages[i].name : null
      //     );
      //   }
      // }
      // else
      // {
      for (let i = 0; i < post.media?.length; i++) {
        data.append(
          post.imageMode ? "images" : "videos",
          post.media[i],
          post.media[i].name ? post.media[i].name : null
        );
      }
      // }
    }
    // call functions to given postOf = company/group/page/main/timeline
    const response = post.editMode
      ? post.sharedPostId
        ? await updateSharedPost(data, post.sharedPostId, token)
        : await updatePost(data, token)
      : postOf === "company"
      ? await createCompanyPost(token, data)
      : postOf === "group"
      ? await createGroupPost(token, data)
      : postOf === "page"
      ? await createPagePost(token, data)
      : postOf === "main"
      ? await createPost(data, token)
      : null;
    if (
      response?.status ||
      response?.success ||
      response?.status_code === 200
    ) {
      // add new post to the top of the newsfeed
      // setAllNewsFeed((prev) => {
      //   const tempArr = prev.data;
      //   tempArr.unshift(response.data);
      //   return { ...prev, data: tempArr };
      // });
      setPost(postInitialState);
      // setResizedImages([]);

      return postOf === "company"
        ? await getCompanyNewsfeed(idOfParent || generalIdofParent)
        : postOf === "group"
        ? await getGroupNewsfeed(idOfParent || generalIdofParent)
        : postOf === "page"
        ? await getPageNewsfeed(idOfParent || generalIdofParent)
        : postOf === "main"
        ? await getNewsFeed()
        : await getUserTimeline(post.postUserId, lsUser?.token?.access);
    }
  };
  //  ======================== share/repost - post =======================
  const handleSharePost = async (givenObj) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await repost(lsUser?.token?.access, {
      ...givenObj,
      request_for:
        postOf === "company"
          ? "company_post"
          : postOf === "group"
          ? "group_post"
          : postOf === "page"
          ? "page_post"
          : null,
    });
    if (
      response?.status ||
      response?.success ||
      response?.status_code === 200
    ) {
      // share post to the top of the newsfeed
      // setAllNewsFeed((prev) => {
      //   const tempArr = prev.data;
      //   tempArr.unshift(response.data);
      //   return { ...prev, data: tempArr };
      // });
      setPost(postInitialState);
      return postOf === "company"
        ? await getCompanyNewsfeed(idOfParent)
        : postOf === "group"
        ? await getGroupNewsfeed(idOfParent)
        : postOf === "page"
        ? await getPageNewsfeed(idOfParent)
        : postOf === "main"
        ? await getNewsFeed()
        : await getUserTimeline(post.postUserId, lsUser?.token?.access);
    }
  };

  return (
    <Dialog
      open={post.dialog ? post.dialog : false}
      onClose={() => setPost(postInitialState)}
    >
      <DialogTitle>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <p>
            {post.editMode
              ? "Edit Post"
              : post.shareMode
              ? "Share Post"
              : "Create Post"}
          </p>
          <CloseIcon
            sx={{
              cursor: "pointer",
              borderRadius: "50%",
              "&:hover": {
                color: "blue",
                transition: "all 0.3s ease-in-out",
              },
            }}
            onClick={() => setPost(postInitialState)}
          />
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Grid container rowGap={1} justifyContent="center">
          <Grid item xs={12}>
            {/* <textarea
              style={styleForTextArea}
              placeholder={
                post.shareMode
                  ? "Write description here"
                  : post.editMode
                  ? "Write something here"
                  : "What do you want to talk about?"
              }
              type="text"
              rows={5}
              value={post.desc}
              onChange={(e) => {
                setPost((prev) => {
                  return {
                    ...prev,
                    desc: e.target.value,
                  };
                });
              }}
            /> */}
            <ReactQuill
              // style={styleForTextArea}
              onChange={(e) => {
                setPost((prev) => {
                  return {
                    ...prev,
                    desc: e,
                  };
                });
              }}
              placeholder={
                post.shareMode
                  ? "Write description here"
                  : post.editMode
                  ? "Write something here"
                  : "What do you want to talk about?"
              }
              modules={PostDialog.modules}
              formats={PostDialog.formats}
              value={post.desc}
            />
          </Grid>
          {/* ================= image & video upload buttons ================ */}
          <Grid item xs={12}>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems="center"
              justifyContent="space-between"
              columnGap={1}
            >
              {!post.shareMode ? (
                !post.postIsShared ? (
                  <>
                    <Stack
                      sx={styleForIcons}
                      direction="row"
                      columnGap={1}
                      alignItems="center"
                      onClick={() =>
                        setPost((prev) => {
                          return {
                            ...prev,
                            displayLabels:
                              post.imageMode && post.displayLabels
                                ? false
                                : true,
                            imageMode: !post.imageMode,
                            videoMode: false,
                          };
                        })
                      }
                    >
                      <PanoramaIcon fontSize="small" />
                      <p>Photo</p>
                    </Stack>
                    <Stack
                      sx={styleForIcons}
                      direction="row"
                      columnGap={1}
                      alignItems="center"
                      onClick={() =>
                        setPost((prev) => {
                          return {
                            ...prev,
                            displayLabels:
                              post.videoMode && post.displayLabels
                                ? false
                                : true,
                            videoMode: !post.videoMode,
                            imageMode: false,
                            media: [],
                          };
                        })
                      }
                    >
                      <SmartDisplayIcon fontSize="small" />
                      <p>Video</p>
                    </Stack>
                  </>
                ) : null
              ) : null}
              {/* =============== post button =============== */}
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                color="info"
                onClick={
                  post.shareMode
                    ? () => {
                        handleSharePost({
                          post_id: post.sharedPostId,
                          description: post.desc,
                        });
                      }
                    : handleSubmit
                }
                disabled={
                  post.shareMode
                    ? false
                    : post.desc || post.media?.length > 0
                    ? false
                    : true
                }
              >
                {post.editMode
                  ? "Update"
                  : post.shareMode
                  ? post.desc
                    ? "Share"
                    : "Share without description"
                  : "Post"}
              </Button>
            </Stack>
          </Grid>
          {/* ================ upload image & video ==================== */}
          {post.displayLabels && post.media?.length === 0 && (
            <Grid item xs={12}>
              <label htmlFor="document" style={styleForLabel}>
                <input
                  type="file"
                  name="certificate"
                  id="document"
                  onChange={(event) => {
                    // post.imageMode && handleResize(event.target.files);
                    setPost((prev) => {
                      return {
                        ...prev,
                        media: [...event.target.files],
                        displayLabels: false,
                      };
                    });
                  }}
                  style={{ display: "none" }}
                  accept={post.imageMode ? "image/*" : "video/*"}
                  multiple
                />
                <p style={{ margin: "0", textAlign: "center" }}>
                  <AddPhotoAlternateIcon />
                  <br />
                  {post.imageMode ? "Upload Image" : "Upload Video"}
                </p>
              </label>
            </Grid>
          )}
          {/* ================== cancellation button ================= */}
          {post.media?.length > 0 && (
            <Grid item xs={12} textAlign="right">
              <CloseIcon
                onClick={() => {
                  // setResizedImages([]);
                  setPost((prev) => {
                    return {
                      ...prev,
                      media: [],
                      displayLabels: false,
                      imageMode: false,
                      videoMode: false,
                    };
                  });
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "blue",
                  },
                }}
              />
            </Grid>
          )}
          {!post.displayLabels &&
            post.media?.length > 0 &&
            (post.imageMode ? (
              <>
                <SimpleReactLightBox>
                  <SRLWrapper>
                    {post.media.map((item, index) => {
                      return (
                        <Grid key={index} item xs={12}>
                          <Box
                            sx={{
                              width: "100%",
                              height: "300px",
                            }}
                          >
                            <img
                              style={{
                                width: "100%",
                                height: "100%",
                                cursor: "pointer",
                              }}
                              src={
                                item?.name
                                  ? URL.createObjectURL(item)
                                  : item?.post_image
                                  ? item?.post_image
                                  : item
                              }
                              alt="Are you trying to upload a video?"
                            />
                          </Box>
                        </Grid>
                      );
                    })}
                  </SRLWrapper>
                </SimpleReactLightBox>
              </>
            ) : (
              <>
                {post.media.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12}>
                      <Box
                        sx={{
                          width: "100%",
                          height: "300px",
                        }}
                      >
                        <video
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          src={
                            item?.name
                              ? URL.createObjectURL(item)
                              : item?.post_video
                              ? item?.post_video
                              : item
                          }
                          controls
                        />
                      </Box>
                    </Grid>
                  );
                })}
              </>
            ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default PostDialog;
