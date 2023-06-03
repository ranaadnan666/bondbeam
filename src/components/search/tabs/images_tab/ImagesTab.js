import React from 'react'
import Images from '../../../../layouts/media/Images'
import { Box } from '@mui/material'

const ImagesTab = (props) => {
  return (
    <>
    <Box>

    <Images imageArr={props?.data} />
    </Box>
    </>
  )
}

export default ImagesTab