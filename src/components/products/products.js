import React from 'react';
import { Grid, Typography } from '@mui/material';
import ProductCard from './productcard';
function Product() {
    return (
        <div>
           <Grid sx={{minHeight:"100vh", width: "100%", backgroundColor:"#e3e3e2" }}>
           <Grid container  spacing={2} sx={{ width: "70%"}} mx="auto">
                <Grid item xs={12} textAlign="center">
                    <Typography mt={5} variant='h4' sx={{color:"#767171"}} >All Products</Typography>
                </Grid>
                <ProductCard />
            </Grid>
           </Grid>
        </div>
    )
}

export default Product;