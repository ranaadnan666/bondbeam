import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
// import CreateAccountAdvertisement from '../../components/advertisement/analyze/createaccountadvertisement'
// import Main from '../../components/advertisement/main/Main'
import Sidebar from '../../components/advertisement/sidebar/Sidebar'

const Advertisement = () => {
  return (
    <Grid container p={1} justifyContent={"space-between"}>
      <Grid  item xs={3}>
        <Sidebar />
      </Grid>
     <Grid  xs={12} md={8.8}>
     <Outlet/>
     </Grid>
    </Grid>
   
  )
}

export default Advertisement