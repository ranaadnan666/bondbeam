import React from 'react'
import InfoProfileCard from '../../../../layouts/info_profile_card/InfoProfileCard';
import { Stack } from '@mui/material';

const CompaniesTab = (props) => {
  return (
    <>
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
            <h3>Companies</h3>
          </div>
          {props?.data?.map((item) => (
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
        </Stack>
    </>
  )
}

export default CompaniesTab;