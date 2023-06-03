import { Box, Stack } from "@mui/material";
import defaultPic from "../../images/default.png";
import EditIcon from "@mui/icons-material/Edit";
import { useAppContext } from "../../context/app-context";

const ProfilePicForMobile = (props) => {
  const { user } = useAppContext();
  const profilePic = props?.profile_pic || defaultPic;
  return (
    <Stack direction="column" marginTop="-50px" textAlign="center">
      <Box
        sx={{
          width: "90px",
          height: "90px",
          margin: "0 auto",
          borderRadius: "50%",
          backgroundColor: "silver",
          backgroundImage: `url(${profilePic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        {user?.data?.id === props?.user_id && (
          <EditIcon
            fontSize="small"
            onClick={props?.handleProfilePic}
            sx={{
              padding: "2px",
              m: "2px",
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
      {/* <img
        width="90px"
        height="90px"
        style={{
          margin: "0 auto",
          borderRadius: "50%",
          backgroundColor: "silver",
        }}
        src={profilePic}
        alt="profile_picture"
      /> */}
      <p>
        <span style={{ fontWeight: "bold", textTransform: "capitalize" }}>
          {/* {props.firstName}&nbsp;{props.lastName} */}
          {props?.mainName}
        </span>
        <br />
        {/* <span style={{ opacity: "0.4" }}>@{props.userName}</span> */}
        <span style={{ opacity: "0.4" }}>{props?.headline}</span>
      </p>
    </Stack>
  );
};

export default ProfilePicForMobile;
