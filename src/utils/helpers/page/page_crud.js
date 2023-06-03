import axios from "axios";
import { baseUrlNewsfeed, baseUrlPage } from "../../constants/base_urls";

//================= get all pages =================
export const getAllPages = async (token) => {
  try {
    const response = await axios.get(`${baseUrlPage}page/?filter_by=AllPages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

//================ get pages by query ==================

// 1. filter_by=YourPage
// 2. filter_by=JoinedPage
// 3. filter_by=RequestedPage
// 4. filter_by=SuggestedPage

export const getPagesByQuery = async (token, query) => {
  try {
    const response = await axios.get(`${baseUrlPage}page/?filter_by=${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// get details of single page by id
export const getPageDetailsById = async (token, pageId) => {
  try {
    const response = await axios.get(`${baseUrlPage}page/${pageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// get newsfeed of a page by id
export const getPageNewsfeedById = async (token, pageId) => {
  try {
    const response = await axios.get(`${baseUrlPage}page_newsfeed/${pageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// get all categories of a page
export const getPageCategories = async (token) => {
  try {
    const response = await axios.get(`${baseUrlPage}category/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// create a new page
export const createPage = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrlPage}page/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// create new post for a page
export const createPagePost = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrlPage}page_post/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// post a comment to page post -- using base url of newsfeed
export const postCommentToPagePost = async (token, data) => {
  // data will include 3 things
  // 1. comment_of = page_post
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

// get all comments of a page post -- using base url of newsfeed
export const getPagePostComments = async (token, postId, isShared) => {
  // isShared -- boolean (true/false)
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}post_comment/?comment_of=page_post&${
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

// like others page
export const likePage = async (token, pageId) => {
  console.log("Token: ", token);

  try {
    const response = await axios.post(
      `${baseUrlPage}page_follow/`,
      { page_id: pageId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.log(error);
  }
};
// un-like others page
export const unLikePage = async (token, pageId) => {
  console.log("Token: ", token);
  try {
    const response = await axios.delete(`${baseUrlPage}page_follow/`, {
      data: { page_id: pageId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    // return response.data;
  } catch (error) {
    console.log(error);
  }
};

// get all followers of a page
export const getPageFollowers = async (token, pageId) => {
  try {
    const response = await axios.get(`${baseUrlPage}page_follow/${pageId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // return response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// ============== update page details ==============
export const updatePageDetails = async (token, pageId, data) => {
  try {
    const response = await axios.patch(`${baseUrlPage}page/${pageId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

