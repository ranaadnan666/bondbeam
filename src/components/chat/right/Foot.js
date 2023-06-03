import { Stack } from "@mui/material";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import GifIcon from "@mui/icons-material/Gif";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SendIcon from "@mui/icons-material/Send";
import { useAppContext } from "../../../context/app-context";
import { baseUrlWebSocket } from "../../../utils/constants/base_urls";
import { useState } from "react";

const Foot = () => {
  const [message, setMessage] = useState("");
  const {
    chatRoomId,
    chatUserId,
    setMessagesOfSingleChatRoom,
    getSingleUserChatList,
  } = useAppContext();
  const socket =
    chatRoomId && new WebSocket(`${baseUrlWebSocket}${chatRoomId}/`);

  const getMessages = () => {
    socket.onmessage = function (e) {
      let data = JSON.parse(e.data);

      if (data.message) {
        setMessagesOfSingleChatRoom((prev) => {
          let tempArr = [...prev];
          tempArr.unshift(data);
          return tempArr;
        });
      }
    };
  };
  const sendMessage = () => {
    socket.send(
      JSON.stringify({
        message: message,
        sms_sender: `${chatUserId}`,
      })
    );
    setMessage("");
    getMessages();
  };
  return (
    <Stack
      mt={2}
      direction={"column"}
      rowGap={1}
      // backgroundColor="red"
      fontSize={{
        xs: "8px",
        sm: "10px",
        md: "12px",
        lg: "14px",
        xl: "14px",
      }}
    >
      <textarea
        placeholder="Write a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{
          resize: "none",
          padding: "5px",
          borderRadius: "10px",
          border: "none",
          outline: "none",
          backgroundColor: "#F3F2EF",
          fontSize: "inherit",
        }}
      ></textarea>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} alignItems={"center"}>
          <PhotoSizeSelectActualIcon
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
          <AttachFileIcon
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
          <GifIcon
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
          <SentimentSatisfiedAltIcon
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
        <SendIcon
          onClick={sendMessage}
          sx={{
            cursor: "pointer",
            padding: "4px",
            fontSize: { xs: "10px", md: "15px", lg: "20px" },
            color: "#666666",
            "&:hover": {
              color: "skyblue",
            },
          }}
        />
      </Stack>
    </Stack>
  );
};

export default Foot;
