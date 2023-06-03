import { Box, Button, Hidden, List, ListItem, ListItemButton, ListItemIcon, Stack, Tooltip } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PlaceIcon from "@mui/icons-material/Place";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import GroupsIcon from "@mui/icons-material/Groups";
import defaultBg from "../../../images/defaultCover2.png";
import logo from "../../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../../context/app-context";
import { useState } from "react";
import ClickAwayListener from '@mui/material/ClickAwayListener';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { followCompany, unFollowCompany } from "../../../utils/helpers/company/company_crud";

const Banner = (props) => {
  const { user, companyFormData, setCompanyFormData, } = useAppContext();
  const [openTooltip, setOpenTooltip] = useState(false);
  const [isMember, setIsMember] = useState(true);
  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };
  const navigate = useNavigate();
  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"))
  // console.log("companyFormData", companyFormData)

  console.log("Props in Banner of Company", isMember);

  const handleFollowCompany = async (company_id) => {
    console.log("Following Company is running")
    const response = await followCompany(lsUser?.token?.access, company_id);
    if(response?.status || response?.status_code === 200) props?.setCompanyData((prev)=>({...prev, company: {...prev.company, member: true}}))
  }


  //==================== Follow Company =====================//
  const handleUnFollowCompany = async (company_id) => {
    console.log("Unfollowing Company is running")
    const response = await unFollowCompany(lsUser?.token?.access, company_id);
    if(response?.status || response?.status_code === 200) props?.setCompanyData((prev)=>({...prev, company: {...prev.company, member: false}}))
  }

  return (
    <Box
      padding={{ xs: "10px", md: "100px 10px 10px 10px" }}
      sx={{
        backgroundImage: `url(${props?.companyData?.company?.cover_pic || defaultBg
          })`,
        backgroundSize: "cover",
        backgroundColor: "white",
        backgroundPosition: "center",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        color: "black",
      }}
    >
      <Stack
        width={{ xs: "100%", md: "90%" }}
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        rowGap={1}
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        {/*=========================== left side ======================*/}
        <Stack direction="row" columnGap={1}>
          {/* logo */}
          <img
            width="80px"
            height="80px"
            src={props?.companyData?.company?.profile_pic || logo}
            alt="logo"
          />
          {/* info */}
          <Stack direction="column" rowGap={1}>
            {/* name */}
            <h3>{props?.companyData?.company?.company_name}</h3>
            {/* title */}
            <h4>{props?.companyData?.company?.headline}</h4>
            {/* description */}
            <p
              style={{
                maxWidth: "700px",
              }}
            >
              {props?.companyData?.company?.about}
            </p>
            {/* link */}
            <a href={props?.companyData?.company?.web_link}>
              {props?.companyData?.company?.web_link}
            </a>
            <p>{props?.companyData?.company?.company_mail}</p>
            {/* extra info */}
            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems={{ xs: "flex-start", md: "center" }}
              columnGap={1}
              rowGap={1}
            >
              {/* location */}
              <Stack direction="row" alignItems="center" columnGap={1}>
                {/* icon */}
                <PlaceIcon />
                {/* text */}
                <p>{props?.companyData?.company?.location}</p>
              </Stack>
              {/* divider */}
              <Hidden mdDown>|</Hidden>
              {/* day & night shift */}
              <Stack direction="row" alignItems="center" columnGap={1}>
                {/* icon */}
                <AccessTimeIcon />
                {/* text */}
                <p>{props?.companyData?.company?.working_shift} Shift</p>
              </Stack>
              {/* divider */}
              <Hidden mdDown>|</Hidden>
              {/* total employees and Link for List */}
              <Stack direction="row" columnGap={1} alignItems="center">
                {/* icon */}
                <GroupsIcon />
                {/* text */}
                <p>
                  {props?.companyData?.company?.company_employees}+ Total
                  Employees
                </p>
                <Link>View all</Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {/*=========================== right side =====================*/}
        <Stack
          ml={{ xs: 11, md: 0 }}
          direction="row"
          columnGap={1}
          alignItems="center"
        >
          {user?.data?.id !== props?.user_id && (
            <Button onClick={
              props?.member ? () => handleUnFollowCompany(props?.companyId) : () => handleFollowCompany(props?.companyId)
            } variant="outlined" color="info">
              {props?.member ? "Unfollow" : "Follow"}
            </Button>
          )}
          {props?.userId?.id || props?.user_id === lsUser?.data?.id ? 
          <>
          <ClickAwayListener onClickAway={handleTooltipClose}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={handleTooltipClose}
              open={openTooltip}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title={
                <>
                  {/* <Link to="/company/edit"> */}
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

                      setCompanyFormData((prev) => {
                        return {
                          ...prev, editMode: true,
                          id: props.companyId,
                          name: props?.companyData?.company?.company_name,
                          headline: props?.companyData?.company?.headline,
                          mail: props?.companyData?.company?.company_mail,
                          weblink: props?.companyData?.company?.web_link,
                          shifts: props?.companyData?.company?.working_shift,
                          category: props?.companyData?.company?.category,
                          address: props?.companyData?.company?.company_address,
                          employees: props?.companyData?.company?.company_employees,
                          // profile_pic: props?.companyData?.company?.profile_pic,
                          // cover_pic: props?.companyData?.company?.cover_pic,
                          about: props?.companyData?.company?.company_about,
                          opening_time: props?.companyData?.company?.opening_timing,
                          closing_time: props?.companyData?.company?.closing_timing,
                        };
                      }
                      )
                      navigate("/company/edit");

                    }}
                  >

                    <EditIcon fontSize="small" />
                    <p>edit</p>
                  </Stack>
                  {/* </Link> */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    columnGap={1}
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "red" },
                      width: "100%",
                    }}
                  // onClick={() => {
                  // handleDeletePost(postId, isShared, postOf, idOfParent);
                  // }}
                  >
                    <DeleteIcon fontSize="small" />
                    <p>delete</p>
                  </Stack>

                </>
              }
            >
              <MoreVertIcon
                onClick={() => setOpenTooltip(true)}
                fontSize="large"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    color: "teal",
                    transform: "scale(1.1)",
                    transition: "all 0.3s ease-in-out",
                  },
                }}
              />
            </Tooltip>
          </ClickAwayListener>
          </>
           : null}
          
        </Stack>
      </Stack>
    </Box>
  );
};

export default Banner;
