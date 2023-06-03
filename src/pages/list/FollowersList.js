import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoundedPic from "../../images/album/album1.jpeg";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";

const AllFollowers = () => {
  const [followers, setFollowers] = useState([]);
  const [search, setSearch] = useState("");
  const { userid } = useParams();
  const authUser = JSON.parse(localStorage.getItem("userLoggedIn"));

  const getFollowers = async (id) => {
    const response = await fetch(
      `https://api.bondbeam.com/api/user_followers/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authUser?.token?.access}`,
        },
      }
    );
    const data = await response.json();
    setFollowers(data.results);
  };
  useEffect(() => {
    getFollowers(userid);
    // eslint-disable-next-line
  }, [userid]);
  return (
    <Grid container rowGap={1} justifyContent="center">
      <Grid item xs={12} p={1} textAlign="center">
        <p style={{ fontSize: "30px" }}>Followers</p>
      </Grid>
      <Grid item xs={12} p={1} textAlign="center">
        <Box
          sx={{
            width: "20%",
            height: "3px",
            backgroundColor: "teal",
            margin: "0 auto",
          }}
        ></Box>
      </Grid>
      <Grid item xs={12} p={1} textAlign="center">
        <input
          style={{
            border: "none",
            borderRadius: "5px",
            padding: "10px",
            width: "50%",
            boxShadow: "0px 0px 4px 0px #000000",
          }}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="text"
          placeholder="Search Followers"
        />
      </Grid>
      {/* create a search bar for search follower */}
      {followers
        ?.filter((props) => {
          return (
            props.follower_user.first_name
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            props.follower_user.last_name
              ?.toLowerCase()
              ?.includes(search?.toLowerCase())
          );
        })
        .map((props) => (
          <Grid item xs={6} sm={3} md={2} p={1} key={props.follower_user.id}>
            <Stack direction="column" rowGap={1} alignItems="center">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/profile/${props.follower_user.id}`}
              >
                <Avatar
                  width="50px"
                  height="50px"
                  src={
                    props.follower_user.user_pic
                      ? props.follower_user.user_pic
                      : RoundedPic
                  }
                  alt={props.follower_user.username}
                />
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/profile/${props.follower_user.id}`}
              >
                <Typography
                  variant="body2"
                  fontSize={{ xs: "8px", sm: "10px" }}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  <Stack direction="row" columnGap={1} alignItems="center">
                    {props.follower_user.first_name}&nbsp;
                    {props.follower_user.last_name}
                    {props.follower_user.is_verified === "Approved" && (
                      <VerifiedIcon
                        sx={{
                          fontSize: { xs: "12px" },
                          color: "#0288D1",
                        }}
                      />
                    )}
                  </Stack>
                </Typography>
              </Link>
            </Stack>
          </Grid>
        ))}
    </Grid>
  );
};

export default AllFollowers;
