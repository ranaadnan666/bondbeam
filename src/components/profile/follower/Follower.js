import { Avatar, Button, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import RoundedPic from "../../../images/album/album1.jpeg";
import VerifiedIcon from "@mui/icons-material/Verified";

const Followers = ({ followers, userId }) => {
  return (
    <>
      <Grid
        item
        container
        xs={12}
        p={2}
        backgroundColor="white"
        alignItems="center"
        justifyContent={"space-around"}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
        }}
      >
        <Grid item xs={12}>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            Followers ({followers?.length > 0 ? followers?.length : 0})
          </p>
        </Grid>
        {followers?.slice(0, 4).map((props) => (
          <Grid
            item
            p={1}
            key={props.follower_user.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            mt={2}
          >
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
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "12px",
                }}
                to={`/profile/${props.follower_user.id}`}
              >
                <Stack direction="row" alignItems="center" columnGap={"2px"}>
                  {props.follower_user.first_name.split(" ")[0]}
                  {props.follower_user.is_verified === "Approved" && (
                    <VerifiedIcon
                      color="info"
                      sx={{
                        fontSize: "14px",
                      }}
                    />
                  )}
                </Stack>
              </Link>
            </Stack>
          </Grid>
        ))}

        {followers?.length > 4 && (
          <Grid item xs={12}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/followers/${userId}`}
            >
              <Button
                sx={{
                  width: "100%",
                }}
                variant="contained"
              >
                See all
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Followers;
