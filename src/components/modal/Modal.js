import { Box, Button, Stack, Typography } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useAppContext } from "../../context/app-context";

const Modal = (props) => {
  const [open, setOpen] = useState(true);
  const {
    setAllNewsFeed,
    setCompanyFormData,
    setGroupFormData,
    setPageFormData,
  } = useAppContext();
  return (
    <Box
      sx={{
        position: "fixed",
        display: open ? "flex" : "none",
        justifyContent: "center",
        alignItems: "center",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(1px)",
        transition: "all 0.3s ease-in-out",
        zIndex: "999",
      }}
    >
      <Stack
        direction={"column"}
        rowGap={2}
        alignItems={"center"}
        justifyContent={"center"}
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {props?.isError ? (
          <CloseIcon fontSize="large" color={"error"} />
        ) : (
          <DoneIcon fontSize="large" color={"success"} />
        )}
        <Typography
          variant="h4"
          color={props?.isError ? "darkred" : "darkgreen"}
        >
          {props?.isError ? "Error" : "Success"}
        </Typography>
        <p>{props?.msg}</p>
        <Button
          onClick={() => {
            setOpen(false);
            setAllNewsFeed((prev) => {
              return { ...prev, isModalOpen: false, msg: "", isError: false };
            });
            setCompanyFormData((prev) => {
              return {
                ...prev,
                isModalOpen: false,
                displayMessage: "",
                isError: false,
              };
            });
            setGroupFormData((prev) => {
              return {
                ...prev,
                isModalOpen: false,
                displayMessage: "",
                isError: false,
              };
            });
            setPageFormData((prev) => {
              return {
                ...prev,
                isModalOpen: false,
                displayMessage: "",
                isError: false,
              };
            });
          }}
          variant="outlined"
          color="info"
        >
          Ok
        </Button>
      </Stack>
    </Box>
  );
};

export default Modal;
