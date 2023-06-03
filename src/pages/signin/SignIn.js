import { Alert, Box, Button, Stack } from "@mui/material";
import Logo from "../../images/drawerlogo.svg";
import PersonIcon from "../../images/person.png";
import LockIcon from "../../images/lock.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Loading from "../../components/loading/Loading";
import jwt_decode from "jwt-decode";
import { useAppContext } from "../../context/app-context";
import { login, loginWithGoogle } from "../../utils/helpers/auth/auth";
import { getFirebaseToken, onForegroundMessage } from "./../../firebase";
import Swal from "sweetalert2";
import React from 'react';
import { fcm_token } from "../../utils/helpers/user/user_data";
// import ReactDOM from 'react-dom';
// import FacebookLogin from 'react-facebook-login';
// import { responseFacebook } from "../../utils/helpers/auth/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const { setToken, loading, setLoading, errMsg, setErrMsg } = useAppContext();
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const [device_id, setDeviceId] = useState("");
  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        localStorage.setItem("fireBaseUserToken", firebaseToken);
        setDeviceId(firebaseToken);

        if (firebaseToken) {
          // setShowNotificationBanner(false);
        }
      })
      .catch((err) =>
        console.error("An error occured while retrieving firebase token. ", err)
      );
  };
  useEffect(() => {
    handleGetFirebaseToken();
    //=========>Testing <==================

    // Swal.fire({
    //      title: 'Auto close alert!',
    //     text: 'I will close in 2 seconds.',
    //      timer: 2000
    //     })
    //
    // onForegroundMessage()
    //   .then((payload) => {
    //     localStorage.setItem("notifications", JSON.stringify(payload));
    //
    //
    //     alert(payload.notification.title)
    //     Swal.fire({
    //       title: payload?.notification.title,
    //       text: payload.notification.body,
    //       timer: 2000,
    //     });
    //   })
    //   .catch((err) =>
    //
    //   );
  });
  // const device_id = localStorage.getItem("fireBaseUserToken");
  // login with email and password
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (emailRef.current.value === "" || passwordRef.current.value === "" || device_id === null || device_id === undefined) {
      setErrMsg("Please fill in all the fields");
    } else {
      setLoading(true);
      const response = await login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        device_id: device_id ||  localStorage.getItem("fireBaseUserToken"),
      });
      if (response.status === true && response.status_code === 200) {
        fcm_token(device_id ||  localStorage.getItem("fireBaseUserToken"), response?.token?.access)
        setLoading(false);
        localStorage.setItem("userLoggedIn", JSON.stringify(response));
        setToken(response?.token?.access);
      } else if (response.status_code === 503) {
        setLoading(false);
        // navigate("/maintenance");
      } else {
        setLoading(false);
        setErrMsg(response?.msg);
      }
    }
  };
  // login with google
  async function loginGoogle(responseFromGoogle) {
    var useresp = jwt_decode(responseFromGoogle.credential);
    const obj = {
      iss: useresp.iss,
      email_verified: useresp?.email_verified ? "true" : "false",
      email: useresp.email,
      name: useresp.name,
      picture: useresp.picture,
      device_id: device_id || localStorage.getItem("fireBaseUserToken"),
    };
    setLoading(true);
    const response = await loginWithGoogle(obj);
    if (response.status === true && response.status_code === 200) {
      fcm_token(device_id ||  localStorage.getItem("fireBaseUserToken"), response?.token?.access)
      setLoading(false);
      console.log("login with google response", response?.token?.access);
      localStorage.setItem("userLoggedIn", JSON.stringify(response));
      setToken(response?.token?.access);
    }
    if (response.status_code === 503) {
      setLoading(false);
      navigate("/maintenance");
    }
  }




  useEffect(() => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    if (!lsUser?.token?.access) {
      window?.google?.accounts?.id.initialize({
        client_id:
          "895441758319-tjs4folfb2b4r5utlfa4hnj6vh5fu91f.apps.googleusercontent.com",
        callback: loginGoogle,
      });
      window?.google?.accounts?.id.renderButton(
        document.getElementById("button_login"),
        { theme: "outline", size: "medium" }
      );
    }
    // eslint-disable-next-line
  }, []);
  const get = async (data) => {
    const obj = {
      email: data.email,
      name: data.name,
      userID: data.userID,
      id: data.id,
      graphDomain: data.graphDomain,
      device_id: device_id || localStorage.getItem("fireBaseUserToken"),
    };

    await fetch("https://api.bondbeam.com/api/facebook_login/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    }).then((resp) => {
      resp.json().then((result) => {
        navigate("/");
        if (result.status && result.msg) {
          localStorage.setItem("userLoggedIn", JSON.stringify(result));
          setToken("true");
        }
      });
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {loading && <Loading />}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          minHeight: "90vh",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 0px",
        }}
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          rowGap={2}
          width={{ xs: "90%", sm: "70%", md: "50%", lg: "40%", xl: "30%" }}
          sx={{
            height: "fit-content",
            borderRadius: "10px",
            boxShadow: "0px 0px 67px rgba(0, 0, 0, 0.1)",
            padding: "40px 0px",
          }}
        >
          <img width="242px" height="40px" src={Logo} alt="logo" />
          <p style={{ fontSize: "30px", fontWeight: "600", color: "#373737" }}>
            Sign In
          </p>
          <Stack
            direction="row"
            alignItems="center"
            columnGap={2}
            sx={{
              width: "80%",
              height: "40px",
              boxShadow: "0px 1px 2px rgba(55, 65, 81, 0.08)",
              borderRadius: "4px",
              border: "1px solid #BEBEBE",
              padding: "0px 22px",
            }}
          >
            <img width="24px" height="24px" src={PersonIcon} alt="personicon" />
            <input
              style={{
                width: "90%",
                height: "80%",
                padding: "0px 10px",
                border: "none",
                outline: "none",
                fontSize: "18px",
              }}
              name="email"
              // value={user.email}
              // onChange={handleChange}
              ref={emailRef}
              type="email"
              placeholder="Email Address"
              required
            />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            columnGap={2}
            sx={{
              width: "80%",
              height: "40px",
              boxShadow: "0px 1px 2px rgba(55, 65, 81, 0.08)",
              borderRadius: "4px",
              border: "1px solid #BEBEBE",

              padding: "0px 22px",
            }}
          >
            <img width="24px" height="24px" src={LockIcon} alt="personicon" />
            <input
              style={{
                width: "90%",
                height: "80%",
                padding: "0px 10px",
                border: "none",
                outline: "none",
                fontSize: "18px",
              }}
              name="password"
              // value={user.password}
              // onChange={handleChange}
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />

            {showPassword ? (
              <VisibilityIcon
                onClick={() => setShowPassword(false)}
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <VisibilityOffIcon
                onClick={() => setShowPassword(true)}
                sx={{ cursor: "pointer" }}
              />
            )}
          </Stack>
          {errMsg && <Alert severity="error">{errMsg}</Alert>}
          <Box
            sx={{
              width: "100%",
              textAlign: "right",
              paddingRight: "100px",
              cursor: "pointer",
            }}
          >
            <NavLink to="/forget_password" style={{ color: "#0A66C2" }}>
              Forgot Password?
            </NavLink>
          </Box>
          <Button
            sx={{
              fontSize: "22px",
              width: "85%",
              height: "40px",
              backgroundColor: "black",
              color: "white",
            }}
            variant="contained"
            type="submit"
          >
            Sign In
          </Button>

          {/* <FacebookLogin className="btn"
    appId="871086320852836"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    icon="fa-facebook"
  /> */}
         

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            columnGap={2}
          >
            <Box
              sx={{ width: "140px", height: "2px", backgroundColor: "#BEBEBE" }}
            ></Box>
            <p style={{ color: "#BEBEBE" }}>OR</p>
            <Box
              sx={{ width: "140px", height: "2px", backgroundColor: "#BEBEBE" }}
            ></Box>
          </Stack>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems="center"
            justifyContent="center"
            columnGap={2}
          >
            <Box id="button_login" sx={{ cursor: "pointer", width: "100%" }}>
              <div
                style={{
                  width: "10px",
                }}
              ></div>
            </Box>
            {/* <Box sx={{ cursor: "pointer" }}>
              <LoginSocialFacebook
                appId="1875921509408893"
                onResolve={(response) => {
                  
                  get(response.data);
                }}
                onReject={(error) => {
                  
                }}
              >
                <FacebookLoginButton />
              </LoginSocialFacebook>
            </Box> */}
            {/* <Box sx={{ cursor: "pointer" }}>
              <LinkedIn
      clientId="YOUR_LINKEDIN_API_KEY"
      onSuccess={onSuccess}
      onFailure={onFailure}
      redirectUri="http://localhost:3000/linkedin-oauth2"
      scope="r_liteprofile r_emailaddress"
      state="987654321"
      >
      Login with LinkedIn
    </LinkedIn>
            </Box> */}
            {/* <Box sx={{ cursor: "pointer" }}></Box> */}
          </Stack>
          <p style={{ fontWeight: "bold" }}>
            New on BondBeam?&nbsp;
            <Link
              to="/signup"
              style={{ color: "#0A66C2", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </p>
        </Stack>
      </Box>
    </form>
  );
};

export default SignIn;
