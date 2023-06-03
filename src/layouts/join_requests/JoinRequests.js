import { Avatar, Button, Grid, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Members = (props) => {
  return (
    <>
      <Box
        sx={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          Joining Requests (
          {props?.totalRequests > 0 ? props?.totalRequests : 0})
        </p>
        <Grid container>
          {props?.joiningRequests?.slice(0, 4).map((props) => (
            <Grid
              item
              key={props.id}
              // key={props.follower_user.id}
              // xs={12}
              // sm={6}
              // md={4}
              // lg={3}
              p={1}
            >
              <Stack direction="column" rowGap={1} alignItems="center">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/profile/${props?.user?.id}`}
                >
                  <Avatar
                    width="50px"
                    height="50px"
                    src={props?.user?.profile_pic}
                    // src={
                    //   props.follower_user.user_pic
                    //     ? props.follower_user.user_pic
                    //     : RoundedPic
                    // }
                    alt="profile_pic"
                    // alt={props.follower_user.username}
                  />
                </Link>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontSize: "12px",
                  }}
                  to={`/profile/${props?.user?.id}`}
                >
                  <Stack direction="row" alignItems="center" columnGap={"2px"}>
                    {props?.user?.first_name}&nbsp;{props?.user?.last_name}
                    {/* {props.follower_user.first_name.split(" ")[0]}
                    {props.follower_user.is_verified === "Approved" && (
                      <VerifiedIcon
                        color="info"
                        sx={{
                          fontSize: "14px",
                        }}
                      />
                    )} */}
                  </Stack>
                </Link>
              </Stack>
            </Grid>
          ))}
        </Grid>
        {props?.totalRequests > 4 && (
          <Link
            style={{ textDecoration: "none" }}
            to={`/${
              props?.title === "Group"
                ? "group_joining_requests"
                : // : props?.title === "Company"
                  // ? "company_joining_requests"
                  // : props?.title === "Page"
                  // ? "page_joining_requests"
                  null
            }/${props?.given_id}`}
          >
            <Button sx={{ width: "100%" }} variant="contained" color="info">
              See more
            </Button>
          </Link>
        )}
      </Box>
    </>
  );
};

export default Members;
