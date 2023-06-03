import React, { useEffect, useState } from 'react'
import Post from '../../components/post'
import { Grid } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useAppContext } from '../../context/app-context'
import { getSinglePostData } from '../../utils/helpers/post/post_extra'




const PostDetail = () => {
  const { postId, postType } = useParams()
  const { setAllNewsFeed, allNewsFeed} = useAppContext()
  const [singlePost, setSinglePost] = useState();

  const getData = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));

    const response = await getSinglePostData(lsUser?.token?.access, postId, postType)
    console.log("response in postDetail", response)
    

    if(response.status === true || response.status_code === 200) {

    setSinglePost(response.data) 
    console.log("response in postDetail", response)
    setAllNewsFeed((prev) => {
          const tempArr = [];
          tempArr.push(response.data);
    
          return {
            ...prev,
            idOfParent: singlePost?.id,
            data: tempArr,
          };
        });
    }
    
  }
useEffect(() => {
  getData()
}, [])

console.log(allNewsFeed)
  // const handleClickNotification = () => {
  //   // console.log("notification clicked");

  //   setAllNewsFeed((prev) => {
  //     const tempArr = [];
  //     tempArr.push(singlePost);

  //     return {
  //       ...prev,
  //       idOfParent: singlePost.id,
  //       data: tempArr,
  //     };
  //   });
  // };
 

  return (
    <>
      <Grid
        justifyContent={"center"}
        //  alignItems={"center"}
        container
        backgroundColor="#F3F2EF"
        minHeight="100vh"
        minWidth="100wh"
      >
        <Grid
          item
          alignItems={"center"}

          md={6}
          xs={12}
          pt={2}
          fontSize={{ xs: "10px", sm: "14px", md: "normal" }}
          height="fit-content"
        >
          <Post />
        </Grid>
      </Grid>


    </>
  )
}

export default PostDetail