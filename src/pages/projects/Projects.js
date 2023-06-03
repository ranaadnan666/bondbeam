import React from 'react'
import MenuBar from '../../components/newsfeed/left/LeftArea'
import { Grid } from '@mui/material'
import RightArea from '../../components/newsfeed/right/RightArea'

const Projects = () => {
    return (
        <>
            <Grid
                container
                backgroundColor="#F3F2EF"
                minHeight="100vh"
                minWidth="100wh"
            >
                <MenuBar />
                <Grid item lg={8} md>
                    <h1>Projects list are Below</h1>
                <iframe src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d274751.23131466814!2d74.19430578841066!3d31.483156882113573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39190483e58107d9%3A0xc23abe6ccc7e2462!2sLahore%2C%20Punjab%2C%20Pakistan!5e1!3m2!1sen!2s!4v1678280578688!5m2!1sen!2s`}  style={{border:"0", width:"100%",  height:"80%"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </Grid>
            </Grid>

        </>
    )
}

export default Projects