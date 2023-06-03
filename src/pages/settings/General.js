import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import Swal from "sweetalert2";
import Autocomplete from "@mui/material/Autocomplete";
// import allCountries from 'https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js';
import countriesList from "./Countries";

const General = () => {
  // const [countries, setCountries] = useState("");
  const [country, setContuntry] = useState("");
  const [gener, setGener] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone_no, setphone] = useState("");
  const [code, setcode] = useState("");
  const [birth, setbirth] = useState("");

  const handleCountryChange = (event) => {
    setContuntry(event.target.value);
  };
  const handleGenChange = (event) => {
    setGener(event.target.value);
  };
  // get api/////////
  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);

  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;

  const getdata = () => {
    fetch("https://api.bondbeam.com/api/user_general_setting/", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data?.success === true) {
          setname(data.data.username);
          setcode(data.data.phone_code);
          setemail(data.data.email);
          setphone(data.data.phone_no);
          setGener(data.data.gender);
          setContuntry(data.data.country);
          setbirth(data.data.birth_date);
        } else {
          const err = data.detail
            ? data.detail
            : Object.values(data?.message)[0];
          Swal.fire({
            title: "Error",
            text: err,
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      });
  };
  const send = () => {
    const obj = {
      birth_date: birth,
      country: country,
      email: email,
      gender: gener,
      phone_code: code,
      phone_no: phone_no,
      username: name,
    };
    if (name.length > 5 && name.length < 30) {
      fetch("https://api.bondbeam.com/api/user_general_setting/", {
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
          localStorage.setItem("username", JSON.stringify(data));
          if (data?.success === true) {
            Swal.fire({
              title: "Success",
              text: data.msg,
              icon: "success",
              confirmButtonText: "OK",
            });
          } else {
            const err = data.detail ? data.detail : Object.values(data?.msg)[0];
            Swal.fire({
              title: "Error",
              text: err,
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        });
    } else {
      Swal.fire({
        title: "Error",
        text: "Please enter the minimum 5 or maximum 30 letters in @username ",
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
        General Settings
      </Typography>
      <Grid container rowGap={2} columnSpacing={{ xs: 2 }}>
        <Grid item xs={12}>
          {/* <label for="username">username</label> */}
          <TextField
            id="username"
            // style={{ width:"96%",padding:"1rem",borderBottom:"1px solid silver",borderbo:"none",outline:"none" }}
            name="User Name"
            label="Username"
            fullWidth
            variant="standard"
            onChange={(e) => setname(e.target.value)}
            value={name}
            maxLength="8"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="fname"
            variant="standard"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            id="country-select-demo"
            options={countriesList}
            autoHighlight
            value={
              country &&
              countriesList.find((option) => option.label === country)
            }
            onChange={(_, v) => setContuntry(v?.label)}
            getOptionLabel={(option) => option.label}
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
                  autoComplete: "new-password",
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            variant="standard"
            onChange={(e) => setphone(e.target.value)}
            value={phone_no}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="birthday"
            name="birthday"
            label="Birthday"
            variant="standard"
            type="date"
            onChange={(e) => setbirth(e.target.value)}
            value={birth}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="gender-label">Gender</InputLabel>
            <Select
              labelId="gender-label"
              id="gener"
              name="gener"
              label="Gener"
              value={gener}
              onChange={handleGenChange}
              variant="standard"
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
              <MenuItem value="Prefer_Not_To_Say">Prefer not to say</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} textAlign="center">
          <Button
            variant="contained"
            onClick={send}
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
            Save
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default General;
