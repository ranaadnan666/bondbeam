import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import Logo from "../../images/drawerlogo.svg";
import PersonIcon from "../../images/person.png";
import LockIcon from "../../images/lock.png";
import MailIcon from "../../images/mailicon.png";
import PhoneIcon from "../../images/phoneicon.png";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Loading from "../../components/loading/Loading";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { useAppContext } from "../../context/app-context";
import { registerUser } from "../../utils/helpers/auth/auth";
import { getFirebaseToken } from "./../../firebase";
import Swal from "sweetalert2";

const SignUp = () => {
  const { loading, errMsg, setErrMsg, setLoading } = useAppContext();
  const [open, setOpen] = useState(false);
  const [userAgreement, setUserAgreement] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [cookiePolicy, setCookiePolicy] = useState(false);
  const [checkBox, setCheckBox] = useState(false);
  const [getdata, setgetdata] = useState();
  const [country, setCountry] = useState();
  const device_id = localStorage.getItem("fireBaseUserToken");
  const [visibleVerifyLink, setVisibleVerifyLink] = useState({
    visible: false,
    route: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const first_nameRef = useRef();
  const last_nameRef = useRef();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phone_noRef = useRef();
  const handleGetFirebaseToken = () => {
    getFirebaseToken()
      .then((firebaseToken) => {
        localStorage.setItem("fireBaseUserToken", firebaseToken);
        //
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

  const handleChange = async (
    first_name,
    last_name,
    email,
    password,
    phone_no,
    phone_code = getdata
  ) => {
    // =================== check if input fields are empty ===================
    if (
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      password === "" ||
      phone_no === ""
    ) {
      setErrMsg("Please fill all the fields");
    }
    // =================== check if checkbox is false/true ===================
    else if (checkBox === false) {
      setErrMsg("Please Accept Terms and Conditions");
    } else {
      // =================== register user ===================
      setLoading(true);
      const response = await registerUser({
        first_name,
        last_name,
        email,
        password,
        phone_no,
        phone_code,
        device_id: device_id,
      });

      if (
        response?.data?.is_verified === "Not_Requested" &&
        response.status_code === 200
      ) {
        setLoading(false);
        navigate(`/verification/${response.data.id}`);
      }
      if (response.status_code == 503) {
        setLoading(false);
        navigate("/maintenance");
      }
      if (response.status_code === 403) {
        setLoading(false);
        setVisibleVerifyLink((prev) => ({
          ...prev,
          visible: true,
          route: `/verification/${response.data.id}`,
        }));
        setErrMsg(
          "You have already registered with this email. Please verify your email."
        );
      }
    }
  };
  useEffect(() => {
    const getcountrydata = async () => {
      const response = await axios
        .get(`https://restcountries.com/v2/all`)
        .catch((err) => {});
      //
      setCountry(response.data);
    };
    getcountrydata();
  }, []);
  return (
    <>
      {loading && <Loading />}
      <InformationDialog
        open={open}
        setOpen={setOpen}
        userAgreement={userAgreement}
        cookiePolicy={cookiePolicy}
        privacyPolicy={privacyPolicy}
      />
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
            Sign Up
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
              autoComplete="on"
              ref={first_nameRef}
              type="text"
              placeholder="First Name"
              name="first_name"
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
              autoComplete="on"
              ref={last_nameRef}
              type="text"
              name="last_name"
              placeholder="Last Name"
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
            <img width="24px" height="24px" src={MailIcon} alt="personicon" />
            <input
              style={{
                width: "90%",
                height: "80%",
                padding: "0px 10px",
                border: "none",
                outline: "none",
                fontSize: "18px",
              }}
              autoComplete="on"
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Email"
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
            <select
              style={{ border: "none", width: "100%", outline: "none" }}
              name="phone_code"
              onChange={(e) => setgetdata(e.target.value)}
            >
              <option value={getdata}>Select Country--</option>
              {country?.map((resCountry, index) => (
                <option key={index} value={resCountry.callingCodes[0]}>
                  {resCountry.name}
                </option>
              ))}
            </select>
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
            <img width="24px" height="24px" src={PhoneIcon} alt="personicon" />
            <input
              style={{
                width: "90%",
                height: "80%",
                padding: "0px 10px",
                border: "none",
                outline: "none",
                fontSize: "18px",
              }}
              autoComplete="on"
              ref={phone_noRef}
              type=" text"
              name="phone_no"
              placeholder="Phone"
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
              autoComplete="on"
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              name="password"
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

          {errMsg && (
            <>
              <Alert sx={{ width: "80%" }} severity="error">
                {errMsg}
              </Alert>
            </>
          )}
          {visibleVerifyLink?.visible && (
            <Link to={visibleVerifyLink?.route}>Go to verification</Link>
          )}
          <Stack direction="row" alignItems="center" width="90%">
            <Checkbox
              onChange={(e) => setCheckBox(e.target.checked)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 24 } }}
            />
            <p>
              I Agree Bond Beam{" "}
              <span
                onClick={() => {
                  setOpen(true);
                  setUserAgreement(true);
                  setCookiePolicy(false);
                  setPrivacyPolicy(false);
                }}
                style={{ color: "blue", cursor: "pointer" }}
              >
                User Agreement
              </span>
              ,{" "}
              <span
                onClick={() => {
                  setOpen(true);
                  setPrivacyPolicy(true);
                  setCookiePolicy(false);
                  setUserAgreement(false);
                }}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Privacy Policy
              </span>
              , and{" "}
              <span
                onClick={() => {
                  setOpen(true);
                  setCookiePolicy(true);
                  setPrivacyPolicy(false);
                  setUserAgreement(false);
                }}
                style={{ color: "blue", cursor: "pointer" }}
              >
                Cookie Policy
              </span>
              .
            </p>
          </Stack>
          <Button
            sx={{
              fontSize: "22px",
              width: "85%",
              height: "40px",
              backgroundColor: "black",
              color: "white",
            }}
            variant="contained"
            onClick={() =>
              handleChange(
                first_nameRef.current.value,
                last_nameRef.current.value,
                emailRef.current.value,
                passwordRef.current.value,
                phone_noRef.current.value
              )
            }
          >
            Sign Up
          </Button>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            columnGap={2}
          >
            <Box
              sx={{
                width: "140px",
                height: "2px",
                backgroundColor: "#BEBEBE",
              }}
            ></Box>
            <p style={{ color: "#BEBEBE" }}>OR</p>
            <Box
              sx={{
                width: "140px",
                height: "2px",
                backgroundColor: "#BEBEBE",
              }}
            ></Box>
          </Stack>

          <p style={{ fontWeight: "bold" }}>
            Already have an account?&nbsp;
            <Link
              to="/signin"
              style={{ color: "#0A66C2", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </p>
        </Stack>
      </Box>
    </>
  );
};

export default SignUp;
const InformationDialog = ({
  open,
  setOpen,
  userAgreement,
  privacyPolicy,
  cookiePolicy,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {userAgreement ? (
              <p>User Agreement</p>
            ) : privacyPolicy ? (
              <p>Privacy Policy</p>
            ) : cookiePolicy ? (
              <p>Cookie Policy</p>
            ) : null}
            <CloseIcon
              sx={{ cursor: "pointer", "&:hover": { color: "blue" } }}
              onClick={() => setOpen(false)}
            />
          </Stack>
        </DialogTitle>

        <DialogContent
          sx={{
            height: "450px",
            overflow: "auto",
            border: "1px solid silver",
            borderRadius: "4px",
            padding: "10px",
            margin: "10px",
          }}
        >
          <p>
            At Bondbeam.com, accessible from info@bondbeam.com, one of our main
            priorities is the privacy of our visitors. This Privacy Policy
            document contains types of information that is collected and
            recorded by Bondbeam.com and how we use it. If you have additional
            questions or require more information about our Privacy Policy, do
            not hesitate to contact us. This Privacy Policy applies only to our
            online activities and is valid for visitors to our website with
            regards to the information that they shared and/or collect in
            Bondbeam.com. This policy is not applicable to any information
            collected offline or via channels other than this website. Consent
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms. Information we collect The personal information
            that you are asked to provide, and the reasons why you are asked to
            provide it, will be made clear to you at the point we ask you to
            provide your personal information. If you contact us directly, we
            may receive additional information about you such as your name,
            email address, phone number, the contents of the message and/or
            attachments you may send us, and any other information you may
            choose to provide. When you register for an Account, we may ask for
            your contact information, including items such as name, company
            name, address, email address, and telephone number. How we use your
            information We use the information we collect in various ways,
            including to: Provide, operate, and maintain our website Improve,
            personalize, and expand our website Understand and analyze how you
            use our website Develop new products, services, features, and
            functionality Communicate with you, either directly or through one
            of our partners, including for customer service, to provide you with
            updates and other information relating to the website, and for
            marketing and promotional purposes Send you emails Find and prevent
            fraud Log Files Bondbeam.com follows a standard procedure of using
            log files. These files log visitors when they visit websites. All
            hosting companies do this and a part of hosting services' analytics.
            The information collected by log files include internet protocol
            (IP) addresses, browser type, Internet Service Provider (ISP), date
            and time stamp, referring/exit pages, and possibly the number of
            clicks. These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users' movement on the
            website, and gathering demographic information. Cookies and Web
            Beacons Like any other website, Bondbeam.com uses 'cookies'. These
            cookies are used to store information including visitors'
            preferences, and the pages on the website that the visitor accessed
            or visited. The information is used to optimize the users'
            experience by customizing our web page content based on visitors'
            browser type and/or other information. Advertising Partners Privacy
            Policies You may consult this list to find the Privacy Policy for
            each of the advertising partners of Bondbeam.com. Third-party ad
            servers or ad networks uses technologies like cookies, JavaScript,
            or Web Beacons that are used in their respective advertisements and
            links that appear on Bondbeam.com, which are sent directly to users'
            browser. They automatically receive your IP address when this
            occurs. These technologies are used to measure the effectiveness of
            their advertising campaigns and/or to personalize the advertising
            content that you see on websites that you visit. Note that
            Bondbeam.com has no access to or control over these cookies that are
            used by third-party advertisers. Third Party Privacy Policies
            Bondbeam.com's Privacy Policy does not apply to other advertisers or
            websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options. You can choose to disable cookies
            through your individual browser options. To know more detailed
            information about cookie management with specific web browsers, it
            can be found at the browsers' respective websites. CCPA Privacy
            Rights (Do Not Sell My Personal Information) Under the CCPA, among
            other rights, California consumers have the right to: Request that a
            business that collects a consumer's personal data disclose the
            categories and specific pieces of personal data that a business has
            collected about consumers. Request that a business delete any
            personal data about the consumer that a business has collected.
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data. If you make a request, we have
            one month to respond to you. If you would like to exercise any of
            these rights, please contact us. GDPR Data Protection Rights We
            would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following: The
            right to access – You have the right to request copies of your
            personal data. We may charge you a small fee for this service. The
            right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete. The right to erasure – You have the right to request
            that we erase your personal data, under certain conditions. The
            right to restrict processing – You have the right to request that we
            restrict the processing of your personal data, under certain
            conditions. The right to object to processing – You have the right
            to object to our processing of your personal data, under certain
            conditions. The right to data portability – You have the right to
            request that we transfer the data that we have collected to another
            organization, or directly to you, under certain conditions. If you
            make a request, we have one month to respond to you. If you would
            like to exercise any of these rights, please contact us. Children's
            Information Another part of our priority is adding protection for
            children while using the internet. We encourage parents and
            guardians to observe, participate in, and/or monitor and guide their
            online activity. Bondbeam.com does not knowingly collect any
            Personal Identifiable Information from children under the age of 13.
            If you think that your child provided this kind of information on
            our website, we strongly encourage you to contact us immediately and
            we will do our best efforts to promptly remove such information from
            our records.
          </p>
        </DialogContent>
        <Button
          sx={{ margin: "15px" }}
          variant="contained"
          color="info"
          onClick={() => setOpen(false)}
        >
          Done
        </Button>
      </Dialog>
    </div>
  );
};
