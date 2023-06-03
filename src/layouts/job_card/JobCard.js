import { Button, Grid, Stack } from '@mui/material'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom'
import PlaceIcon from "@mui/icons-material/Place";

const JobCard = ({props}) => {
    // console.log("Properties in JobCard: ", props)

    return (
        <>
            <Grid item xs={12} p={1}>
                <Stack
                    backgroundColor="white"
                    direction="row"
                    columnGap={2}
                    justifyContent="space-between"
                    sx={{
                        padding: "1rem 2rem",
                        border: "1px solid silver",
                        borderRadius: "10px",
                    }}
                >
                    <img
                        width="60px"
                        height="60px"
                        style={{ borderRadius: "50%" }}
                        src={
                            props?.company?.profile_pic
                                ? props?.company?.profile_pic
                                : ""
                        }
                    />
                    <Stack
                        sx={{
                            width: "100%",
                            padding: { xs: "0", sm: "0rem 0rem 0 2rem" },
                        }}
                        direction="column"
                        rowGap={1}
                    >
                        <Link to={`/job/description/${props?.id}`}>
                            <h4>{props?.job_title}</h4>
                        </Link>
                        {/* <Box ><p style={{ maxWidth: "300px"}}>{short}</p></Box> */}
                        <span>{props?.company?.company_name}</span>
                        <Stack
                            // direction={{ xs: "column" }}
                            // columnGap={1}
                            // rowGap={1}
                            alignItems="left"
                        >
                            {/*  */}
                            {/* sx={{display:"flex",justifyContent:"space-between",width:"100%" ,textAlign:"center",border:"1px solid red"}} */}
                            <Stack
                                justifyContent="space-between"
                                direction={{ xs: "column", sm: "row" }}
                            >
                                <Stack direction="row">
                                    {" "}
                                    <PlaceIcon />
                                    <p>{props?.job_location}</p>
                                </Stack>

                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={`/job/apply/${props?.id}`}
                                >
                                    <Button
                                        sx={{ mt: { xs: "10px", sm: "-25px" } }}
                                        variant="outlined"
                                        color="info"
                                    >
                                        Apply
                                    </Button>
                                </Link>
                            </Stack>
                            {/* <Hidden mdDown>|</Hidden> */}
                            {/* {props?.opening_timing || props?.closing_timing ? (
                            <Stack direction="row" columnGap={1}>
                              <AccessTimeIcon />
                           
                              <p>{props?.opening_timing}</p> -{" "}
                              <p>{props?.closing_timing}</p>
                            </Stack>
                          ) : (
                            <Stack sx={{ height: "22px" }}></Stack>
                          )} */}
                            {/* <Stack direction="row" columnGap={1}>
                          <AccessTimeIcon />
                         
                       
                          <p>{props?.opening_timing}</p> -{" "}
                          <p>{props?.closing_timing}</p>
                        </Stack> */}
                        </Stack>

                        <p>
                            {/* {moment(props?.created_at).format("ddd h:mm yy a-Do MMM")} */}
                            {moment(props?.updated_at).fromNow()}
                        </p>
                    </Stack>
                </Stack>
            </Grid>
        </>
    )
}

export default JobCard