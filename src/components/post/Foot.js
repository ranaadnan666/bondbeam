import {
  Avatar,
  Badge,
  Box,
  Grid,
  Stack,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React, { useState } from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MessageIcon from "@mui/icons-material/Message";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplyIcon from "@mui/icons-material/Reply";
import RoundedPic from "../../images/album/album1.jpeg";
import { Link } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import DefaultProfile from "../../images/default.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useAppContext } from "../../context/app-context";
import styled from "@emotion/styled";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CelebrationIcon from "@mui/icons-material/Celebration";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import PersonIcon from "@mui/icons-material/Person";
import {
  getCommentOfPost,
  getListUserShares,
  reactOnComment,
  updateReactOnComment,
} from "../../utils/helpers/post/post_extra";
import {
  postCommentToPost,
  getCompanyPostComments,
} from "../../utils/helpers/company/company_crud";
import { getGroupPostComments } from "../../utils/helpers/group/group_crud";
import { getPagePostComments } from "../../utils/helpers/page/page_crud";
import {
  reactOnPost,
  updateReactOnPost,
} from "../../utils/helpers/post/post_extra";

const CustomWidthTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    width: 250,
    maxWidth: 250,
    background: "#EFEFEE",
    height: "40px",
    maxHeight: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

const reactionIcon = [
  {
    id: 101,
    name: "Like",
    color: "blue",
    icon: <ThumbUpIcon sx={{ color: "#1976D2", fontSize: "inherit" }} />,
  },
  {
    id: 102,
    name: "Favorite",
    color: "red",
    icon: <FavoriteIcon sx={{ color: "red", fontSize: "inherit" }} />,
  },
  {
    id: 103,
    name: "Celebrate",
    color: "green",
    icon: <CelebrationIcon color="success" sx={{ fontSize: "inherit" }} />,
  },
  {
    id: 104,
    name: "Informative",
    color: "yellow",
    icon: <TipsAndUpdatesIcon sx={{ color: "#EDC709", fontSize: "inherit" }} />,
  },
  {
    id: 105,
    name: "Funny",
    color: "yellow",
    icon: (
      <SentimentSatisfiedAltIcon
        sx={{ color: "#1152a0", fontSize: "inherit" }}
      />
    ),
  },
  {
    id: 106,
    name: "Support",
    color: "yellow",
    icon: (
      <VolunteerActivismIcon sx={{ color: "#ef2b86", fontSize: "inherit" }} />
    ),
  },
];

const Foot = ({ postData }) => {
  const [displayComments, setDisplayComments] = useState(false);
  const [allComments, setAllComments] = useState([]);
  // console.log("all comments", allComments);
  const [commentState, setCommentState] = useState("");
  const [tempId, setTempId] = useState(null);
  const [replyId, setReplyId] = useState(null);
  const [replyCommentState, setReplyCommentState] = useState("");
  const [likesUserData, setLikesUserData] = useState([]);
  const [shareUserData, setShareUserData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [openShare, setOpenShare] = React.useState(false);
  const [replyShowId, setReplyShowId] = useState(null);

  // console.log("postData in Foot.js", postData?.original_post?.id);
  //

  const {
    user: userFromContext,
    postCommentReply,
    deleteComment,
    setPost,
    getLikesPost,
    setAllNewsFeed,
  } = useAppContext();

  const authUserProfilePic = userFromContext?.data?.profile_pic;
  const isShared = postData?.shared_by ? true : false;
  const postId = postData?.id;
  const isLiked = postData?.like;
  const totalLikes = postData?.likes;
  const totalComments = postData?.comments;
  const totalShares = postData?.share;
  const postOf = postData?.post_of;
  const idOfParent =
    postData?.company || postData?.group || postData?.page || null;
  const likedCode = postData?.like_code;
  // const postUserId = postData?.user?.id || postData?.shared_by?.id;
  // console.log("totalShares", totalShares);

  const handleCloseDialog = (value) => {
    setOpen(false);
  };

  const handleCloseShareDialog = (value) => {
    setOpenShare(false);
  };

  // ======================== react on post =======================
  const handleReactOnPost = async (
    postId,
    isShared,
    postOf,
    likedCode,
    isLikedOrNot,
    idOfParent
  ) => {
    setAllNewsFeed((prev) => {
      const tempArr = prev.data;
      const index = tempArr.findIndex((item) => item.id === postId);
      tempArr[index].like = !isLikedOrNot;
      tempArr[index].likes = isLikedOrNot ? totalLikes - 1 : totalLikes + 1;
      tempArr[index].like_code = likedCode;
      return {
        ...prev,
        data: tempArr,
      };
    });
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await reactOnPost(lsUser?.token?.access, {
      request_for:
        postOf === "company"
          ? "company_post"
          : postOf === "group"
            ? "group_post"
            : postOf === "page"
              ? "page_post"
              : null,
      [isShared ? "shared_post_id" : "post_id"]: postId,
      status: isLiked ? "dislike" : "like",
      like_code: likedCode,
    });

    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      // setAllNewsFeed((prev) => {
      //   const tempArr = prev.data;
      //   const index = tempArr.findIndex((item) => item.id === postId);
      //   tempArr[index].like = !isLiked;
      //   tempArr[index].likes = isLiked ? totalLikes - 1 : totalLikes + 1;
      //   return {
      //     ...prev,
      //     data: tempArr,
      //   };
      // });
      // return postOf === "company"
      //   ? await getCompanyNewsFeed(idOfParent)
      //   : postOf === "group"
      //   ? await getGroupNewsFeed(idOfParent)
      //   : postOf === "page"
      //   ? await getPageNewsFeed(idOfParent)
      //   : postOf === "main"
      //   ? await getNewsFeed()
      //   : postOf === "timeline"
      //   ? await getUserTimeline(postUserId)
      //   : null;
    }
  };

  // ======================== react on comment =======================
  const handleReactOnComment = async (
    post_id,
    isShared,
    postOf,
    likedCode,
    isLikedOrNot,
    idOfComment,
    totalLikes
  ) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    // console.log(idOfComment);
    setAllComments((prev) => {
      const tempArr = [...prev];
      const index = tempArr.findIndex((item) => item.id === idOfComment);
      tempArr[index].like = !isLikedOrNot;
      tempArr[index].likes = isLikedOrNot ? totalLikes - 1 : totalLikes + 1;
      tempArr[index].like_code = likedCode;
      return tempArr;
    });
    const response = await reactOnComment(lsUser?.token?.access, {
      request_for:
        postOf === "company"
          ? "company_post"
          : postOf === "group"
            ? "group_post"
            : postOf === "page"
              ? "page_post"
              : null,
      [isShared ? "shared_post_id" : "post_id"]: post_id,
      status: isLikedOrNot ? "dislike" : "like",
      // status: "like",
      like_code: likedCode,
      comment_id: idOfComment,
    });
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      // return postOf === "company"
      //   ? await getCompanyNewsFeed(idOfParent)
      //   : postOf === "group"
      //   ? await getGroupNewsFeed(idOfParent)
      //   : postOf === "page"
      //   ? await getPageNewsFeed(idOfParent)
      //   : postOf === "main"
      //   ? await getNewsFeed()
      //   : postOf === "timeline"
      //   ? await getUserTimeline(postUserId)
      //   : null;
    }
  };

  // ======================== update reactions on post =======================
  const handleUpdateReactOnPost = async (
    postId,
    isShared,
    postOf,
    likedCode,
    idOfParent
  ) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await updateReactOnPost(lsUser?.token?.access, {
      request_for:
        postOf === "company"
          ? "company_post"
          : postOf === "group"
            ? "group_post"
            : postOf === "page"
              ? "page_post"
              : null,
      [isShared ? "shared_post_id" : "post_id"]: postId,
      // status: "like",
      like_code: likedCode,
    });
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      setAllNewsFeed((prev) => {
        const tempArr = prev.data;
        const index = tempArr.findIndex((item) => item.id === postId);
        tempArr[index].like_code = likedCode;
        tempArr[index].likes = isLiked ? totalLikes - 1 : totalLikes + 1;
        return {
          ...prev,
          data: tempArr,
        };
      });
      // return postOf === "company"
      //   ? await getCompanyNewsFeed(idOfParent)
      //   : postOf === "group"
      //   ? await getGroupNewsFeed(idOfParent)
      //   : postOf === "page"
      //   ? await getPageNewsFeed(idOfParent)
      //   : postOf === "main"
      //   ? await getNewsFeed()
      //   : await getUserTimeline(postUserId)
    }
  };

  // ======================== update reactions on comment =======================
  const handleUpdateReactOnComment = async (
    postId,
    isShared,
    postOf,
    likedCode,
    singleComment_id,
    commentIsLiked
  ) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    setAllComments((prev) => {
      const tempArr = [...prev];
      const index = tempArr.findIndex((item) => item.id === singleComment_id);
      tempArr[index].like_code = likedCode;
      tempArr[index].likes = commentIsLiked
        ? tempArr[index].likes - 1
        : tempArr[index].likes + 1;
      return tempArr;
    });
    const response = await updateReactOnComment(lsUser?.token?.access, {
      request_for:
        postOf === "company"
          ? "company_post"
          : postOf === "group"
            ? "group_post"
            : postOf === "page"
              ? "page_post"
              : null,
      [isShared ? "shared_post_id" : "post_id"]: postId,
      // status: "like",
      like_code: likedCode,
      comment_id: singleComment_id,
    });
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      // return postOf === "company"
      //   ? await getCompanyNewsFeed(idOfParent)
      //   : postOf === "group"
      //   ? await getGroupNewsFeed(idOfParent)
      //   : postOf === "page"
      //   ? await getPageNewsFeed(idOfParent)
      //   : postOf === "main"
      //   ? await getNewsFeed()
      //   : await getUserTimeline(postUserId)
    }
  };
  // ======================== reply comment =======================
  const handleReplyCommentShow = (id) => {
    replyId === null ? setReplyId(id) : setReplyId(null);
  };
  const handleReplyShow = (id) => {
    replyShowId === null ? setReplyShowId(id) : setReplyShowId(null);
  };

  // // ======================== Get Likes of Post =======================

  const handleGetLikes = async (post_type, id) => {
    postData?.totalLikes === 1 && postData?.isLiked
      ? setOpen(false)
      : setOpen(true);
    const responceForGetLikes = await getLikesPost(post_type, id);
    if (responceForGetLikes.status_code === 200) {
      // setCommentState("");
    }
    setLikesUserData(responceForGetLikes);
    //
  };

 // // ======================== Get Shares of Post =======================

 const handleGetSharesOfPost = async (post_id, post_of) => {
  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  postData?.totalLikes >= 1 
    ? setOpenShare(false)
    : setOpenShare(true);
  const responceForGetShares = await getListUserShares(lsUser.token.access, post_id, post_of,);
  if (responceForGetShares.status_code === 200) {
    // setCommentState("");
  }
  setShareUserData(responceForGetShares);
  //
};



  // // ======================== post comment =======================

  const handleComment = async (cmnt, e) => {
    e.preventDefault();
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const responseForPostComment = await postCommentToPost(
      lsUser?.token?.access,
      {
        ...cmnt,
        comment_of:
          postOf === "company"
            ? "company_post"
            : postOf === "group"
              ? "group_post"
              : postOf === "page"
                ? "page_post"
                : null,
      }
    );
    if (
      responseForPostComment?.status ||
      responseForPostComment?.status_code === 200 ||
      responseForPostComment?.success
    ) {
      setCommentState("");
      setAllComments((prev) => {
        const tempArr = [...prev];
        tempArr.push(responseForPostComment?.data);
        return tempArr;
      });
      setAllNewsFeed((prev) => {
        const tempArr = [...prev.data];
        // find index of the post with given post_id or shared_post_id
        const index = tempArr.findIndex(
          (post) => post.id === (cmnt.post_id || cmnt.shared_post_id)
        );
        // increment the comments count
        tempArr[index].comments += 1;
        return { ...prev, data: tempArr };
      });
      // return postOf === "company"
      //   ? await getCompanyNewsFeed(idOfParent)
      //   : postOf === "group"
      //   ? await getGroupNewsFeed(idOfParent)
      //   : postOf === "page"
      //   ? await getPageNewsFeed(idOfParent)
      //   : postOf === "main"
      //   ? await getNewsFeed()
      //   : await getUserTimeline(postUserId);
    }
  };

  // // ======================== post reply comment =======================
  const handleReplyComment = async (cmnt, e) => {
    e.preventDefault();
    const responseForPostCommentReply = await postCommentReply(cmnt);
    console.log("responseForPostCommentReply", responseForPostCommentReply);
    if (
      responseForPostCommentReply?.status ||
      responseForPostCommentReply?.status_code === 200 ||
      responseForPostCommentReply?.success
    ) {
      setReplyCommentState("");
      // push new object into reply array of object in allComments array of object
      setAllComments((prev) => {
        const tempArr = [...prev];
        const index = tempArr.findIndex(
          (item) => item.id === cmnt.in_answer_to
        );
        // check if reply array is exist or not
        if (!tempArr[index]?.reply) tempArr[index].reply = [];
        tempArr[index]?.reply?.push(responseForPostCommentReply?.data);
        return tempArr;
      });
      // await getComment(
      //   cmnt.shared_post_id
      //     ? { shared: "shared", id: cmnt.shared_post_id }
      //     : { shared: "", id: cmnt.post_id }
      // );
      // return postOf === "company"
      //   ? await getCompanyNewsFeed(idOfParent)
      //   : postOf === "group"
      //   ? await getGroupNewsFeed(idOfParent)
      //   : postOf === "page"
      //   ? await getPageNewsFeed(idOfParent)
      //   : postOf === "main"
      //   ? await getNewsFeed()
      //   : await getUserTimeline(postUserId);

      // if (responseForPostCommentReply.status_code === 200) {
      //   setReplyCommentState("");
      //   if (postOf === "company") {
      //     await getCompanyNewsFeed(companyId);
      //   }
      //   if (postOf === "group") {
      //     await getGroupNewsFeed(groupId);
      //   }
      //   if (postOf === "page") {
      //     await getPageNewsFeed(pageId);
      //   }
      //   if (isNewsfeed) {
      //     await getNewsFeed();
      //   } else {
      //     await getUserTimeline(userId);
      //   }
    }
  };
  // //  ======================== display comments =======================
  const handleCommentShow = async (post_id, shared) => {
    tempId === post_id ? setTempId(null) : setTempId(post_id);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    setDisplayComments(!displayComments);

    if (displayComments) return;
    const response =
      postOf === "company"
        ? await getCompanyPostComments(lsUser?.token?.access, post_id, shared)
        : postOf === "group"
          ? await getGroupPostComments(lsUser?.token?.access, post_id, shared)
          : postOf === "page"
            ? await getPagePostComments(lsUser?.token?.access, post_id, shared)
            : await getCommentOfPost(lsUser?.token?.access, post_id, shared);
    if (response) {
    }

    setAllComments(response?.data);
  };
  // ======================== delete comment =======================
  const delComment = async (obj, post_id, shared) => {
    console.log("obj", obj);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await deleteComment(obj);
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      setAllComments((prev) => {
        const tempArr = [...prev];
        for (let i = 0; i < tempArr?.length; i++) {
          if (tempArr[i].id === obj.comment_id) {
            tempArr.splice(i, 1);
          }
          // check if reply array is exist or not
          if (!tempArr[i]?.reply) continue;
          for (let j = 0; j < tempArr[i].reply.length; j++) {
            if (tempArr[i].reply[j].id === obj.comment_id) {
              tempArr[i].reply.splice(j, 1);
              return tempArr;
            }
          }
        }
        return tempArr;
      });
      setCommentState("");
      // postOf === "company"
      //   ? await getCompanyPostComments(lsUser?.token?.access, post_id, shared)
      //   : postOf === "group"
      //   ? await getGroupPostComments(lsUser?.token?.access, post_id, shared)
      //   : postOf === "page"
      //   ? await getPagePostComments(lsUser?.token?.access, post_id, shared)
      //   : await getCommentOfPost(lsUser?.token?.access, post_id, shared);
      // setDisplayComments(false);
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme?.palette?.background?.paper}`,
    },
  }));

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        pl={2}
        pr={2}
        pt={2}
      >
        <Box>
          <p
            className="like-dialog-btn"
            onClick={(e) =>
              handleGetLikes(isShared ? "shared_post_id" : "post_id", postId)
            }
          >
            {/* {totalLikes} */}
            {totalLikes > 0
              ? isLiked
                ? `You ${totalLikes - 1 === 0
                  ? `Liked`
                  : `and ${totalLikes - 1} ${totalLikes > 2 ? "others" : "other"
                  } liked`
                } `
                : `${totalLikes} ${totalLikes > 1 ? "Likes" : "Like"}`
              : ""}
          </p>
          <Dialog maxWidth="md" onClose={handleCloseDialog} open={open}>
            <DialogTitle>The People who reacted</DialogTitle>
            <List sx={{ p: 2 }}>
              {likesUserData?.results?.map((person) => (
                <Link className="link" to={`/profile/${person?.id}`}>
                  <ListItem disableGutters p={2}>
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        badgeContent={
                          person?.like_code === "Like" ? (
                            <ThumbUpIcon sx={{ color: "#1976D2" }} />
                          ) : person?.like_code === "Informative" ? (
                            <TipsAndUpdatesIcon sx={{ color: "#EDC709" }} />
                          ) : person?.like_code === "Celebrate" ? (
                            <CelebrationIcon color="success" />
                          ) : person?.like_code === "Favorite" ? (
                            <FavoriteIcon sx={{ color: "red" }} />
                          ) : person?.like_code === "Funny" ? (
                            <SentimentSatisfiedAltIcon
                              sx={{ color: "#1152a0" }}
                            />
                          ) : person?.like_code === "Support" ? (
                            <VolunteerActivismIcon sx={{ color: "#ef2b86" }} />
                          ) : (
                            <ThumbUpIcon sx={{ color: "#1976D2" }} />
                          )
                        }
                      >
                        <Avatar
                          src={
                            //  generalIdofParent ||
                            person?.profile_pic === null ? (
                              <PersonIcon />
                            ) : (
                              person?.profile_pic
                            )
                          }
                        />
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText style={{ paddingLeft: "1rem" }}
                      primary={person?.first_name + " " + person?.last_name}
                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Dialog>
        </Box>
        <Stack direction="row" spacing={2}>
          <p
            className="like-dialog-btn"
            onClick={() => {
              totalComments > 0 &&
                handleCommentShow(postId, isShared ? "shared" : null);
            }}
          >
            {totalComments > 0
              ? `${totalComments > 1
                ? `${totalComments} comments`
                : `${totalComments} comment`
              }`
              : ""}
          </p>
          <p
            className="like-dialog-btn"
            onClick={(e) =>
              handleGetSharesOfPost(isShared ? postData?.original_post?.id : postId, postOf)
            }
            >
            {totalShares > 0
              ? `${totalShares > 1
                ? `${totalShares} shares`
                : `${totalShares} share`
              }`
              : ""}
          </p>
          <Dialog maxWidth="md" onClose={handleCloseShareDialog} open={openShare}>
            <DialogTitle>The People who reacted</DialogTitle>
            <List sx={{ p: 2 }}>
              {shareUserData?.results?.map((person) => (
                <Link className="link" to={`/profile/${person?.id}`}>
                  <ListItem disableGutters p={2}>
                    <ListItemAvatar>
                     
                        <Avatar
                          src={
                            person?.profile_pic === null ? (
                              <PersonIcon />
                            ) : (
                              person?.profile_pic
                            )
                          }
                        />              
                    </ListItemAvatar>
                    <ListItemText style={{ paddingLeft: "1rem" }}
                      // primary={person?.first_name + " " + person?.last_name}
                      primary={person?.username}

                    />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Dialog>
        </Stack>
      </Stack>
      <Grid item container justifyContent="space-between" xs={12} p={1}>
        <Grid item xs={4}>
          <CustomWidthTooltip
            disableFocusListener
            placement="top"
            spacing={2}
            p={2}
            title={
              <>
                {reactionIcon?.map((reaction) => {
                  return (
                    <IconButton
                      className="reaction-icon"
                      key={reaction?.id}
                      onClick={
                        isLiked
                          ? () => {
                            handleUpdateReactOnPost(
                              postId,
                              isShared,
                              postOf,
                              reaction?.name,
                              idOfParent
                            );
                          }
                          : () => {
                            handleReactOnPost(
                              postId,
                              isShared,
                              postOf,
                              reaction?.name,
                              isLiked,
                              idOfParent
                            );
                          }
                      }
                    >
                      <Tooltip title={reaction?.name} placement="top">
                        {reaction?.icon}
                      </Tooltip>
                    </IconButton>
                  );
                })}
              </>
            }
          >
            <Stack
              sx={{
                "&:hover": {
                  backgroundColor: "#F3F2EF",
                  transition: "all 0.5s",
                  color: "black",
                },
                cursor: "pointer",
                padding: "8px 30px",
                color: "silver",
                borderRadius: "5px",
              }}
              justifyContent="center"
              onClick={() =>
                handleReactOnPost(
                  postId,
                  isShared,
                  postOf,
                  "Like",
                  isLiked,
                  idOfParent
                )
              }
              direction="row"
              columnGap={1}
              alignItems="center"
            >
              {isLiked ? (
                likedCode === "Like" ? (
                  <ThumbUpIcon sx={{ color: "#1976D2" }} />
                ) : likedCode === "Informative" ? (
                  <TipsAndUpdatesIcon sx={{ color: "#EDC709" }} />
                ) : likedCode === "Celebrate" ? (
                  <CelebrationIcon color="success" />
                ) : likedCode === "Favorite" ? (
                  <FavoriteIcon sx={{ color: "red" }} />
                ) : likedCode === "Funny" ? (
                  <SentimentSatisfiedAltIcon sx={{ color: "#1152a0" }} />
                ) : likedCode === "Support" ? (
                  <VolunteerActivismIcon sx={{ color: "#ef2b86" }} />
                ) : (
                  <ThumbUpIcon sx={{ color: "#1976D2" }} />
                )
              ) : (
                <ThumbUpIcon />
              )}
            </Stack>
          </CustomWidthTooltip>
        </Grid>
        <Grid item xs={4}>
          <Stack
            sx={{
              "&:hover": {
                backgroundColor: "#F3F2EF",
                transition: "all 0.5s",
                color: "black",
              },
              color: "silver",
              cursor: "pointer",
              padding: "8px 30px",
              borderRadius: "5px",
            }}
            justifyContent="center"
            onClick={() => {
              totalComments > 0 &&
                handleCommentShow(postId, isShared ? "shared" : null);
            }}
            direction="row"
            columnGap={1}
            alignItems="center"
          >
            <MessageIcon />
          </Stack>
        </Grid>
        {!isShared && (
          <Grid item xs={4}>
            <Stack
              sx={{
                "&:hover": {
                  backgroundColor: "#F3F2EF",
                  color: "black",
                  transition: "all 0.5s",
                },
                cursor: "pointer",
                color: "silver",
                padding: "8px 30px",
                borderRadius: "5px",
              }}
              justifyContent="center"
              onClick={(prev) => {
                setPost(() => {
                  return {
                    ...prev,
                    dialog: true,
                    shareMode: true,
                    sharedPostId: postId,
                    mainTitle:
                      postOf === "company"
                        ? "Company"
                        : postOf === "group"
                          ? "Group"
                          : postOf === "page"
                            ? "Page"
                            : "",
                    mainId: idOfParent,
                  };
                });
              }}
              direction="row"
              columnGap={1}
              alignItems="center"
            >
              <ShareIcon />
            </Stack>
          </Grid>
        )}
      </Grid>

      <Box
        sx={{
          width: "100%",
          height: "2px",
          backgroundColor: "silver",
          margin: "10px 0px",
        }}
      ></Box>
      <Stack
        direction={{ xs: "row" }}
        justifyContent="space-between"
        alignItems="center"
        columnGap={2}
        rowGap={2}
      >
        <Link to={`/profile/${userFromContext?.data?.id}`}>
          {userFromContext?.data?.show_online ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              variant="dot"
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#44b700",
                  color: "#44b700",
                  borderRadius: "50%",
                  boxShadow: `0 0 0 2px white`,
                },
              }}
            >
              <Avatar
                alt="Remy Sharp"
                src={authUserProfilePic ? authUserProfilePic : DefaultProfile}
              />
            </StyledBadge>
          ) : (
            <Avatar
              sx={{ width: "40px", height: "40px" }}
              src={authUserProfilePic ? authUserProfilePic : DefaultProfile}
              alt="roundedpic"
            />
          )}
        </Link>
        <Box
          sx={{
            backgroundColor: "#F1F1F5",
            width: "100%",
            borderRadius: "5px",
            border: "1px solid silver",
            "&:hover": {
              backgroundColor: "#F3F2EF",
              color: "black",
              border: "2px solid black",
            },
            padding: "0px 10px",
          }}
        >
          <form
            style={{ width: "100%" }}
          // onSubmit={(event) =>
          //   handleComment(
          //     {
          //       comment: commentState,
          //       [isShared ? "shared_post_id" : "post_id"]: postId,
          //       is_shared: isShared ? "true" : null,
          //     },
          //     event
          //   )
          // }
          >
            <input
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                backgroundColor: "transparent",
                height: "30px",
              }}
              type="text"
              placeholder="Write a comment"
              name="comment"
              value={commentState}
              onChange={(e) => setCommentState(e.target.value)}
            />
          </form>
        </Box>
        <button
          style={{
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
          }}
          type="submit"
          onClick={(event) =>
            handleComment(
              {
                comment: commentState,
                [isShared ? "shared_post_id" : "post_id"]: postId,
                is_shared: isShared ? "true" : null,
              },
              event
            )
          }
        >
          <SendIcon
            sx={{
              color: "#7A7A7A",
              cursor: "pointer",
              "&:hover": {
                color: "#3F51B5",
              },
            }}
          />
        </button>
      </Stack>
      {/* ================ handle Comments ================= */}
      {displayComments
        ? //  !loadingForGetComment &&
        allComments?.map((singleComment) => {
          const date = new Date(singleComment?.created_at);
          const time = date.toLocaleTimeString();
          return (
            <div key={singleComment?.id}>
              <Stack
                direction="row"
                mt={2}
                columnGap={2}
                p={1}
                backgroundColor="#F1F1F5"
                borderRadius="15px"
                border="1px solid silver"
              >
                <Link
                  to={`/profile/${singleComment?.user?.id}`}
                  style={{ cursor: "pointer" }}
                >
                  <Avatar
                    width="36px"
                    height="36px"
                    src={singleComment?.user?.profile_pic || RoundedPic}
                    alt="roundedpic"
                  />
                </Link>
                <Stack
                  width="100%"
                  direction="column"
                  justifyContent="center"
                >
                  <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="left"
                    width="100%"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Link
                        to={`/profile/${singleComment?.user?.id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <Stack
                          direction="row"
                          columnGap={"2px"}
                          alignItems="center"
                        >
                          <p style={{ fontWeight: "bold" }}>
                            {singleComment?.user.first_name}&nbsp;
                            {singleComment?.user?.last_name}
                          </p>
                          {singleComment?.user?.isVerified === "Approved" && (
                            <VerifiedIcon
                              color="info"
                              sx={{
                                fontSize: "14px",
                              }}
                            />
                          )}
                        </Stack>
                      </Link>
                      <Box sx={{ display: "flex" }}>
                        <p style={{ color: "silver" }}>Posted at: {time}</p>
                        <Box
                          onClick={() => {
                            delComment(
                              {
                                comment_of:
                                  postOf === "company"
                                    ? "company_post"
                                    : postOf === "group"
                                      ? "group_post"
                                      : postOf === "page"
                                        ? "page_post"
                                        : null,
                                comment_id: singleComment?.id,
                              },
                              postId,
                              isShared ? "shared" : null
                              // {
                              //   shared: singleComment?.isShared ? "shared" : "",
                              //   id: singleComment?.id,
                              // }
                            );
                          }}
                        >
                          {singleComment?.user?.id ===
                            userFromContext?.data?.id && (
                              <DeleteIcon
                                fontSize="small"
                                sx={{
                                  padding: "0 0 0 10px",
                                  cursor: "pointer",
                                  "&:hover": { color: "red" },
                                }}
                              />
                            )}
                        </Box>
                      </Box>
                    </Box>

                    <p>{singleComment?.comment}</p>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction="row"
                columnGap={1}
                alignItems={"center"}
                pt={0.5}
                pl={3}
              >
                <CustomWidthTooltip
                  disableFocusListener
                  placement="top"
                  spacing={2}
                  p={2}
                  title={
                    <>
                      {reactionIcon?.map((reaction) => {
                        return (
                          <IconButton
                            className="reaction-icon"
                            key={reaction?.id}
                            onClick={
                              singleComment?.like
                                ? () => {
                                  handleUpdateReactOnComment(
                                    singleComment?.post ||
                                    singleComment?.shared_post,
                                    singleComment?.shared_post,
                                    postOf,
                                    reaction?.name,
                                    singleComment?.id,
                                    singleComment?.like
                                  );
                                }
                                : () => {
                                  handleReactOnComment(
                                    singleComment?.post ||
                                    singleComment?.shared_post,
                                    singleComment?.shared_post,
                                    postOf,
                                    reaction?.name,
                                    singleComment?.like,
                                    singleComment?.id,
                                    singleComment?.likes
                                  );
                                }
                            }
                          >
                            {reaction?.icon}
                          </IconButton>
                        );
                      })}
                    </>
                  }
                >
                  <Stack
                    sx={{
                      "&:hover": {
                        backgroundColor: "#F3F2EF",
                        transition: "all 0.5s",
                        color: "black",
                      },
                      cursor: "pointer",
                      padding: "8px 30px",
                      color: "silver",
                      borderRadius: "5px",
                    }}
                    justifyContent="center"
                    onClick={() =>
                      handleReactOnComment(
                        singleComment?.post,
                        singleComment?.shared_post,
                        postOf,
                        "Like",
                        singleComment?.like,
                        singleComment?.id
                      )
                    }
                    direction="row"
                    columnGap={1}
                    alignItems="center"
                  >
                    {singleComment?.like ? (
                      singleComment?.like_code === "Like" ? (
                        <ThumbUpIcon sx={{ color: "#1976D2" }} />
                      ) : singleComment?.like_code === "Informative" ? (
                        <TipsAndUpdatesIcon sx={{ color: "#EDC709" }} />
                      ) : singleComment?.like_code === "Celebrate" ? (
                        <CelebrationIcon color="success" />
                      ) : singleComment?.like_code === "Favorite" ? (
                        <FavoriteIcon sx={{ color: "red" }} />
                      ) : singleComment?.like_code === "Funny" ? (
                        <SentimentSatisfiedAltIcon
                          sx={{ color: "#1152a0" }}
                        />
                      ) : singleComment?.like_code === "Support" ? (
                        <VolunteerActivismIcon sx={{ color: "#ef2b86" }} />
                      ) : (
                        <ThumbUpIcon sx={{ color: "#1976D2" }} />
                      )
                    ) : (
                      <ThumbUpIcon />
                    )}
                    {singleComment?.likes > 0 && singleComment?.likes}
                  </Stack>
                </CustomWidthTooltip>
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ height: "30px" }}
                />

                <IconButton
                  onClick={() => handleReplyCommentShow(singleComment?.id)}
                >
                  <ReplyIcon fontSize="small" />
                </IconButton>
                {singleComment?.reply?.length > 0 ? (
                  <>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ height: "30px" }}
                    />
                    <p
                      style={{ cursor: "pointer", color: "blue" }}
                      onClick={() => handleReplyShow(singleComment?.id)}
                    >
                      show replies ({singleComment?.reply?.length})
                    </p>
                  </>
                ) : null}
              </Stack>
              {replyId === singleComment?.id ? (
                <Stack
                  p={3}
                  direction={{ xs: "row" }}
                  justifyContent="space-between"
                  alignItems="center"
                  columnGap={2}
                  rowGap={2}
                >
                  <Link to={`/profile/${userFromContext?.data?.id}`}>
                    {userFromContext?.data?.show_online ? (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: "#44b700",
                            color: "#44b700",
                            borderRadius: "50%",
                            boxShadow: `0 0 0 2px white`,
                          },
                        }}
                      >
                        <Avatar
                          alt="Remy Sharp"
                          src={
                            authUserProfilePic
                              ? authUserProfilePic
                              : DefaultProfile
                          }
                        />
                      </StyledBadge>
                    ) : (
                      <Avatar
                        sx={{ width: "40px", height: "40px" }}
                        src={
                          authUserProfilePic
                            ? authUserProfilePic
                            : DefaultProfile
                        }
                        alt="roundedpic"
                      />
                    )}
                  </Link>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                      backgroundColor: "#F1F1F5",
                      width: "100%",
                      borderRadius: "5px",
                      border: "1px solid silver",
                      "&:hover": {
                        backgroundColor: "#F3F2EF",
                        color: "black",
                        border: "2px solid black",
                      },
                      padding: "0px 10px",
                    }}
                  >
                    <form
                      style={{ width: "100%" }}
                    // onSubmit={(event) =>
                    //   handleReplyComment(
                    //     {
                    //       comment: replyCommentState,
                    //       [singleComment?.is_shared
                    //         ? "shared_post_id"
                    //         : "post_id"]: singleComment?.id,
                    //       is_shared: singleComment?.is_shared
                    //         ? "true"
                    //         : null,
                    //       in_answer_to: singleComment?.id,
                    //       request_for:
                    //         postOf === "company"
                    //           ? "company_post"
                    //           : postOf === "group"
                    //             ? "group_post"
                    //             : postOf === "page"
                    //               ? "page_post"
                    //               : null,
                    //     },
                    //     event
                    //   )
                    // }
                    >
                      <input
                        style={{
                          width: "100%",
                          border: "none",
                          outline: "none",
                          backgroundColor: "transparent",
                          height: "30px",
                        }}
                        type="text"
                        placeholder="Write a reply"
                        name="comment"
                        value={replyCommentState}
                        onChange={(e) => setReplyCommentState(e.target.value)}
                      />
                    </form>
                  </Stack>
                  <button
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                    type="submit"
                    onClick={(event) =>
                      handleReplyComment(
                        {
                          comment: replyCommentState,
                          [singleComment?.is_shared
                            ? "shared_post_id"
                            : "post_id"]: postId,
                          is_shared: singleComment?.is_shared ? "true" : null,
                          in_answer_to: singleComment?.id,
                          request_for:
                            postOf === "company"
                              ? "company_post"
                              : postOf === "group"
                                ? "group_post"
                                : postOf === "page"
                                  ? "page_post"
                                  : null,
                        },
                        event
                      )
                    }
                  >
                    <SendIcon
                      sx={{
                        color: "#7A7A7A",
                        cursor: "pointer",
                        "&:hover": {
                          color: "#3F51B5",
                        },
                      }}
                    />
                  </button>
                </Stack>
              ) : null}
              {replyShowId === singleComment?.id
                ? singleComment?.reply?.map((singleReply, index) => {
                  return (
                    <Stack
                      direction="row"
                      key={index}
                      ml={5}
                      mt={1}
                      columnGap={2}
                      p={1}
                      backgroundColor="lightgrey"
                      borderRadius="15px"
                      border="1px solid silver"
                    >
                      <Link
                        to={`/profile/${singleReply?.user?.id}`}
                        style={{ cursor: "pointer" }}
                      >
                        <Avatar
                          width="36px"
                          height="36px"
                          src={singleReply?.user?.profilePic || RoundedPic}
                          alt="roundedpic"
                        />
                      </Link>
                      <Stack
                        width="100%"
                        direction="column"
                        justifyContent="center"
                      >
                        <Stack
                          direction="column"
                          justifyContent="space-between"
                          alignItems="left"
                          width="100%"
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "100%",
                            }}
                          >
                            <Link
                              to={`/profile/${singleReply?.user?.id}`}
                              style={{
                                textDecoration: "none",
                                color: "black",
                              }}
                            >
                              <Stack
                                direction="row"
                                columnGap={"2px"}
                                alignItems="center"
                              >
                                <p style={{ fontWeight: "bold" }}>
                                  {singleReply?.user.first_name}&nbsp;
                                  {singleReply?.user?.last_name}
                                </p>
                                {singleReply?.user?.isVerified ===
                                  "Approved" && (
                                    <VerifiedIcon
                                      color="info"
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  )}
                              </Stack>
                            </Link>
                            <Box sx={{ display: "flex" }}>
                              <p style={{ color: "silver" }}>
                                Posted at: {time}
                              </p>
                              <Box
                                onClick={() => {
                                  delComment(
                                    {
                                      comment_of:
                                        postOf === "company"
                                          ? "company_post"
                                          : postOf === "group"
                                            ? "group_post"
                                            : postOf === "page"
                                              ? "page_post"
                                              : null,
                                      comment_id: singleReply?.id,
                                    },
                                    postId,
                                    isShared ? "shared" : null
                                    // {
                                    //   shared: singleReply?.isShared ? "shared" : "",
                                    //   id: singleReply?.id,
                                    // }
                                  );
                                }}
                              >
                                {singleReply?.user?.id ===
                                  userFromContext?.data?.id && (
                                    <DeleteIcon
                                      fontSize="small"
                                      sx={{
                                        padding: "0 0 0 10px",
                                        cursor: "pointer",
                                        "&:hover": { color: "red" },
                                      }}
                                    />
                                  )}
                              </Box>
                            </Box>
                          </Box>

                          <p>{singleReply?.comment}</p>
                        </Stack>
                      </Stack>
                    </Stack>
                  );
                })
                : null}
            </div>
          );
        })
        : null}
    </>
  );
};

export default Foot;
