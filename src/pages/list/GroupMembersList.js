import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RoundedPic from "../../images/album/album1.jpeg";
import { Link } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import { getGroupMembersById } from "../../utils/helpers/group/group_crud";
import { useAppContext } from "../../context/app-context";

const GroupMembersList = () => {
  const { membersList, setMembersList } = useAppContext();
  const [search, setSearch] = useState("");
  const { groupId } = useParams();

  const getListOfGroupMembers = async (givenId) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getGroupMembersById(lsUser?.token?.access, givenId);
    setMembersList(response?.results);
    //
  };

  useEffect(() => {
    getListOfGroupMembers(groupId);
    // eslint-disable-next-line
  }, [groupId]);

  return (
    <Grid container rowGap={1} justifyContent="center">
      <Grid item xs={12} p={1} textAlign="center">
        <p style={{ fontSize: "30px" }}>Members List</p>
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
          placeholder="Search Members"
        />
      </Grid>
      {membersList
        ?.filter((props) => {
          return (
            props.user.first_name
              ?.toLowerCase()
              ?.includes(search?.toLowerCase()) ||
            props.user.last_name?.toLowerCase()?.includes(search?.toLowerCase())
          );
        })
        .map((props) => (
          <Grid item xs={6} sm={3} md={2} p={1} key={props.user.id}>
            <Stack direction="column" rowGap={1} alignItems="center">
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/profile/${props.user.id}`}
              >
                <Avatar
                  width="50px"
                  height="50px"
                  src={props.user.user_pic ? props.user.user_pic : RoundedPic}
                  alt={props.user.username}
                />
              </Link>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/profile/${props.user.id}`}
              >
                <Typography
                  variant="body2"
                  fontSize={{ xs: "8px", sm: "10px" }}
                  sx={{
                    textTransform: "capitalize",
                  }}
                >
                  <Stack direction="row" columnGap={1} alignItems="center">
                    {props.user.first_name}&nbsp;
                    {props.user.last_name}
                    {props.user.is_verified === "Approved" && (
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

export default GroupMembersList;
