import {
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { productsData } from "./data";
import { useNavigate } from "react-router-dom";

const Product = () => {
  // let navigate = useNavigate();
  // const ComingSoon = () => {
    // navigate("/createproduct");
  // };
  return (
    <>
      <Grid
        // onClick={ComingSoon}
        item
        mt={3}
        rowGap={2}
        container
        xs={12}
        p={2}
        sx={{
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
        }}
      >
        <Grid item xs={6} lg={6} >
          <p style={{ fontWeight: "bold", fontSize: "20px" }}>Products</p>
        </Grid>
        <Grid item xs={6} lg={6} >
        <Button href="/createproduct" >Add Product +</Button>
        </Grid>
        <ImageList className="rightArea" sx={{ width: "auto", height: 450 }}>
          <ImageListItem key="Subheader" cols={2} gap={8}>
            {/* <ListSubheader component="div">December</ListSubheader> */}
          </ImageListItem>
          {productsData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                // onClick={() => navigate("/commingsoon")}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.title}
                subtitle={item.author}
                actionIcon={
                  <IconButton
                    sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                    aria-label={`info about ${item.title}`}
                  >
                    {/* <InfoIcon /> */}
                  </IconButton>
                }
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
    </>
  );
};

export default Product;
