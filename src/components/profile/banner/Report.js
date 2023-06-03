import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/system";
import { TextareaAutosize } from "@mui/material";
import Swal from "sweetalert2";
import FlagIcon from "@mui/icons-material/Flag";
import { useParams } from "react-router";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Report = ({ userId, sharePost, setCurrIndex, handleCloseDots }) => {
  let userReportId = useParams();
  const [discriptionText, setdiscriptionText] = useState({
    discription: "",
    reported_user: userReportId.userId,
    shared_post_user: sharePost,
  });

  const DataSaverOff = async () => {
    const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    // let usrId = authUser.data.id

    const { discription, reported_user, shared_post_user } = discriptionText;
    const data = await fetch(`https://api.bondbeam.com/api/report_to_user/`, {
      method: "POST",
      body: JSON.stringify({ discription, reported_user, shared_post_user }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authUser?.token?.access}`,
      },
    });
    let result = await data.json();
    if (result?.status === true) {
      Swal.fire({
        title: "Success",
        text: "Your report has been sent successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      // setCurrIndex(null);
    } else {
      // const err = ddd.detail ? ddd.detail : Object.values(ddd?.msg);
      // setCurrIndex(null);
      Swal.fire({
        title: "Error",
        text: "You have already reported for this post",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const roportNow = (e) => {
    const { name, value } = e.target;

    setdiscriptionText((PreV) => {
      return {
        ...PreV,
        [name]: value,
      };
    });
  };

  const authuser = JSON.parse(localStorage.getItem("userLoggedIn"));
  // const authToken = authuser.token.access;
  const authName = authuser.data.username;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Stack
        onClick={() => {
          handleClose();
          handleClickOpen();
        }}
        direction="row"
        alignItems="center"
        columnGap={1}
        sx={{
          cursor: "pointer",
          "&:hover": {
            color: "red",
          },
        }}
      >
        <FlagIcon sx={{ cursor: "pointer" }} />
        <p>Report</p>
      </Stack>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Stack direction="row">
            <Typography sx={{ fontWeight: "800" }}>Reported by </Typography>{" "}
            <Typography
              sx={{
                fontSize: "1rem",
                pl: "0.6rem",
                textDecoration: "underline",
              }}
            >
              @ {authName}
            </Typography>
          </Stack>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <TextareaAutosize
            name="discription"
            placeholder="Report Here ....."
            value={discriptionText.discription}
            onChange={roportNow}
            style={{
              width: 500,
              height: 300,
              padding: "2rem",
              textTransform: "capitalize",
              fontSize: "20px",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            variant="outlined"
            onClick={() => {
              handleClose();
              DataSaverOff();
              handleCloseDots();
            }}
          >
            Report
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default Report;
