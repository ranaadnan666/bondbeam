import { Alert, Box, Button, Typography } from "@mui/material";
import { useRef } from "react";
import { useAppContext } from "../../context/app-context";
import Loading from "../../components/loading/Loading";
import { forgetPassword } from "../../utils/helpers/auth/auth";

const ForgetPassword = () => {
  const { loading, setLoading, errMsg, setErrMsg } = useAppContext();
  const emailRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await forgetPassword({
      email: emailRef?.current?.value,
      request_for: "staging",
    });
    setLoading(false);
    setErrMsg(response?.msg);
  };
  return (
    <>
      {loading && <Loading />}
      <form>
        <Box
          p={2}
          height={{ xl: "80vh", lg: "80vh", xs: "50vh" }}
          sx={{
            // width:"100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              boxShadow:
                "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              borderRadius: "10px",
              padding: "30px",
            }}
          >
            {errMsg && <Alert severity="error">{errMsg}</Alert>}
            <Typography
              variant="h3"
              sx={{
                fontSize: "1.5rem",
                fontWeight: "700",
                paddingBottom: "0.8rem",
              }}
            >
              Forget password
            </Typography>
            <Typography
              variant="h6"
              sx={{ fontSize: "1rem", paddingBottom: "0.8rem" }}
            >
              "To reset your password, please enter your email address"
            </Typography>
            <input
              ref={emailRef}
              style={{
                width: "100%",
                border: "none",
                borderBottom: "1px solid gray",
                backgroundColor: "white",
                outline: "none",
              }}
              id="standard-basic"
              placeholder="Type Your Email Address"
              variant="standard"
            />

            <Button
              sx={{ mt: "2rem" }}
              type="submit"
              variant="outlined"
              onClick={(e) => handleSubmit(e)}
            >
              Get Link
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
};

export default ForgetPassword;
