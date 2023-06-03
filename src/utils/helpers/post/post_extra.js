import { baseUrlNewsfeed } from "../../constants/base_urls";
import axios from "axios";

// like, dislike for (original/shared post)
export const reactOnPost = async (token, givenData) => {
  // givenData will include 3 things
  // 1. request_for = company_post/group_post/page_post/timeline_post
  // 2. post_id = id of the non shared post  || shared_post_id = id of the shared post
  // 3. status = like/dislike
  try {
    const response = await axios.post(
      `${baseUrlNewsfeed}react_on_post/`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
// like, dislike for (original/shared post)
export const updateReactOnPost = async (token, givenData) => {
  // givenData will include 2 things
  // 1. request_for = company_post/group_post/page_post/timeline_post
  // 2. post_id = id of the non shared post  || shared_post_id = id of the shared post
  try {
    const response = await axios.patch(
      `${baseUrlNewsfeed}react_on_post/`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// post a comment to post -- using base url of newsfeed
export const commentOnPost = async (token, data) => {
  // data will include 3 things
  // 1. comment_of = company_post/group_post/page_post/timeline_post
  // 2. post_id = id of the non shared post  || shared_post_id = id of the shared post
  // 3. comment = comment text
  try {
    const response = await axios.post(`${baseUrlNewsfeed}post_comment/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

export const getCommentOfPost = async (token, postId, isShared) => {
  // data will include 1 things

  // 1. post_id = id of the non shared post  || shared_post_id = id of the shared post

  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}post_comment/?${
        isShared ? "shared_post_id" : "post_id"
      }=${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

// share/repost a post -- using base url of newsfeed
export const repost = async (token, data) => {
  // data will include 3 things
  // 1. request_for= company_post/group_post/page_post/timeline_post
  // 2. post_id = id of the non shared post
  // 3. description = add description if any
  try {
    const response = await axios.post(`${baseUrlNewsfeed}share_post/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// delete a post -- using base url of newsfeed
export const deleteAPost = async (token, data) => {
  // data will include 3 things
  // 1. request_for= company_post/group_post/page_post/timeline_post
  // 2. post_id = id of the non shared post  || shared_post_id = id of the shared post
  // 3. delete = "Confirm"
  try {
    const response = await axios.delete(`${baseUrlNewsfeed}delete_user_post/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return response.data;
  } catch (error) {}
};

// like, dislike for (original/shared post)
export const reactOnComment = async (token, givenData) => {
  // givenData will include 3 things
  // 1. request_for = company_post/group_post/page_post/timeline_post
  // 2. post_id = id of the non shared post  || shared_post_id = id of the shared post
  // 3. status = like/dislike
  try {
    const response = await axios.post(
      `${baseUrlNewsfeed}react_on_comment/`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// update like, dislike for (original/shared post)
export const updateReactOnComment = async (token, givenData) => {
  // givenData will include 2 things
  // 1. request_for = company_post/group_post/page_post/timeline_post
  // 2. post_id = id of the non shared post  || shared_post_id = id of the shared post
  try {
    const response = await axios.patch(
      `${baseUrlNewsfeed}react_on_comment/`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};


export const getSinglePostData = async (token, postId, postType) => {
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}retrieve_post/?type=${postType}&object_id=${postId}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}

export const getListUserShares = async (token, postId, requestFor) => {
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}share_post_users/?post_id=${postId}&request_for=${requestFor}`,
      
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json, text/plain, */*",
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
}
