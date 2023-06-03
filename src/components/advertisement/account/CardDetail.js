import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAccountDetail } from "../../../utils/helpers/advertisement/advertisement_crud";
import moment from "moment";

const Carddetail = () => {
  const [data, setData] = useState({});

  const cardData = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getAccountDetail(lsUser?.token?.access);
    setData(response.data);
  };
  useEffect(() => {
    cardData();
  }, []);
  return (
    <div>
     
        {/* {data?.map((item, i) => {
          return ( */}
            <Grid    p={1} sx={{width:{xs:"100%",md:"70%"}}} mx="auto">
            {
                    data.account_no ? 
              <Stack
               
                backgroundColor="white"
                direction="row"
                columnGap={2}
                justifyContent="space-between"
                sx={{
                  padding: "1rem",
                  border: "1px solid silver",   
                  borderRadius: "10px",
                }}
              >
                <Stack
                  sx={{
                    width: "100%",
                    padding: { xs: "0", sm: "0rem 0rem 0 2rem" },
                  }}
                  direction="column"
                  rowGap={1}
                >
                  {/* <Link to={`/job/description/${item.id}`}> */}
                   <Stack rowGap={2} columnGap={2} direction={{xs:"column",md:"row"}} justifyContent={"space-around"}>
                    <Stack direction={{xs:"row",md:"column"}} justifyContent="space-between">
                      <label>Account Name</label>
                      <h4>{data?.name}</h4>
                    </Stack>
                    {/* </Link> */}
                    <Stack direction={{xs:"row",md:"column"}} justifyContent="space-between">
                      <label>Account No</label>
                      <span>{data?.account_no}</span>
                    </Stack>
                    <Stack direction={{xs:"row",md:"column"}} justifyContent="space-between">
                      <lable>Currency</lable>
                      <p>{data?.currency}</p>
                    </Stack>
                    <Stack direction={{xs:"row",md:"column"}} justifyContent="space-between">
                      <lable>Status</lable>
                      <p>{data?.status}</p>
                    </Stack>
                    <Stack >
                      <lable>Creation Date</lable>
                      <p>
                        {moment(data?.created_at).format("ddd h:mm yy a-Do MMM")}
                      </p>
                    </Stack>
                  </Stack> 
               
                </Stack>
              </Stack>
              : <p style={{textAlign:"center",color:"red"}}>Nothing to show here yet</p>
            }
            </Grid>
          {/* );
        })} */}
 
    </div>
  );
};

export default Carddetail;
