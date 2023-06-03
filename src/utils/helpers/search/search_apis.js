import { baseUrlNewsfeed } from "../../constants/base_urls";
import axios from "axios";

// get result from global_search
export const getSearchResult = async (token, searchTerm) => {
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}global_search/?search=${searchTerm}`,
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


export const getSearchResultByCategory = async (token, searchTerm, category) => {
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}global_search/?search=${searchTerm}&by_category=${category}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};