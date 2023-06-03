import {
  Box,
  Button,
  ClickAwayListener,
  Hidden,
  Stack,
  Tooltip,
} from "@mui/material";
import defaultPic from "../../images/defaultCover.webp";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useAppContext } from "../../context/app-context";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const CoverPic = (props) => {
  const { user } = useAppContext();
  const [openTooltip, setOpenTooltip] = useState(false);
  const navigate = useNavigate();
  const coverPic = props?.cover_pic || defaultPic;
  const { groupFormData, setGroupFormData, pageFormData, setPageFormData } =
    useAppContext();

  // console.log("groupFormData", groupFormData)
  // console.log("Props in CoverPic in banner", props?.groupData?.group);
  // console.log("grouping in coverpic", props?.group)
  // console.log("paging in coverpic", props?.page)

  // if (groupFormData?.editMode) navigate('/group/edit')
  // if (pageFormData?.editMode) navigate('/page/edit')

  const handleEdit = () => {
    if (props?.group) {
      setGroupFormData((prev) => {
        return {
          ...prev,
          editMode: true,
          name: props?.group?.group_name,
          id: props?.group?.id,
          phone_code: props?.group?.phone_code,
          phone_no: props?.group?.phone_no,
          category: props?.group?.category,
          // profile_pic: props?.group?.profile_pic,
          // cover_pic: props?.group?.cover_pic,
          about: props?.group?.group_about,
        };
      });
      navigate("/group/edit");
    }
    if (props?.page) {
      setPageFormData((prev) => {
        return {
          ...prev,
          editMode: true,
          name: props?.page?.page?.page_name,
          id: props?.page?.page?.id,
          phone_code: props?.page?.page?.phone_code,
          phone_no: props?.page?.page?.phone_no,
          category: props?.page?.page?.category,
          web_link: props?.page?.page?.web_link,
          location: props?.page?.page?.location,
          // profile_pic: props?.page?.page?.profile_pic,
          // cover_pic: props?.page?.page?.cover_pic,
          about: props?.page?.page?.page_about,
        };
      });
      navigate("/page/edit");
    }
  };

  const handleTooltipClose = () => {
    setOpenTooltip(false);
  };
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems={"flex-end"}
      sx={{
        backgroundImage: `url(${coverPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "100%",
        borderRadius: "10px",
        border: "1px solid silver",
        overflow: "hidden",
        textAlign: "right",
      }}
    >
      <Box>
        {user?.data?.id === props?.user_id && (
          <EditIcon
            fontSize="large"
            // onClick={props.handleCoverPic}
            sx={{
              padding: "5px",
              m: "5px",
              borderRadius: "50%",
              backgroundColor: "lightgray",
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
            }}
          />
        )}
      </Box>
      <Box
        sx={{
          background:
            "linear-gradient(180deg, rgba(122, 122, 135, 0.0001) 0%, #171725 131.54%)",
          height: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Hidden mdDown>
          <Stack
            direction={"column"}
            color="white"
            alignItems="flex-start"
            fontWeight={"bold"}
            p={1}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              columnGap={1}
            >
              {/* {props.mainTitle} */}
              <p>{props?.mainName}</p>
              {/* {/* {firstName}&nbsp;{lastName} */}
              {/* {isVerified === "Approved" && (
                <VerifiedIcon
                  color="info"
                  sx={{
                    fontSize: "18px",
                  }}
                />
              )}  */}
            </Stack>
            <p style={{ fontWeight: "normal" }}>{props?.headline}</p>
            {/* <p style={{ fontWeight: "normal" }}>@{userName}</p> */}
          </Stack>
        </Hidden>
        {/* {user?.data?.id !== userData?.data?.id && ( */}
        {props?.user_id !== user?.data?.id && (
          <Stack direction="row" alignItems={"center"} p={1}>
            <Button
              sx={{
                backgroundColor: "black",
                color: "white",
              }}
              // onClick={
              //   userData?.data?.follower
              //     ? () => onUnFollow({ following_user: userData?.data?.id })
              //     : () => onFollow({ following_user: userData?.data?.id })
              // }
              variant="contained"
            >
              {props.actionBtn}
              {/* {userData?.data?.follower ? "UnFollow" : "Follow"} */}
            </Button>
            {/* profile menu */}

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
                    {/* <Link to="/group/edit"> */}
                    <Stack
                      direction="row"
                      alignItems="center"
                      columnGap={1}
                      sx={{
                        cursor: "pointer",
                        "&:hover": { color: "red" },
                        width: "100%",
                      }}
                      onClick={handleEdit}
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

            {/* <MoreVertIcon
              // onClick={handleClick}
              fontSize="large"
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "teal",
                  transform: "scale(1.1)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            /> */}
            {/* <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseDots}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              sx={{
                "&:hover": {
                  color: "red",
                },
              }}
              // onClick={
              //   userData?.data?.is_blocked_user
              //     ? () => {
              //         handleCloseDots();
              //         unBlockUser(userData?.data?.id);
              //       }
              //     : () => {
              //         handleCloseDots();
              //         blockUser(userData?.data?.id);
              //       }
              // }
            >
              <Stack direction={"row"} columnGap={1} alignItems={"center"}>
                {userData?.data?.is_blocked_user ? (
                  <LockOpenIcon />
                ) : (
                  <BlockIcon />
                )}
                {userData?.data?.is_blocked_user ? "UnBlock" : "Block"}
              </Stack>
            </MenuItem>
            <MenuItem
              sx={{
                "&:hover": {
                  color: "red",
                },
              }}
            >
              <Report handleCloseDots={handleCloseDots} />
            </MenuItem>
            <MenuItem
              sx={{
                "&:hover": {
                  color: "skyblue",
                },
              }}
            >
              <Stack
                direction="row"
                columnGap={1}
                alignItems="center"
                onClick={() => {
                  setAboutDialog(true);
                }}
              >
                <InfoIcon />
                <p>About this profile</p>
              </Stack>
            </MenuItem>
            <Dialog
              open={aboutDialog}
              onClose={() => setAboutDialog(false)}
              sx={{
                "& .MuiDialog-paper": {
                  borderRadius: "10px",
                  border: "1px solid silver",
                  overflow: "hidden",
                  padding: "1rem",
                  width: { xs: "90%", sm: "50%", md: "30%" },
                },
              }}
            >
              <AboutProfile
                setAboutDialog={setAboutDialog}
                userData={userData}
              />
            </Dialog>
          </Menu> */}
          </Stack>
        )}
        {/* )} */}
      </Box>
    </Stack>
  );
};

export default CoverPic;
