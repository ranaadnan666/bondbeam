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
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Profile = () => {
  const [about, setabout] = useState("");
  const [lastName, setlastName] = useState("");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setaddress] = useState("");
  const [work, setwork] = useState("");
  const [relationship, setRelationship] = useState("");

  // get api/////////
  useEffect(() => {
    getdata();
    // eslint-disable-next-line
  }, []);
  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = `Bearer ${authUser?.token?.access}`;
  const getdata = () => {
    fetch("https://api.bondbeam.com/api/user_profile_settings", {
      headers: {
        Authorization: token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setname(data.data.first_name);
        setwork(data.data.work_place);
        setemail(data.data.company_site);
        setWebsite(data.data.website);
        setaddress(data.data.address);
        setlastName(data.data.last_name);
        setabout(data.data.about);
        setRelationship(data.data.relationship);
      });
  };
  const send = () => {
    const firstname = name.split(" ");
    const obj = {
      relationship: relationship,
      address: address,
      company_site: email,
      website: website,
      last_name: lastName,
      work_place: work,
      about: about,
      first_name: firstname[0],
    };
    fetch("https://api.bondbeam.com/api/user_profile_settings/", {
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
  };

  const handleRelChange = (event) => {
    setRelationship(event.target.value);
  };

  // const [address, setaddress] = useState("");
  const [setcoordinates] = useState({
    lat: null,
    lng: null,
  });

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const li = await getLatLng(result[0]);

    setaddress(value);
    setcoordinates(li);
  };

  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontWeight: "600", marginBottom: 3 }}
        gutterBottom
      >
        Profile Settings
      </Typography>
      <Grid container spacing={2} columnSpacing={{ sm: 5, lg: 20 }}>
        <Grid item xs={12} sm={6}>
          <TextField
            id="firstname"
            name="firstname"
            label="First Name"
            fullWidth
            placeholder="Write without space"
            variant="standard"
            value={name}
            onChange={(e) => setname(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastname"
            name="lastname"
            label="Last Name"
            fullWidth
            variant="standard"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="about"
            label="About"
            multiline
            value={about}
            // rows={3}
            onChange={(e) => setabout(e.target.value)}
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        {/* ////////////set */}

        <Grid item xs={12} p={1}>
          <PlacesAutocomplete
            value={address}
            onChange={setaddress}
            onSelect={handleSelect}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <TextField
                  id="about"
                  label="Location"
                  multiline
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "location-search-input",
                  })}
                />

                <Box
                  className="autocomplete-dropdown-container"
                  sx={{ backgroundColor: "white", margin: "0.6rem" }}
                >
                  {loading && <div>Loading...</div>}
                  {suggestions.map((suggestion) => {
                    const className = suggestion.active
                      ? "suggestion-item--active"
                      : "suggestion-item";
                    const style = suggestion.active
                      ? { backgroundColor: "white", cursor: "pointer" }
                      : { backgroundColor: "#F1F3F4", cursor: "pointer" };
                    return (
                      <Box
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          // style,
                        })}
                        sx={{
                          padding: "0.4rem",
                          "&:hover": { backgroundColor: "#DFDFDF" },
                        }}
                        // style={{ backgroundColor:'red'}}
                      >
                        <Typography
                          sx={{
                            borderBottom: "1px solid silver",
                            fontSize: "0.8rem",
                            "&:hover": { borderBottom: "1px solid black" },
                          }}
                        >
                          {suggestion.description}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </div>
            )}
          </PlacesAutocomplete>
        </Grid>

        {/* //////// new code */}

        <Grid item xs={12} sm={6}>
          <TextField
            id="website"
            name="website"
            label="Website"
            variant="standard"
            placeholder={website ? website : "https://bondbeam.com"}
            value={website ? website : ""}
            onChange={(e) => setWebsite(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="relationship-label">Relationship</InputLabel>
            <Select
              labelId="relationship-label"
              id="relationship"
              name="relationship"
              label="Relationship"
              value={relationship}
              onChange={handleRelChange}
              variant="standard"
            >
              <MenuItem value="Single">Single</MenuItem>
              <MenuItem value="Married">Married</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="workingAt"
            name="workingAt"
            label="Works At"
            variant="standard"
            value={work}
            onChange={(e) => setwork(e.target.value)}
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
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

export default Profile;
