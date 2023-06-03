import { Stack } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Comming = () => {
  return (
        <Stack justifyContent='center' alignItems='center' height='100vh'>
        <Stack
        direction='column'
        rowGap={2}
        justifyContent='center'
        alignItems='center'
        p={2}
         sx={{
            height:'35vh',
            width:'60vh',
            backgroundColor:'white',
            borderRadius:'1rem',
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.33)",
          }}
          >
            <h2>Coming Soon</h2>
            <h4>this feature will be available in Feb 2023</h4>
            <Link  to='/'>Go Back to Homepage </Link>
        </Stack>
        </Stack>
  )
}

export default Comming