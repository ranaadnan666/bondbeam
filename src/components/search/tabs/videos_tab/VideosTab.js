import React from 'react'
import Videos from '../../../../layouts/media/Videos'
import { Box } from '@mui/material'

const VideosTab = (props) => {
  return (
    <>
    <Box sx={{width: "60%"}}>
    <Videos videoArr={props?.data} />
    </Box>
    </>
  )
}

export default VideosTab