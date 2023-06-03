import { Avatar, Button, Stack, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { similars } from "./similar_data";

const Similars = (props) => {
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
          Similar {props.title}
        </p>
        <Stack direction="column" rowGap={2} m={"5px 0"}>
          {props?.similars?.slice(0, 4).map((item) => (
            <Stack
              direction="row"
              columnGap={1}
              alignItems="center"
              key={item.id}
            >
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/${
                  props?.title === "Company"
                    ? "company/user_company"
                    : props?.title === "Group"
                    ? "group/user_group"
                    : props?.title === "Page"
                    ? "page/user_page"
                    : null
                }/${item?.id}`}
              >
                <Avatar
                  width="50px"
                  height="50px"
                  src={item?.profile_pic}
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
                to={`/${
                  props?.title === "Company"
                    ? "company/user_company"
                    : props?.title === "Group"
                    ? "group/user_group"
                    : props?.title === "Page"
                    ? "page/user_page"
                    : null
                }/${item?.id}`}
              >
                <Stack direction="column">
                  <p>
                    {props?.title === "Group"
                      ? item?.group_name
                      : props?.title === "Company"
                      ? item?.company_name
                      : props?.title === "Page"
                      ? item?.page_name
                      : null}
                  </p>
                  <p>{props.totalMembers} members</p>
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
        {props?.totalSimilars > 4 && (
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

export default Similars;
