import React from 'react'
import MenuBar from './../../components/newsfeed/left/LeftArea'
import { Grid } from '@mui/material'
import NotificationList from './NotificationList'
import RightArea from '../../components/newsfeed/right/RightArea'

const Notification = () => {
  return (
    <>
      <Grid
        justifyContent={"center"}
        container
        backgroundColor="#F3F2EF"
        minHeight="100vh"
        minWidth="100wh"
      >
        {/* <MenuBar /> */}
        <NotificationList />
        {/* <RightArea /> */}
      </Grid>

    </>
  )
}

export default Notification