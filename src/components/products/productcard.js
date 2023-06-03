import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useState } from 'react';
import { Grid } from '@mui/material';
import { productsData } from '../profile/product/data';
import axios from 'axios';
import { useEffect } from 'react';
import image from "./images/imag.jpg"
import prods from "./images/prods.jpeg";

export default function ProductCard() {
  const [productitems, setProductitems] = useState([""]);
  const [imgs, setImgs] = useState([])


  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = lsUser?.token?.access;

  const getProducts = async () => {
    await axios.get("https://api.bondbeam.com/product/product/", {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((response) => {
      console.log(response?.data?.data)
      const storeproduct = setProductitems(response?.data?.data)
      setImgs(storeproduct?.images)
    }).catch((err) => {
      console.log(err)
    })
  }

  const deleteProduct = async (id) => {
    await axios.delete(`https://api.bondbeam.com/product/product/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
  }

  useEffect(() => {
    getProducts();
  }, [])
  return (
    <>
      {
        productitems.map((item, i) => {
          return <Grid key={i} item lg={3} md={4} sm={6} xs={12}  >
            <Card sx={{ maxWidth: 345, ":hover": { boxShadow: 10 } }}>
              <CardContent>
                <CardMedia
                  sx={{ height: 200 }}
                  image={prods}
                // title="green iguana"
                />
              </CardContent>

              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {item?.description}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.title}
                </Typography>
                <Typography variant="h5" sx={{ color: "#da000b" }}>
                  Rs. {item?.price}
                </Typography>
                <Typography variant="body1" sx={{ color: "#767171" }} >
                  {item?.quantity} items
                </Typography>
                <Typography variant="body1" sx={{ color: "#404848" }} >
                  {item?.name}
                </Typography>
              </CardContent>
              <CardContent>
                <Button variant='contained' >Buy</Button>
                <Button><DeleteForeverIcon onClick={() => deleteProduct(item?.id)} sx={{ color: "#da000b" }} /></Button>
                <Button><EditIcon sx={{ color: "#da000b" }} /></Button>
              </CardContent>
            </Card>
          </Grid>
        })
      }
    </>
  );
}