import { Stack } from '@mui/material'
import React from 'react'
import JobCard from '../../../../layouts/job_card/JobCard'

const JobsTab = (props) => {
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
            <h3>Jobs</h3>
          </div>
          {/* Jobs Card from Layouts */}

          {props?.data?.map((item) => (
            // this user card is from src\layouts\user_card\UserCard.js
            <JobCard props={item} />

          ))}

        </Stack>
    </>
  )
}

export default JobsTab