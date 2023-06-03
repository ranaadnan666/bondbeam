import {
  Box,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import { productsData } from "./products_data";

const Product = () => {
  return (
    <>
      <Box
        sx={{
          padding: "10px",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
        }}
      >
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>Products</p>
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
      </Box>
    </>
  );
};

export default Product;
