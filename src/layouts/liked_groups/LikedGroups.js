import { Avatar, Button, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { liked_groups } from "./liked_groups";

const LikedGroups = ({ followers, userId }) => {
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
          Likes ({liked_groups?.length > 0 ? liked_groups?.length : 0})
        </p>
        <Stack direction="column" rowGap={2} m={"5px 0"}>
          {liked_groups?.slice(0, 4).map((props) => (
            <Stack direction="row" columnGap={1} alignItems="center" key={props.id}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                // to={`/profile/${props.follower_user.id}`}
              >
                <Avatar
                  width="50px"
                  height="50px"
                  src={props.url}
                  // src={
                  //   props.follower_user.user_pic
                  //     ? props.follower_user.user_pic
                  //     : RoundedPic
                  // }
                  alt={props.url}
                  // alt={props.follower_user.username}
                />
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "12px",
                }}
                // to={`/profile/${props.follower_user.id}`}
              >
                <Stack direction="column" alignItems="center">
                  <p>{props.first_name}</p>
                  <p>{props.followers}</p>
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
          ))}
        </Stack>
        {liked_groups?.length > 4 && (
          <Link
            style={{ textDecoration: "none" }}
            // to={`/followers/${userId}`}
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

export default LikedGroups;
