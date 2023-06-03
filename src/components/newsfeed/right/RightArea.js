import { Avatar, Button, Grid, Hidden, Stack } from "@mui/material";
import { useState } from "react";
import RecentlyArrived1 from "../../../images/album/album1.jpeg";
import Products from "../../profile/product/Product";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../context/app-context";

const RightArea = () => {
  const { recentArrived, userFollowUnfollow } = useAppContext();
  const [showAllArrived, setShowAllArrived] = useState(2);
  const [showArrivedMoreButton, setShowArrivedMoreButton] = useState(true);
  const handleFollowArrived = async (obj) => {
    await userFollowUnfollow(obj);
  };
  return (
    <Hidden mdDown>
      <Grid item md={3}></Grid>
      <Grid
        className="rightArea"
        item
        sx={{
          position: "fixed",
          height: "90vh",
          overflow: "auto",
          right: 0,
          width: "25%",
        }}
        p={2}
      >
        <Stack
          direction="column"
          rowGap={2}
          backgroundColor="white"
          borderRadius="10px"
          border="1px solid silver"
          p={2}
        >
          <p style={{ fontWeight: "bold" }}>Recently Arrived</p>
          <Grid container overflow="auto" maxHeight="350px">
            {recentArrived?.slice(0, showAllArrived).map((item) => (
              <Grid
                item
                xs={12}
                xl={6}
                p={1}
                key={item.id}
                height="fit-content"
              >
                <Stack
                  direction="column"
                  alignItems="center"
                  // justifyContent="center"
                  rowGap={1}
                >
                  <Avatar
                    width="60px"
                    height="60px"
                    src={item.profile_pic ? item.profile_pic : RecentlyArrived1}
                    alt={item.first_name}
                  />
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    to={`profile/${item.id}`}
                  >
                    <p
                      style={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.first_name.split(" ")[0]}
                    </p>
                  </Link>
                  {/* <p>@{item.username}</p> */}

                  <Button
                    sx={{
                      width: "fit-content",
                      backgroundColor: "black",
                      color: "white",
                    }}
                    onClick={() =>
                      handleFollowArrived({ following_user: item.id })
                    }
                    variant="contained"
                  >
                    Follow
                  </Button>
                </Stack>
              </Grid>
            ))}
            {/* if recent arrived empty then show simple info text */}
            {recentArrived?.length === 0 && (
              <p style={{ fontWeight: "bold" }}>No one has arrived yet.</p>
            )}
          </Grid>
          {recentArrived?.length > 2 &&
            (showArrivedMoreButton ? (
              <Button
                onClick={() => {
                  setShowAllArrived(recentArrived?.length);
                  setShowArrivedMoreButton(false);
                }}
                sx={{ fontWeight: "bold" }}
                variant="text"
              >
                See All +
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setShowAllArrived(2);
                  setShowArrivedMoreButton(true);
                }}
                sx={{ fontWeight: "bold" }}
                variant="text"
              >
                See less -
              </Button>
            ))}
        </Stack>
        <Products />
      </Grid>
    </Hidden>
  );
};
export default RightArea;
