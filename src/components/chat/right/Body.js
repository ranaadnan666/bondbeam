import { Avatar, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";
import { useAppContext } from "../../../context/app-context";

const Body = () => {
  const { messagesOfSingleChatRoom, activeChatUser } = useAppContext();
  useEffect(() => {
    const element = document.getElementById("your_div");
    element.scrollTop = element.scrollHeight;
  }, [messagesOfSingleChatRoom]);

  return (
    <Stack
      maxHeight={{
        xs: "calc(100vh - 120px)",
        sm: "calc(100vh - 210px)",
        md: "calc(100vh - 300px)",
      }}
      id="your_div"
      overflow={"auto"}
      mt={2}
      direction={"column"}
      rowGap={1}
      // backgroundColor="blue"
      fontSize={{ xs: "8px", sm: "10px", md: "12px", lg: "14px", xl: "14px" }}
    >
      {messagesOfSingleChatRoom
        ?.slice(0)
        .reverse()
        .map((message, index) => (
          <Stack
            direction={message.sms_sender === 1 ? "row" : "row-reverse"}
            padding={"5px"}
            columnGap={{ xs: "1px", sm: "3px", md: "5px" }}
            key={index}
            sx={{
              "&:hover": {
                backgroundColor: "lightgray",
              },
              borderRadius: "10px",
            }}
          >
            {/* <Avatar
              sx={{
                width: { xs: "20px", sm: "30px" },
                height: { xs: "20px", sm: "30px" },
                cursor: "pointer",
              }}
              src={activeChatUser?.other_user.user_pic}
            /> */}
            <Stack direction={"column"} rowGap={1} width="fit-content">
              <Stack
                direction={message.sms_sender === 1 ? "row" : "row-reverse"}
                columnGap={{ xs: "1px", sm: "3px", md: "5px" }}
                alignItems="center"
              >
                {/* <h5>Smith Johnson</h5> */}
                {/* dot */}
                <div
                  style={{
                    width: "5px",
                    height: "5px",
                    borderRadius: "50%",
                    backgroundColor:
                      message.sms_sender === 1 ? "silver" : "green",
                  }}
                ></div>
                <p style={{ fontSize: "10px" }}>
                  {moment(message.updated_at).format("hh:mm A")}
                </p>
              </Stack>
              <p
                style={{
                  padding:
                    message.sms_sender === 1
                      ? "0px 125px 0px 0px"
                      : "0px 0px 0px 125px",
                  textAlign: "justify",
                }}
              >
                {message.message}
              </p>
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
};

export default Body;
