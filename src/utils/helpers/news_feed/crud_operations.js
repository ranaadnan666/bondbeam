import axios from "axios";
import { baseUrlNewsfeed } from "../../constants/base_urls";

// create post
export const createPost = async (givenData, token) => {
  try {
    const response = await axios.post(
      `${baseUrlNewsfeed}user_post/`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
// share post
export const sharePost = async (givenObj, token) => {
  try {
    const response = await axios.post(
      `${baseUrlNewsfeed}share_post/`,
      givenObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
// update post
export const updatePost = async (givenData, token) => {
  try {
    const response = await axios.post(
      `${baseUrlNewsfeed}update_post/`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// update shared post
export const updateSharedPost = async (givenData, sharedPostId, token) => {
  try {
    const response = await axios.patch(
      `${baseUrlNewsfeed}update_share_post/${sharedPostId}`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// delete post
export const deletePost = async (givenData, token) => {
  try {
    const response = await axios.post(
      `${baseUrlNewsfeed}delete_user_post/`,
      givenData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// like original post
// export const likeOriginalPost = async (givenData, token) => {
//   try {
//     const response = await axios.post(
//       `${baseUrlNewsfeed}like_post/`,
//       givenData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Encoding": "gzip",
//           Accept: "application/json, text/plain, */*",
//         },
//       }
//     );
//     return response?.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };
// // dislike original post
// export const dislikeOriginalPost = async (givenData, token) => {
//   try {
//     const response = await axios.post(
//       `${baseUrlNewsfeed}like_post/`,
//       givenData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Encoding": "gzip",
//           Accept: "application/json, text/plain, */*",
//         },
//       }
//     );
//     return response?.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };
// // like shared post
// export const likeSharedPost = async (givenData, token) => {
//   try {
//     const response = await axios.post(
//       `${baseUrlNewsfeed}shared_post_like_dislike/`,
//       givenData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Encoding": "gzip",
//           Accept: "application/json, text/plain, */*",
//         },
//       }
//     );
//     return response?.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };
// // dislike shared post
// export const dislikeSharedPost = async (givenData, token) => {
//   try {
//     const response = await axios.post(
//       `${baseUrlNewsfeed}shared_post_like_dislike/`,
//       givenData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Encoding": "gzip",
//           Accept: "application/json, text/plain, */*",
//         },
//       }
//     );
//     return response?.data;
//   } catch (error) {
//     return error?.response?.data;
//   }
// };
