import axios from "axios";
import { baseUrlNewsfeed } from "../../constants/base_urls";

// get newsfeed
export const getAllNewsfeed = async (token, limit) => {
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}new_newsfeed?page_size=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
