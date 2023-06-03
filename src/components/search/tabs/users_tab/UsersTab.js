import React from 'react'
import UserCard from '../../../../layouts/user_card/UserCard'
import { Stack } from '@mui/material'

const UsersTab = (props) => {

  // console.log("props in Users Tab", props?.data)

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
              <h3>Users</h3>
            </div>
            {props?.data?.map((user) => (
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
          </Stack>
    </>
  )
}

export default UsersTab