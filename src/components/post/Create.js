import { Avatar, Badge, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import PanoramaIcon from "@mui/icons-material/Panorama";
import styled from "@emotion/styled";
import DefaultProfile from "../../images/default.png";
import { useAppContext } from "../../context/app-context";
import PostDialog from "../dialog/PostDialog";

const CreatePost = (props) => {
  const { user, setPost } = useAppContext();

  const profilePic = user?.data?.profile_pic;

  //  ======================== post submit =======================

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme?.palette?.background?.paper}`,
    },
  }));

  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "10px",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        rowGap={1}
        p={1}
        ml={1}
        mr={1}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
          // width: "100%",
          height: "fit-content",
        }}
      >
        <Stack direction="row" alignItems="center" columnGap={2}>
          <Link to={`/profile/${user?.data?.id}`}>
            {user?.data?.show_online ? (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
                  sx={{ width: "50px", height: "50px" }}
                  alt="Remy Sharp"
                  src={profilePic ? profilePic : DefaultProfile}
                />
              </StyledBadge>
            ) : (
              <Avatar
                sx={{ width: "50px", height: "50px" }}
                src={profilePic ? profilePic : DefaultProfile}
                alt="roundedpic"
              />
            )}
          </Link>
          <Box
            onClick={() =>
              setPost((prev) => {
                return { ...prev, dialog: true };
              })
            }
            sx={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              cursor: "pointer",
              width: "100%",
              borderRadius: "50px",
              padding: "0px 14px",
              border: "1px solid silver",
              fontWeight: "bold",
              textTransform: "capitalize",
              "&:hover": {
                backgroundColor: "#f1f3f4",
              },
            }}
          >
            Start a post
          </Box>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          columnGap={1}
        >
          <Stack
            sx={{
              cursor: "pointer",
              padding: "5px",
              "&:hover": {
                backgroundColor: "#F0F0F0",
                borderRadius: "5px",
              },
            }}
            direction="row"
            columnGap={1}
            alignItems="center"
            onClick={() => {
              setPost((prev) => {
                return {
                  ...prev,
                  dialog: true,
                  imageMode: true,
                  videoMode: false,
                  displayLabels: true,
                };
              });
            }}
          >
            <PanoramaIcon fontSize="small" />
            <h4>Photo</h4>
          </Stack>
          <Stack
            sx={{
              cursor: "pointer",
              padding: "5px",
              "&:hover": {
                backgroundColor: "#F0F0F0",
                borderRadius: "5px",
              },
            }}
            direction="row"
            columnGap={1}
            alignItems="center"
            onClick={() => {
              setPost((prev) => {
                return {
                  ...prev,
                  dialog: true,
                  imageMode: false,
                  videoMode: true,
                  displayLabels: true,
                };
              });
            }}
          >
            <SmartDisplayIcon fontSize="small" />
            <h4>Video</h4>
          </Stack>
          {/* ===================== dialog for post creation ===================== */}
          <PostDialog />
        </Stack>
      </Stack>
    </Box>
  );
};

export default CreatePost;
