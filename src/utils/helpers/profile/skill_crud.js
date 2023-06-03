import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";
const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
const token = lsUser?.token?.access;
// get user skill
export const getUserSkill = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrlApi}user_skill/?profile_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// create user skill
export const createSkill = async (givenObj) => {
  try {
    const response = await axios.post(`${baseUrlApi}user_skill/`, givenObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
// update user skill
export const updateSkill = async (givenObj) => {
  const { id, ...rest } = givenObj;
  try {
    const response = await axios.put(`${baseUrlApi}user_skill/${id}`, rest, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
// delete user skill
export const deleteSkill = async (id) => {
  try {
    const response = await axios.delete(`${baseUrlApi}user_skill/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
