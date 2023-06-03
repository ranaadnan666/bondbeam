import { Stack } from "@mui/material";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useAppContext } from "../../../context/app-context";

const Head = () => {
  const { activeChatUser, chatUserId, chatUsers } = useAppContext();
  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        // backgroundColor="teal"
        fontSize={{
          xs: "8px",
          md: "12px",
          lg: "14px",
        }}
      >
        <Stack direction={"column"}>
          <h4>{activeChatUser?.other_user?.username}</h4>
          <p>
            {activeChatUser?.other_user?.is_online ? "Active now" : "Offline"}
          </p>
        </Stack>
        <Stack direction="row" justifyContent={"center"} alignItems="center">
          <MoreHorizIcon
            sx={{
              cursor: "pointer",
              padding: "4px",
              fontSize: { xs: "10px", md: "15px", lg: "20px" },
              borderRadius: "50%",
              color: "#666666",
              "&:hover": {
                backgroundColor: "#F3F2EF",
                color: "skyblue",
              },
            }}
          />
          <AddIcCallIcon
            sx={{
              cursor: "pointer",
              padding: "4px",
              fontSize: { xs: "10px", md: "15px", lg: "20px" },
              borderRadius: "50%",
              color: "#666666",
              "&:hover": {
                backgroundColor: "#F3F2EF",
                color: "skyblue",
              },
            }}
          />
          <VideoCallIcon
            sx={{
              cursor: "pointer",
              padding: "4px",
              borderRadius: "50%",
              fontSize: { xs: "10px", md: "15px", lg: "20px" },
              color: "#666666",
              "&:hover": {
                backgroundColor: "#F3F2EF",
                color: "skyblue",
              },
            }}
          />
        </Stack>
      </Stack>
    </>
  );
};

export default Head;
