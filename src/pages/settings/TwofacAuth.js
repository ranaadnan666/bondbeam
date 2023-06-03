import * as React from "react";
import {
  Typography,
  Grid,
  Button,
  Paper,
  Box,
  Link,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import Autocomplete from "@mui/material/Autocomplete";
import countriesList from "./Countries";
import Swal from "sweetalert2";

const StepOne = ({ setSteps }) => {
  const handleSubmit = () => {
    setSteps(2);
  };
  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", marginBottom: 3 }}
        gutterBottom
      >
        Two-factor authentication
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 0, sm: 1, md: 2 },
          backgroundColor: "transparent",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={11}
            container
            p={2}
            sx={{
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Box sx={{ width: 100, height: 100, textAlign: "center" }}>
                <LockIcon
                  sx={{
                    fontSize: { xs: "3rem", sm: "5rem", md: "6rem" },
                    color: "gray",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm container>
              <Typography
                sx={{ cursor: "auto", alignSelf: "center", color: "black" }}
                variant="body1"
              >
                Two step verification gives you additional security by requiring
                a verification code whenever you sign in on new device. With
                2-Step Verification, also called two-factor authentication, you
                can add an extra layer of security to your account in case your
                password is stolen. After you set up 2-Step Verification, you
                can sign in to your account with:
                {/* <Link href="#" variant="body2">
                  Learn more
                </Link> */}
              </Typography>
              {/* make un-order list for 2 items */}
              <ul style={{ marginLeft: "25px", fontWeight: "bold" }}>
                <li>Your password</li>
                <li>Your phone Number</li>
              </ul>
            </Grid>
          </Grid>

          {/* <Grid
            item
            xs={12}
            md={11}
            container
            p={2}
            sx={{
              justifyContent: "center",
            }}
          >
            <Grid item>
              <Box sx={{ width: 100, height: 100, textAlign: "center" }}>
                <PhoneAndroidIcon
                  sx={{
                    fontSize: { xs: "3rem", sm: "5rem", md: "6rem" },
                    color: "gray",
                    alignItems: "center",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm container>
              <Typography
                sx={{ cursor: "auto", alignSelf: "center", color: "black" }}
                variant="body1"
              >
               
              </Typography>
            </Grid>
          </Grid> */}
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#000000",
              color: "white",
              marginTop: "20px",
              borderRadius: "8px",
              textAlign: "center",
              "&:hover": {
                color: "#000000",
                backgroundColor: "white",
              },
            }}
          >
            Turn on 2-Step Verification
          </Button>
        </Grid>
      </Paper>
    </>
  );
};

const StepTwo = ({ setSteps }) => {
  const [country, setContuntry] = React.useState("");
  const [data, setData] = React.useState({});

  const handleCountryChange = (event) => {
    setContuntry(event.target.value);
  };

  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;

  const handleSubmit = () => {
    if (country !== "" && data.phone && data.password) {
      const obj = {
        factor_phone_code: country,
        factor_phone_no: data.phone,
        password: data.password,
      };

      fetch("https://api.bondbeam.com/api/two_fector_auth/", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify(obj),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.success === true) {
            Swal.fire({
              title: "Success",
              text: data.msg,
              icon: "success",
              confirmButtonText: "OK",
            });
            setSteps(3);
          } else {
            const err = data.detail ? data.detail : data?.msg;
            Swal.fire({
              title: "Error",
              text: err ? "please enter valid data" : err,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Required All Fields",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", marginBottom: 3 }}
        gutterBottom
      >
        Two-factor authentication
      </Typography>

      <Grid container spacing={2} columnSpacing={{ sm: 5 }}>
        <Grid item xs={12} sm={3}>
          <Autocomplete
            id="country-select-demo"
            options={countriesList}
            autoHighlight
            // value={country && countriesList.find((option) => option.phone ==== country)}
            onChange={(_, v) => setContuntry(v?.phone)}
            getOptionLabel={(option) => country && option.phone}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                {...props}
                key={option.code}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                name="country"
                onChange={handleCountryChange}
                fullWidth
                variant="standard"
                InputLabelProps={{
                  shrink: true,
                }}
                label="Select Country Code"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "off",
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            id="phone"
            name="phone"
            label="Phone No"
            defaultValue={data.phone}
            onChange={(e) => setData({ ...data, phone: e.target.value })}
            type="text"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            defaultValue={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            fullWidth
            variant="standard"
            // autoComplete='off'
            InputLabelProps={{
              shrink: true,
              autoComplete: "new-password",
            }}
          />
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#000000",
              color: "white",
              marginTop: "20px",
              borderRadius: "8px",
              width: "120px",
              textAlign: "center",
              "&:hover": {
                color: "#000000",
                backgroundColor: "white",
              },
            }}
          >
            Send Code
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
const StepThree = ({ setSteps }) => {
  const [code, setCode] = React.useState("");
  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;

  const handleSubmit = () => {
    if (code !== "") {
      fetch("https://api.bondbeam.com/api/two_step_otp_varification/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ otp: code }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.status === true) {
            Swal.fire({
              title: "Success",
              text: data.msg,
              icon: "success",
              confirmButtonText: "OK",
            });
            setSteps(1);
          } else {
            const err = data.detail ? data.detail : data?.msg;
            Swal.fire({
              title: "Error",
              text: err,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
    }
  };
  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", marginBottom: 3 }}
        gutterBottom
      >
        Verify
      </Typography>

      <Grid container spacing={2} columnSpacing={{ sm: 5, lg: 20 }}>
        <Grid item xs={12}>
          <Typography
            variant="subtitle1"
            sx={{ marginBottom: 3, fontWeight: 600 }}
            // gutterBottom
          >
            We have sent you a 6-digit code.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="code"
            name="code"
            label="6-Digit verification code."
            fullWidth
            defaultValue={code}
            onChange={(e) => setCode(e.target.value)}
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 500 }} my={2}>
            Not Received? &nbsp;
            <Link href="#" onClick={() => setSteps(2)} variant="body2">
              Resend Code!
            </Link>
          </Typography>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#000000",
              color: "white",
              marginTop: "20px",
              borderRadius: "8px",
              width: "120px",
              textAlign: "center",
              "&:hover": {
                color: "#000000",
                backgroundColor: "white",
              },
            }}
          >
            Continue
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const TwofacAuth = () => {
  const [steps, setSteps] = React.useState(1);
  return (
    <>
      {steps === 1 && <StepOne setSteps={setSteps} />}
      {steps === 2 && <StepTwo setSteps={setSteps} />}
      {steps === 3 && <StepThree setSteps={setSteps} />}
    </>
  );
};

export default TwofacAuth;
