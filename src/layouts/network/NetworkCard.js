import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import RoundedPic from "../../images/album/album1.jpeg";
import ClearIcon from "@mui/icons-material/Clear";
import {
  actionConection,
  createConection,
} from "../../utils/helpers/network/network";
import { useAppContext } from "../../context/app-context";
const NetworkCard = (props) => {
  const { getMySuggestion } = useAppContext();
  const { getMyNetwork } = useAppContext();
  const handleAcceptConnection = async (id, request_for) => {
    const response = await actionConection(id, request_for);
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      getMyNetwork(props?.filter_by);
    }
  };

  const handleCloseConnection = async (id, request_for) => {
    const response = await actionConection(id, request_for);
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      getMyNetwork(props?.filter_by);
    }
  };
  const handleRejectConnection = async (id, request_for) => {
    const response = await actionConection(id, request_for);
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      getMyNetwork(props?.filter_by);
    }
  };
  const handleDenyConnection = async (id, request_for) => {
    const response = await actionConection(id, request_for);
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      getMyNetwork(props?.filter_by);
    }
  };

  const handleCreateConnection = async (id) => {
    const response = await createConection(id);
    if (
      response?.status ||
      response?.status_code === 200 ||
      response?.success
    ) {
      getMySuggestion(id);
    }
  };

  return (
    <>
      <Card
        sx={{
          "&:hover": {
            boxShadow: "0 0 11px rgba(33,33,33,.2)",
            bgcolor: "white",
          },
        }}
      >
        <CardActionArea>
          <ClearIcon
            onClick={
              props?.filter_by === "get_connections"
                ? () => handleCloseConnection(props?.id, "close_connection")
                : props?.filter_by === "request_to"
                ? () => handleRejectConnection(props?.id, "reject_connection")
                : props?.filter_by === "request_by"
                ? () => handleDenyConnection(props?.id, "deny_connection")
                : "null"
            }
            sx={{
              background: "rgb(0 0 0 / 60%)",
              borderRadius: "50%",
              position: "absolute",
              justifyItems: "flex-end",
              display: "flex",
              color: "white",
              right: 6,
              top: "10px",
              fontSize: "30px",
            }}
          />
          <CardMedia
            component="img"
            height="100"
            image={props?.cover_pic ? props?.cover_pic : RoundedPic}
            sx={{ background: "" }}
            alt="cover pic"
          />
          <Avatar
            alt="Profile"
            src={props?.profile_pic ? props?.profile_pic : RoundedPic}
            sx={{
              width: 100,
              height: 100,
              marginTop: "-60px",
              marginLeft: "5px",
              justifyItems: "center",
            }}
          />
          <CardContent
            sx={{
              height: "80px",
            }}
          >
            <h3>
              {props?.first_name}&nbsp;{props?.last_name}
            </h3>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                height: "40px",
                overflow: "hidden",
              }}
            >
              <b>{props?.about}</b>
            </Typography>
            <Typography variant="body2">
              <b>{props?.work_place}</b>
            </Typography>
          </CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              padding: "0px 10px",
            }}
          >
            {props?.followers_count}&nbsp;Connection
          </Typography>
          <CardActions>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: " 1.6rem",
                color: "#0a66c2",
                border: "1px solid #0a66c2",
              }}
              onClick={
                props?.filter_by === "request_to"
                  ? () => handleAcceptConnection(props?.id, "accept_connection")
                  : () => handleCreateConnection(props?.id, "create_connection")
              }
            >
              {props?.filter_by === "request_to"
                ? "Accept"
                : props?.filter_by === "request_by"
                ? "Requested"
                : props?.filter_by === "get_connections"
                ? "Message"
                : "Connect"}
            </Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </>
  );
};

export default NetworkCard;
