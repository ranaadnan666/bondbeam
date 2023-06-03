import React, { useEffect } from "react";
import { Button, Grid, Stack } from "@mui/material";
import ArticleIcon from "@mui/icons-material/Article";
import { useState } from "react";
import axios from "axios";


const CreateProduct = () => {
  // state for group form
  const [productData,setProductData] = useState({ category:"",name:"",price:"",images:[""],description:"",quantity:"",tags:[""]})
  const [productCategories, setProductCategories] = useState([])
  
  const inputStyles = {
    border: "none",
    backgroundColor: "#F1F3F4",
    padding: "10px",
    borderRadius: "5px",
  };

  const handlechange=(e)=>{
    setProductData({ ...productData, [e.target.name]: e.target.value})
  }
  const handleimage=(e)=>{
    setProductData({ ...productData,
      [e.target.name]: e.target.files, });
    // setProductData({ image : e.target.files[0]?.name })
  }

  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = lsUser?.token?.access ;

  const handlesubmit= async(id)=>{

    // if(
    //    productData?.name === "" ||
    //    productData?.category === "" ||
    //    productData?.price === "" ||
    //    productData?.images === "" ||
    //    productData?.description === "" ||
    //    productData?.quantity === "" ||
    //    productData?.tags === "" 
    // ){
    //    alert("Some fields are missing")
    // }
    // else {
    const formData = new FormData();
    formData.append("category", productData?.category)
    formData.append("name", productData?.name)
    formData.append("price", productData?.price)
    formData.append("description", productData?.description)
    formData.append("tags", JSON.stringify(productData?.tags) )
    formData.append("quantity", productData?.quantity)
    

    for (let i = 0; i < productData?.images?.length; i++) {
      formData.append(
        "images",
        productData?.images[i],
        productData?.images[i].name,    
      );
    }

    console.log(productData)
    
    await axios.post(`https://api.bondbeam.com/product/product/`,formData, {
        headers :{
            authorization : `Bearer ${token}`,
            Accept: "application/json, text/plain, */*",
        }
     }).then((response)=>{
        console.log(response)
     }).catch((err)=>{
        console.log(err)
     })

     setProductData({ category:"",name:"",price:"",images:"",description:"",quantity:"",tags:""})

  // }
}

const getCategories = async()=>{
  axios.get(`https://api.bondbeam.com/product/category`, {
    headers : {
      authorization: `Bearer ${token}`
    }
  }).then((response)=>{
    console.log(response)
    setProductCategories(response?.data?.results)
    console.log("data is ", response?.data?.results)
  }).catch((err)=>{
    console.log(err)
  })
}
 
useEffect(()=>{
   getCategories();
},[])
  return (
    <>
      <Grid
        container
        width={{ xs: "99%", sm: "80%", md: "60%", lg: "60%" }}
        mx="auto"
        rowGap={2}
      >
        <Grid item xs={12} textAlign="center">
          <h2>Create Product</h2>  
        </Grid>
       
        {/*  Name */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="name">name</label>
            <input
              onChange={handlechange}
              name="name"
              value={productData?.name}
              style={inputStyles}
              placeholder="Enter your name"
              type="text"
              id="author_name"
            />
          </Stack>
        </Grid>

        {/* Group Phone Code */}
        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="category">Category</label>
            <select
              style={inputStyles}
              onChange={handlechange} 
              name="category"
              id="category"
              // defaultValue={pageFormData?.category?.type || "select"} 
            >
              <option value="select" disabled>
                Select Category
              </option>
              {productCategories?.map((category) => (
                <option key={category.id} value={category?.id}> 
                  {category?.title}
                </option>
              ))}
            </select>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="quantity">quantity</label>
            <input
              onChange={handlechange}
              name="quantity"
              value={productData?.quantity}
              style={inputStyles}
              placeholder="Enter quantity"
              type="text"
              id="quantity"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="tags">tags</label>
            <input
              onChange={handlechange}
              name="tags"
              value={productData?.tags}
              style={inputStyles}
              placeholder="Enter tags"
              type="text"
              id="tags"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} md={6} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="product_price">price</label>
            <input
            onChange={handlechange}
            name="price"
            value={productData?.price}
              style={inputStyles}
              placeholder="Enter your product price"
              type="text"
              id="product_price"
            />
          </Stack>
        </Grid>

  
       

        {/* upload Group profile pic */}
        <Grid item xs={12} md={6} p={1}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            columnGap={1}
            alignItems={"center"}
            rowGap={1}
          >
            <ArticleIcon
              sx={{
                color: "#3F51B5",
                padding: "20px",
                borderRadius: "50%",
                backgroundColor: "#F1F3F4",
              }}
              fontSize={"large"}
            />
            <h4>Image</h4>
            <label htmlFor="product_image">
              <input
                onChange={handleimage}
                style={{ display: "none" }}
                name="images"
                id="product_image"
                type="file" multiple
                // accept="image/*"
              />
              <p
                style={{
                  color: "#3F51B5",
                  cursor: "pointer",
                }}
              >
                Browse file
              </p>
            </label>
            {/* <p>
              uploaded file :{" "}
              {productData?.images || productData?.images}
            </p> */}
          </Stack>
          {/* {productData.profile_pic !== "" && (
            <p>
              uploaded file :{" "}
              {groupprofilepic?.prof_pic || productData?.profile_pic}
            </p>
          )} */}
        </Grid>
        
        {/* Group About */}
        <Grid item xs={12} p={1}>
          <Stack direction={"column"} rowGap={1}>
            <label htmlFor="product_description">Description</label>
            <textarea
              onChange={handlechange}
              name="description"
              value={productData?.description}
              style={{
                ...inputStyles,
                height: "100px",
                resize: "none",
              }}
              placeholder="Write description about your product"
              id="product_description"
            />
          </Stack>
        </Grid>

        <Grid item xs={12} p={1}>
          <Button 
        //   href="/createproduct/productss" 
        variant="outlined" onClick={handlesubmit} >
            Submit
          </Button>
          </Grid>
          <Grid item xs={12} p={1}>
          <Button variant="contained" href="/createproduct/productss"> Got to Products </Button>
          </Grid>
      </Grid>
    </>
  );
};

export default CreateProduct;
