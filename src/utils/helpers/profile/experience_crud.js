import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";
const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
const token = lsUser?.token?.access;

// get user experience
export const getUserExperience = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrlApi}user_experience/?profile_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// create user experience
export const createExperience = async (givenObj) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}user_experience/`,
      givenObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// update user experience
export const updateExperience = async (givenObj) => {
  const { id, ...rest } = givenObj;
  try {
    const response = await axios.put(
      `${baseUrlApi}user_experience/${id}`,
      rest,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// delete user experience
export const deleteExperience = async (id) => {
  try {
    const response = await axios.delete(`${baseUrlApi}user_experience/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
