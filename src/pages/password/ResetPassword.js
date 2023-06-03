import { Alert, Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../components/loading/Loading";
import { useAppContext } from "../../context/app-context";
import { resetPassword } from "../../utils/helpers/auth/auth";

const ResetPassword = () => {
  let navigate = useNavigate();
  const { setLoading, loading, errMsg } = useAppContext();
  const [ChangePassword, setChangePassword] = useState({
    new_password: "",
    confirm_password: "",
  });

  const ChangePass = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setChangePassword((PreV) => {
      return {
        ...PreV,
        [name]: value,
      };
    });
  };

  const handleResetPassword = async () => {
    const { new_password, confirm_password } = ChangePassword;
    setLoading(true);
    const response = await resetPassword({ new_password, confirm_password });
    if (response.status === true || response.status_code === 200) {
      setLoading(false);
      Swal.fire({
        title: "Success",
        text: response.msg,
        icon: "success",
        confirmButtonText: "OK",
      });
      navigate("/signin");
    } else {
      setLoading(false);
      Swal.fire({
        title: "Wrong",
        text: response.msg,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      {loading && <Loading />}
      <Box
        height={{ xl: "80vh", lg: "80vh", xs: "50vh" }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {errMsg && <Alert severity="error">{errMsg}</Alert>}
        <Box
          width={{ xl: "30%", lg: "30%", sm: "50%", xs: "100%" }}
          sx={{
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
            borderRadius: "10px",
            padding: "30px",
          }}
          margin={{ xs: "1rem" }}
        >
          <Typography
            variant="h3"
            sx={{ fontSize: "1.5rem", fontWeight: "700" }}
          >
            Reset password
          </Typography>

          <Typography sx={{ fontWeight: "700", marginTop: "1rem" }}>
            New password
          </Typography>
          <input
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid gray",
              outline: "none",
            }}
            type="text"
            placeholder="current password"
            name="new_password"
            value={ChangePassword.new_password}
            onChange={ChangePass}
          />

          <Typography sx={{ fontWeight: "700", marginTop: "1rem" }}>
            Re-type password
          </Typography>
          <input
            style={{
              width: "100%",
              border: "none",
              borderBottom: "1px solid gray",
              outline: "none",
            }}
            type="text"
            placeholder="re-type"
            name="confirm_password"
            value={ChangePassword.confirm_password}
            onChange={ChangePass}
          />

          <Button
            sx={{ mt: "2rem", width: "30%" }}
            onClick={handleResetPassword}
            variant="outlined"
          >
            save
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
