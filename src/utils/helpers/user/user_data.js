import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";
import { baseUrlNewsfeed } from "../../constants/base_urls";
// get user bio
export const getUserBio = async (id, token) => {
  try {
    const response = await axios.get(`${baseUrlApi}user_profile/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// get user_timeline
export const getSingleUserTimeline = async (id, token) => {
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}user_timeline/?profile_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

// recently arrived
export const getRecentlyArrived = async (token) => {
  try {
    const response = await axios.get(`${baseUrlApi}recent_arrived_user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

// follow user
export const followUser = async (user, token) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}user_follow_unfollow/`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// un-follow user
export const unFollowUser = async (user, token) => {
  try {
    const response = await axios.put(
      `${baseUrlApi}user_follow_unfollow/`,
      user,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// block user
export const block = async (id, token) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}block_user/`,
      { block_user: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// un-block user
export const unBlock = async (id, token) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}block_user/`,
      {
        unblock_user: "true",
        block_user: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

export const fcm_token = async (id, token) => {
  console.log("Handle FCM token is Running , ", token, id);
  try {
    const response = await axios.post(
      `${baseUrlApi}fcm_device_token/`,
      {
        device_id: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};