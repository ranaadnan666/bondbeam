import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";
const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
const token = lsUser?.token?.access;
// get user education
export const getUserEducation = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrlApi}user_education/?profile_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// create user education
export const createEducation = async (givenObj) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}user_education/`,
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
// update user education
export const updateEducation = async (givenObj) => {
  const { id, ...rest } = givenObj;
  try {
    const response = await axios.put(
      `${baseUrlApi}user_education/${id}`,
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
// delete user education
export const deleteEducation = async (id) => {
  try {
    const response = await axios.delete(`${baseUrlApi}user_education/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
