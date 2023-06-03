import { Avatar, Button, Grid, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import RoundedPic from "../../../images/album/album1.jpeg";
import VerifiedIcon from "@mui/icons-material/Verified";

const Following = ({ followings, userId }) => {
  return (
    <>
      <Grid
        item
        mt={3}
        container
        xs={12}
        p={2}
        backgroundColor="white"
        justifyContent={"space-around"}
        alignItems="center"
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
        }}
      >
        <Grid item xs={12}>
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>
            Following ({followings?.length > 0 ? followings?.length : 0})
          </p>
        </Grid>
        {followings?.slice(0, 4).map((props) => (
          <Grid
            item
            p={1}
            key={props.following_user.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            mt={2}
          >
            <Stack direction="column" rowGap={1} alignItems="center">
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  textTransform: "capitalize",
                }}
                to={`/profile/${props.following_user.id}`}
              >
                <Avatar
                  width="50px"
                  height="50px"
                  src={
                    props.following_user.user_pic
                      ? props.following_user.user_pic
                      : RoundedPic
                  }
                  alt={props.following_user.username}
                />
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "black",
                  textTransform: "capitalize",
                  fontSize: "12px",
                }}
                to={`/profile/${props.following_user.id}`}
              >
                <Stack direction="row" columnGap={"2px"} alignItems="center">
                  {props.following_user.first_name.split(" ")[0]}
                  {props.following_user.is_verified === "Approved" && (
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

        <Grid item xs={12}>
          {followings?.length > 4 && (
            <Link
              style={{ textDecoration: "none" }}
              to={`/followings/${userId}`}
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
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Following;
