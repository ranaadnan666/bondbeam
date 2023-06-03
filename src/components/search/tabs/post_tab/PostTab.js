import { Stack } from '@mui/material'
import React from 'react'
import Post from '../../../post'

const PostTab = () => {
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
            <h3>posts</h3>
          </div>
          <Post />
        </Stack>
    </>
  )
}

export default PostTab