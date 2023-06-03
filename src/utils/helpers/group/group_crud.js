import axios from "axios";
import { baseUrlGroup, baseUrlNewsfeed } from "../../constants/base_urls";

//================= get all groups =================
export const getAllGroups = async (token) => {
  try {
    const response = await axios.get(
      `${baseUrlGroup}group/?filter_by=AllGroups`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

//================ get groups by query ==================

// 1. filter_by=YourGroups
// 2. filter_by=JoinedGroups
// 3. filter_by=RequestedGroups
// 4. filter_by=SuggestedGroups

export const getGroupsByQuery = async (token, query) => {
  try {
    const response = await axios.get(
      `${baseUrlGroup}group/?filter_by=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

// get details of single group by id
export const getGroupDetailsById = async (token, groupId) => {
  try {
    const response = await axios.get(`${baseUrlGroup}group/${groupId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// get all members of a group by id
export const getGroupMembersById = async (token, groupId) => {
  try {
    const response = await axios.get(
      `${baseUrlGroup}get_group_members/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// get all joining requests of a group by id
export const getGroupJoiningRequestsById = async (token, groupId) => {
  try {
    const response = await axios.get(
      `${baseUrlGroup}group_joing_request/?group_id=${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

// get newsfeed of a group by id
export const getGroupNewsfeedById = async (token, groupId) => {
  try {
    const response = await axios.get(
      `${baseUrlGroup}group_newsfeed/${groupId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

// get all categories of a group
export const getGroupCategories = async (token) => {
  try {
    const response = await axios.get(`${baseUrlGroup}category/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// create a new group
export const createGroup = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrlGroup}group/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// create new post for a group
export const createGroupPost = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrlGroup}group_post/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// post a comment to group post -- using base url of newsfeed
export const postCommentToGroupPost = async (token, data) => {
  // data will include 3 things
  // 1. comment_of = group_post
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

// get all comments of a group post -- using base url of newsfeed
export const getGroupPostComments = async (token, postId, isShared) => {
  // isShared -- boolean (true/false)
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}post_comment/?comment_of=group_post&${
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

// join others group
export const joinGroup = async (token, groupId) => {
  console.log("Token", token);

  try {
    const response = await axios.post(
      `${baseUrlGroup}group_join_request/`,
      { group_id: groupId },
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
// leave others group
export const leaveGroup = async (token, groupId) => {
  console.log("Token", token);
  try {
    const response = await axios.delete(`${baseUrlGroup}group_join_request/`, {
      data: { group_id: groupId },
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

// ================== update group details ==================
export const updateGroupDetails = async (token, groupId, data) => {
  try {
    const response = await axios.patch(
      `${baseUrlGroup}group/${groupId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
