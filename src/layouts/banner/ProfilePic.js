import { Box } from "@mui/material";
import defaultPic from "../../images/default.png";
import EditIcon from "@mui/icons-material/Edit";
import { useAppContext } from "../../context/app-context";

const ProfilePic = (props) => {
  const { user } = useAppContext();
  const profilePic = props.profile_pic || defaultPic;
  return (
    <Box
      sx={{
        backgroundImage: `url(${profilePic})`,
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
      {user?.data?.id === props?.user_id && (
        <EditIcon
          fontSize="large"
          onClick={props.handleProfilePic}
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
  );
};

export default ProfilePic;
