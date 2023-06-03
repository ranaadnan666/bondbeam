import { Grid } from '@mui/material'
import React from 'react'
import LeftArea from '../../components/newsfeed/left/LeftArea'
import NetworkTab from './NetworkTab'

const Network = () => {
    return (
        <>
            <Grid container
                sx={{
                    width: { md: "95%", xs: '95%', sm: "95%" },
                    margin: 'auto',
                    justifyContent: 'center'
                }}  >
                <Grid item md={4} sm={12} xs={12} >
                    <LeftArea />
                </Grid>

                <Grid item md={8} sm={12} xs={12} mt={5}>
                    <Grid item md={12}>
                        <NetworkTab />
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default Network
