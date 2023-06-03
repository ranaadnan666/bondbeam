import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";
const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
const token = lsUser?.token?.access;
// get user language
export const getUserLanguage = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrlApi}user_language/?profile_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// create user language
export const createLanguage = async (givenObj) => {
  try {
    const response = await axios.post(`${baseUrlApi}user_language/`, givenObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
// update user language
export const updateLanguage = async (givenObj) => {
  const { id, ...rest } = givenObj;
  try {
    const response = await axios.put(`${baseUrlApi}user_language/${id}`, rest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
// delete user language
export const deleteLanguage = async (id) => {
  try {
    const response = await axios.delete(`${baseUrlApi}user_language/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
