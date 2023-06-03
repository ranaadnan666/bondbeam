import { Grid, Box, Typography, TextField } from '@mui/material'
import React from 'react'
function BillingCenterFooterCoupons(){
    return(
        <Grid>
            <Box sx={{ width: "100%", textAlign: "center", display:"flex" }}>
              <Box sx={{width:"100%",height:"60px",border:".1px solid lightgrey",display:"flex",justifyContent:"flex-end",alignItems:"center",padding:"5px"}} >
               <Typography >Time range: <b>1/30/2023 - 2/28/23</b></Typography> &nbsp; &nbsp;
                <TextField sx={{marginRight:"50px"}} placeholder="export receipts" disabled />
               
              </Box>
            </Box>
            <Box sx={{ width: "100%", textAlign: "center", display:"flex",justifyContent:"space-around",alignItems:"center"}}>
              <Box sx={{width:"33.3%",height:"60px",display:"flex",justifyContent:"space-around",alignItems:"center"}}><Typography>Grant Date</Typography></Box>
              <Box sx={{width:"33.3%",height:"60px",display:"flex",justifyContent:"space-around",alignItems:"center"}}><Typography>Credit type</Typography></Box>
              <Box sx={{width:"33.3%",height:"60px",display:"flex",justifyContent:"space-around",alignItems:"center"}}><Typography>Total Credit Amount</Typography></Box>
              <Box sx={{width:"33.3%",height:"60px",display:"flex",justifyContent:"space-around",alignItems:"center"}}><Typography>Remaining Credit Amount</Typography></Box>
              <Box sx={{width:"33.3%",height:"60px",display:"flex",justifyContent:"space-around",alignItems:"center"}}><Typography>Expiration Date</Typography></Box>
            </Box>
            <Box sx={{ width: "100%", textAlign: "center", display:"flex" }}>
              <Box sx={{width:"100%",height:"60px",border:".1px solid lightgrey",display:"flex",justifyContent:"flex-start",alignItems:"center",padding:"5px"}} >
               <Typography >No records found</Typography> &nbsp; &nbsp;
              </Box>
            </Box>
        </Grid>
    )
} 
export default BillingCenterFooterCoupons ;