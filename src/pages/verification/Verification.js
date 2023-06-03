import { Alert, Box, Button, Hidden, Stack } from "@mui/material";
import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Logo from "../../images/drawerlogo.svg";
import Loading from "../../components/loading/Loading";
import { useAppContext } from "../../context/app-context";
import { verifyEmail, resendCode } from "../../utils/helpers/auth/auth";

const Verification = () => {
  const navigate = useNavigate();
  const { loading, setLoading, setErrMsg, errMsg } = useAppContext();
  const verifyRef = useRef();
  const { verifyId } = useParams();
  // ==================== email verification ====================
  const handleSubmit = async () => {
    setLoading(true);
    const response = await verifyEmail({
      id: verifyId,
      otp: verifyRef.current.value,
    });
    if (response?.status === true && response?.status_code === 200) {
      setLoading(false);
      localStorage.setItem("userLoggedIn", JSON.stringify(response));
      navigate("/");
    }
    if (response?.status === false && response?.status_code === 400) {
      setLoading(false);
      setErrMsg(response?.msg);
    }
  };
  // ======================= resend code =======================
  const handleResend = async (id) => {
    setLoading(true);
    const response = await resendCode({ id });
    if (response?.status === true && response?.status_code === 200) {
      setLoading(false);
      setErrMsg("Code sent successfully, please check your email");
    }
    if (response?.status === false && response?.status_code === 400) {
      setLoading(false);
      setErrMsg(response.msg);
    }
  };
  return (
    <>
      {loading && <Loading />}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "90vh",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0px",
        }}
      >
        <Stack
          direction="column"
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="center"
          rowGap={6}
          textAlign={{ xs: "left", md: "center" }}
          width={{ xs: "100%", sm: "80%", md: "50%", lg: "40%" }}
          sx={{
            height: "690px",
            borderRadius: "10px",
            boxShadow: "0px 0px 67px rgba(0, 0, 0, 0.1)",
            padding: "0px 10px",
          }}
        >
          <Hidden mdUp>
            <img
              src={Logo}
              style={{ width: "186px", height: "30px", margin: "0 auto" }}
              alt=""
            />
          </Hidden>
          <p style={{ fontSize: "30px", fontWeight: "600", color: "#373737" }}>
            Security Verification
          </p>
          <p
            style={{
              fontSize: "22px",
              maxWidth: "300px",
              fontWeight: "600",
              color: "#373737",
            }}
          >
            Enter the code that was sent to your provided Email.
          </p>
          <input
            style={{
              width: "90%",
              height: "40px",
              borderRadius: "5px",
              fontSize: "18px",
              border: "1px solid #0A66C2",
              padding: "0 10px",
              outline: "none",
              margin: "0 auto",
            }}
            placeholder="Enter Verification Code"
            ref={verifyRef}
            type="text"
          />
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <p style={{ fontWeight: "600", fontSize: "18px" }}>
            Didn’t receive the code?&nbsp;
            <span
              onClick={() => handleResend(verifyId)}
              style={{ color: "#0A66C2", cursor: "pointer" }}
            >
              Resend Code
            </span>
          </p>
          <Button
            sx={{
              fontSize: "22px",
              width: "85%",
              height: "40px",
              backgroundColor: "black",
              color: "white",
            }}
            variant="contained"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Verification;
