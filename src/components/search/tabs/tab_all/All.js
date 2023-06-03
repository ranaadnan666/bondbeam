import { Stack, Grid, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../../context/app-context";
import UserCard from "../../../../layouts/user_card/UserCard";
import InfoProfileCard from "../../../../layouts/info_profile_card/InfoProfileCard";
import Post from "../../../post";
import Images from "../../../../layouts/media/Images";
import Videos from "../../../../layouts/media/Videos";
import JobCard from "../../../../layouts/job_card/JobCard";

const All = () => {
  const { searchResult } = useAppContext();
  return (
    <>
      <Box width={"70%"}>

        {/* users list */}

        {searchResult?.users?.length > 0 &&
          <Stack
            direction="column"
            rowGap={2}
            sx={{
              borderRadius: "10px",
              boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ padding: "10px" }}>
              <h3>Users</h3>
            </div>
            {searchResult?.users?.map((user) => (
              // this user card is from src\layouts\user_card\UserCard.js
              <UserCard
                key={user?.id}
                id={user?.id}
                first_name={user?.first_name}
                last_name={user?.last_name}
                username={user?.username}
                email={user?.email}
                profile_pic={user?.profile_pic}
              />
            ))}
          </Stack>}

        {/* Companies list */}
        {searchResult?.companies?.length > 0 && <Stack
          direction="column"
          rowGap={2}
          sx={{
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ padding: "10px" }}>
            <h3>Companies</h3>
          </div>
          {searchResult?.companies?.map((item) => (
            // this user card is from src\layouts\user_card\UserCard.js
            <InfoProfileCard
              key={item.id}
              title={"Company"}
              id={item.id}
              userId={item?.user?.id || item?.user}
              member={item?.member}
              name={item.company_name}
              profilePic={item.profile_pic}
              headline={item.headline}
              about={item.company_about}
            />
          ))}
        </Stack>}

        {/* Groups list */}
        {searchResult?.groups?.length > 0 && <Stack
          direction="column"
          rowGap={2}
          sx={{
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ padding: "10px" }}>
            <h3>Groups</h3>
          </div>
          {searchResult?.groups?.map((item) => (
            // this user card is from src\layouts\user_card\UserCard.js
            <InfoProfileCard
              key={item.id}
              title={"Group"}
              id={item.id}
              userId={item?.user?.id || item?.user}
              member={item?.member}
              name={item.group_name}
              profilePic={item.profile_pic}
              headline={item.headline}
              about={item.group_about}
            />
          ))}
        </Stack>}

        {/* Pages list */}
        {searchResult?.pages?.length > 0 && <Stack
          direction="column"
          rowGap={2}
          sx={{
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ padding: "10px" }}>
            <h3>Pages</h3>
          </div>
          {searchResult?.pages?.map((item) => (
            // this user card is from src\layouts\user_card\UserCard.js
            <InfoProfileCard
              key={item.id}
              title={"Page"}
              id={item.id}
              userId={item?.user?.id || item?.user}
              member={item?.member}
              name={item.page_name}
              profilePic={item.profile_pic}
              headline={item.headline}
              about={item.page_about}
            />
          ))}
        </Stack>}

        {/* posts list */}
        {searchResult?.posts?.length > 0 && <Stack
          direction="column"
          rowGap={2}
          sx={{
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ padding: "10px" }}>
            <h3>posts</h3>
          </div>
          <Post />
        </Stack>}

        {/* images list */}
        {searchResult?.images?.length > 0 && <Images imageArr={searchResult?.images} />}

        {/* Videos List */}
        {searchResult?.videos?.length > 0 && <Videos videoArr={searchResult?.videos} />}

        {/* Jobs List */}
        {searchResult?.jobs?.length > 0 && <Stack
          direction="column"
          rowGap={2}
          sx={{
            borderRadius: "10px",
            boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ padding: "10px" }}>
            <h3>Jobs</h3>
          </div>
          {/* Jobs Card from Layouts */}

          {searchResult?.jobs?.map((item) => (
            // this user card is from src\layouts\user_card\UserCard.js
            <JobCard props={item} />

          ))}

        </Stack>}
      </Box>

    </>
  );
};

export default All;
