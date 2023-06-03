import { Grid } from '@mui/material'
import React, { useEffect } from 'react';
import { useAppContext } from '../../context/app-context';
import NetworkCard from '../../layouts/network/NetworkCard';

const Connection = (props) => {
    const { getMyNetwork, allNetwork } = useAppContext()
    useEffect(() => {
        getMyNetwork(props?.filter_by)
     // eslint-disable-next-line

    }, []);
    

    return (
        <>
            <Grid container>

                {allNetwork?.length === 0
                    ? "Nothing to show here"
                    : allNetwork?.map((item) => {
                        return (
                            <Grid item lg={3} md={4} sm={6} xs={12} mb={2} p={1}>
                                <NetworkCard
                                    filter_by={props?.filter_by}
                                    cover_pic={item?.mate_user?.cover_pic}
                                    profile_pic={item?.mate_user?.profile_pic}
                                    first_name={item?.mate_user?.first_name}
                                    last_name={item?.mate_user?.last_name}
                                    about={item?.mate_user?.about}
                                    work_place={item?.mate_user?.work_place}
                                    followers_count={item?.mate_user?.followers_count}
                                    id={item.id}
                                />
                            </Grid>
                        )
                    })
                }

            </Grid>

        </>
    )
}

export default Connection