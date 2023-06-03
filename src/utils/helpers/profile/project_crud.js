import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";
const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
const token = lsUser?.token?.access;
// get user project
export const getUserProject = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrlApi}user_project/?profile_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// create user project
export const createProject = async (givenObj) => {
  try {
    const response = await axios.post(`${baseUrlApi}user_project/`, givenObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
// update user project
export const updateProject = async (givenObj) => {
  const { formData, id } = givenObj;
  try {
    const response = await axios.put(
      `${baseUrlApi}user_project/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// delete user project
export const deleteProject = async (id) => {
  try {
    const response = await axios.delete(`${baseUrlApi}user_project/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};
