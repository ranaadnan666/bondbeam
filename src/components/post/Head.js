import { useState } from "react";
import { Avatar, Badge, Stack } from "@mui/material";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled";
import moment from "moment";
import { useAppContext } from "../../context/app-context";
import defaultPic from "../../images/default.png";
import Report from "../../pages/Report/Report";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { deleteAPost } from "../../utils/helpers/post/post_extra";
const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses?.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    border: "1px solid #dadde9",
  },
}));

const Head = ({ postData }) => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const {
    getNewsFeed,
    user,
    setPost,
    getUserTimeline,
    getCompanyNewsfeed,
    getGroupNewsfeed,
    getPageNewsfeed,
    setAllNewsFeed,
  } = useAppContext();

  const authUserId = user?.data?.id;
  const postUserId = postData?.user?.id || postData?.shared_by?.id;
  const postId = postData?.id;
  const postOf = postData?.post_of;
  const idOfParent =
    postData?.company || postData?.group || postData?.page || null;
  const isShared = postData?.shared_by ? true : false;
  const isOnline = postData?.user?.is_online || postData?.shared_by?.is_online;
  const isVerified =
    postData?.user?.is_verified || postData?.shared_by?.is_verified;
  const profilePic =
    postData?.user?.profile_pic || postData?.shared_by?.profile_pic;
  const firstName =
    postData?.user?.first_name || postData?.shared_by?.first_name;
  const lastName = postData?.user?.last_name || postData?.shared_by?.last_name;
  const createdAt = postData?.created_at;

// =============================Open Tooltip====================================
const handleTooltipClose = () => {
  setOpenTooltip(false);
};

const handleTooltipOpen = () => {
  setOpenTooltip(true);
};

// console.log(postData)

  // ===================== Delete post check condition  =====================
  const handleDeletePost = async (postId, isShared, postOf, idOfParent) => {
    setAllNewsFeed((prev) => {
      const tempArr = prev.data;
      const index = tempArr.findIndex((item) => item.id === postId);
      tempArr.splice(index, 1);
      return {
        ...prev,
        data: tempArr,
        isModalOpen: true,
        msg: "Post deleted Successfully",
        isError: false,
      };
    });
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await deleteAPost(lsUser?.token?.access, {
      request_for:
        postOf === "company"
          ? "company_post"
          : postOf === "group"
          ? "group_post"
          : postOf === "page"
          ? "page_post"
          : null,
      [isShared ? "shared_post_id" : "post_id"]: postId,
      delete: "Confirm",
    });
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      // setAllNewsFeed((prev) => {
      //   const tempArr = prev.data;
      //   const index = tempArr.findIndex((item) => item.id === postId);
      //   tempArr.splice(index, 1);
      //   return { ...prev, data: tempArr };
      // });
      // return postOf === "company"
      //   ? await getCompanyNewsfeed(idOfParent)
      //   : postOf === "group"
      //   ? await getGroupNewsfeed(idOfParent)
      //   : postOf === "page"
      //   ? await getPageNewsfeed(idOfParent)
      //   : postOf === "main"
      //   ? await getNewsFeed()
      //   : postOf === "timeline"
      //   ? await getUserTimeline(postUserId)
      //   : null;
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" columnGap={2}>
          <Link to={`/profile/${postUserId}`}>
            {isOnline ? (
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
                <Avatar alt="Remy Sharp" src={profilePic || defaultPic} />
              </StyledBadge>
            ) : (
              <Avatar
                sx={{ width: "40px", height: "40px" }}
                src={profilePic || defaultPic}
                alt="roundedpic"
              />
            )}
          </Link>
          <Stack direction="column" justifyContent="center">
            <Link
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                color: "black",
              }}
              to={`/profile/${postUserId}`}
            >
              <Stack direction="row" alignItems="center" columnGap={"2px"}>
                <p
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {firstName}&nbsp;
                  {lastName}
                </p>
                {isVerified === "Approved" && (
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
              {moment(createdAt).format("MMM YYYY, h:mm A")}
            </p>
            <p style={{ color: "silver" }}>
              {moment(createdAt).startOf("minute").fromNow()}
            </p>
          </Stack>
        </Stack>

        <HtmlTooltip  
        // onClickAway={handleTooltipClose}
          title={
            <Stack direction="column" alignItems="center">
              {postUserId === authUserId ? (
                <>
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={1}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "red" },
                      width: "100%",
                    }}
                    onClick={() => {
                      handleDeletePost(postId, isShared, postOf, idOfParent);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                    <p>delete</p>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={1}
                    onClick={() => {
                      setPost((prev) => {
                        return {
                          ...prev,
                          dialog: true,
                          editMode: true,
                          sharedPostId: postData?.shared_by
                            ? postData?.id
                            : null,
                          editPostId: postData?.id,
                          postIsShared: postData?.shared_by ? true : false,
                          postUserId,
                          media: postData?.shared_by
                            ? []
                            : (postData?.images?.length > 0 &&
                                postData?.images) ||
                              (postData?.videos?.length > 0 &&
                                postData?.videos),
                          desc: postData?.description,
                          imageMode:
                            postData?.images?.length > 0 ? true : false,
                          videoMode:
                            postData?.videos?.length > 0 ? true : false,
                        };
                      });
                    }}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "blue" },
                      width: "100%",
                    }}
                  >
                    <EditIcon fontSize="small" /> <p>edit</p>
                  </Stack>
                </>
              ) : (
                // <p>report-comming soon</p>
                <Report
                  postId={postData?.id}
                  sharedPost={postData?.shared_by || postData?.original_post} 
                />
              )}

              {!isShared && (
                <Stack
                  columnGap={1}
                  justifyContent="flex-start"
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "skyblue" },
                    width: "100%",
                  }}
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
                  alignItems="center"
                >
                  <ShareIcon />
                  <p>share</p>
                </Stack>
              )}
            </Stack>
          }
          disableFocusListener
          onClose={handleTooltipClose}
          open={openTooltip}
        >
          <MoreVertIcon
          onClick={handleTooltipOpen}
            fontSize="medium"
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "teal",
              },
            }}
          />
        </HtmlTooltip>
      </Stack>
    </>
  );
};

export default Head;
