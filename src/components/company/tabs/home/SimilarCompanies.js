import { Box, Button, Stack } from "@mui/material";
import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { followCompany, unFollowCompany } from "../../../../utils/helpers/company/company_crud";

const SimilarCompanies = (props) => {

// console.log(props)

  
  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"))
  const handleFollowCompany = async (company_id) => {
    console.log("Following Company is running", company_id)
    const response = await followCompany(lsUser?.token?.access, company_id);
    if(response?.status || response?.status_code === 200){ props?.setCompanyData((prev)=>{
          const tempArray = [...prev.similar_companies];
          const obj = tempArray.find((item) => item.id === company_id);
          console.log(obj)
          if(obj){
             obj.member = true;
          }
          console.log(tempArray)
          return{...prev, similar_companies:tempArray }
          })
        }
  }


  //==================== Follow Company =====================//
  const handleUnFollowCompany = async (company_id) => {
    console.log("Unfollowing Company is running", company_id)
    const response = await unFollowCompany(lsUser?.token?.access, company_id);
    if(response?.status || response?.status_code === 200){ props?.setCompanyData((prev)=>{
      const tempArray = [...prev.similar_companies];
      const obj = tempArray.find((item) => item.id === company_id);
      console.log(obj)
      if(obj){
         obj.member = false;
      }
      console.log(tempArray)
      return{...prev, similar_companies:tempArray }
      })
    }
    // if(response?.status || response?.status_code === 200) props?.setCompanyData((prev)=>({...prev, company: {...prev.company, member: false}}))
  }

  return (
    <>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "white",
          borderRadius: "10px",
          border: "1px solid silver",
          padding: "10px",
        }}
      >
        <h3>Similar Companies</h3>
        <Stack direction="column" rowGap={1}>
          {props?.similars?.map((item) => (
            <Stack key={item?.id} direction="row" columnGap={1} p={1}>
              <img
                width="80px"
                height="80px"
                src={item?.profile_pic}
                alt="company picture"
              />
              <Stack direction="column" rowGap={1}>
                <Link
                  style={{
                    textDecoration: "none",
                    color: "black",
                    fontWeight: "bold",
                  }}
                  to={`/company/user_company/${item?.id}`}
                >
                  {item?.company_name}
                </Link>
                <p>{item?.company_description}</p>
                <Stack
                  direction={{ xs: "column", lg: "row" }}
                  columnGap={1}
                  rowGap={1}
                  alignItems="center"
                >
                  <p>{item.location}</p>
                  <p>
                    Start Date: {moment(item?.start_date).format("DD/MM/YYYY")}
                  </p>
                </Stack>
                <Button
                  variant="contained"
                  color="info"
                  sx={{ width: "fit-content" }}
                  onClick={
                    item?.member ? () => handleUnFollowCompany(item?.id) : () => handleFollowCompany(item?.id)
                  }
                >
                  {item?.member ? "Unfollow" : "Follow"}
                </Button>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default SimilarCompanies;
