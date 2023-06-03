import React from "react";
import { Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import DefaultProfile from "../../images/default.png";
import { followCompany, unFollowCompany } from "../../utils/helpers/company/company_crud";
import { likePage, unLikePage } from "../../utils/helpers/page/page_crud";
import { joinGroup, leaveGroup } from "../../utils/helpers/group/group_crud";
const InfoProfileCard = (props) => {
  // console.log("props in info Profile Card", props);

  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  // console.log("User is Here in InfoProfileCard", lsUser?.token.access);


  //==================== UnFollow Company =====================//
  const handleFollowCompany = async (company_id) => {
    // console.log("Following Company is running")
    const response = await followCompany(lsUser?.token?.access, company_id);
    return response;
  }


  //==================== Follow Company =====================//
  const handleUnFollowCompany = async (company_id) => {
    // console.log("Unfollowing Company is running", lsUser?.token?.access)
    const response = await unFollowCompany(lsUser?.token?.access, company_id);
    return response;
  }

  //==================== Like Page =====================//
  const handleLikePage = async (page_id) => {
    console.log("handleLikePage is running")
    const response = await likePage(lsUser?.token.access, page_id)

    return response;
  }


  //==================== Unlike Page =====================//
  const handleUnLikePage = async (page_id) => {
    console.log("handleUnLikePage is running")
    const response = await unLikePage(lsUser?.token.access, page_id);
    return response;
  }

  //==================== Join Group =====================//
  const handleJoinGroup = async (page_id) => {
    // console.log("Joining Group is running")
    const response = await joinGroup(lsUser?.token.access, page_id);
    return response;
  }


  //==================== Leave Group =====================//
  const handleLeaveGroup = async (page_id) => {
    // console.log("handleLeaveGroup is running")
    const response = await leaveGroup(lsUser?.token.access, page_id);
    return response;
  }




  // console.log("Props in InfoProfileCard", props);

  return (
    <Stack
      direction="row"
      justifyContent={"space-between"}
      columnGap={1}
      alignItems="center"
    >
      <Stack direction="row" columnGap={1}>
        <img
          width="80px"
          height="80px"
          style={{
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={props.profilePic || DefaultProfile}
          alt="profile pic"
        />
        <Stack direction="column" rowGap={1}>
          <Link
            style={{ fontSize: "22px" }}
            to={
              props.title === "Company"
                ? `/company/user_company/${props.id}`
                : props.title === "Group"
                  ? `/group/user_group/${props.id}`
                  : props.title === "Page"
                    ? `/page/user_page/${props.id}`
                    : null
            }
          >
            {/* <h3>{props.name}</h3> */}
            {props.name}
          </Link>
          {/* <p>{props.headline}</p> */}
          {props.headline} <br />
          {/* <p style={{ maxWidth: "500px" }}>{props.about?.substring(0, 150)}</p> */}
          {props.about?.substring(0, 150)}
        </Stack>
      </Stack>
      {
        props?.userId?.id || props?.userId === lsUser?.data?.id ? (
          <Link 
          style={{ textDecoration: "none" }}
            to={
              props.title === "Company"
                ? `/company/user_company/${props.id}`
                : props.title === "Group"
                  ? `/group/user_group/${props.id}`
                  : props.title === "Page"
                    ? `/page/user_page/${props.id}`
                    : null
            }>
            <Button variant="outlined" color="info"
        
            >
              Go To
            </Button>
          </Link>
        ) :
          (<Button variant="outlined" color="info"
            onClick={
              props.title === "Company"
                ? props.member === true ? () => handleUnFollowCompany(props.id) : () => handleFollowCompany(props.id)

                : props.title === "Group"
                  ? props.member === true ? () => handleLeaveGroup(props.id) : () => handleJoinGroup(props.id)
                  : props.title === "Page"
                    ? props.member === true ? () => handleUnLikePage(props.id) : () => handleLikePage(props.id)
                    : null
            }>
            {props.title === "Company"
              ? props.member === true ? "UnFollow" : "Follow"
              : props.title === "Group"
                ? props.member === true ? "Leave" : "Join"
                : props.title === "Page"
                  ? props.member === true ? "UnLike" : "Like"

                  : null}
          </Button>
          )

      }

      {/* {(props.userId.id || props.userId ) === lsUser.data.id ? (
        <Button variant="outlined" color="info" 
        onClick={
          props.title === "Company"
            ? handleUnFollowCompany(props.id)
            : props.title === "Group"
              ? "Join"
              : props.title === "Page"
                ? "Like"
                : null
        }>
          {props.title === "Company"
            ? "Unfollow"
            : props.title === "Group"
              ? "Joined"
              : props.title === "Page"
                ? "Liked"
                : null}
        </Button>
      ) : <Button variant="outlined" color="info" onClick={
        props.title === "Company"
          ? handleFollowCompany(props.id)
          : props.title === "Group"
            ? "Join"
            : props.title === "Page"
              ? "Like"
              : null
      }>
        {props.title === "Company"
          ? "Follow"
          : props.title === "Group"
            ? "Join"
            : props.title === "Page"
              ? "Like"
              : null}
      </Button>} */}

      {/* { (
        <Button variant="outlined" color="info">
          {props.title === "Company"
            ? "Follow"
            : props.title === "Group"
            ? "Join"
            : props.title === "Page"
            ? "Like"
            : null}
        </Button>
      )} */}
    </Stack>
  );
};

export default InfoProfileCard;
