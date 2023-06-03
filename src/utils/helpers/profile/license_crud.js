import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";
const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
const token = lsUser?.token?.access;
// get user license
export const getUserLicense = async (id) => {
  try {
    const response = await axios.get(
      `${baseUrlApi}user_license_certificate/?profile_id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
// create user license
export const createLicense = async (givenObj) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}user_license_certificate/`,
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
// update user license
export const updateLicense = async (givenObj) => {
  const { id, ...rest } = givenObj;
  try {
    const response = await axios.put(
      `${baseUrlApi}user_license_certificate/${id}`,
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
// delete user license
export const deleteLicense = async (id) => {
  try {
    const response = await axios.delete(
      `${baseUrlApi}user_license_certificate/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
