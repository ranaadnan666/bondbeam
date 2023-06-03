import axios from "axios";
import { baseUrlCompany } from "../../constants/base_urls";

// ===================== post new job  =====================

export const postJobs = async (formData, token) => {
  try {
    const response = await axios.post(`${baseUrlCompany}job/`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {}
};

// ===================== search job  =====================

export const getSearchjobs = async (token, search, location) => {
  try {
    const response = await axios.get(
      `${baseUrlCompany}job/?search=${search}&location=${location}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {}
};

// ===================== applly on job  =====================

export const applyJob = async (token, formData) => {
  try {
    const response = await axios.post(
      `${baseUrlCompany}apply_on_job/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {}
};

// ===================== Delete job  =====================

export const deleteJobs = async (job_id, obj, token) => {
  try {
    const response = await axios.delete(`${baseUrlCompany}job/${job_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: obj,
    });
    return response?.data;
  } catch (error) {}
};

// ===================== update job  =====================

export const updateJob = async (job_id, givenObj, token) => {
  try {
    const response = await axios.patch(
      `${baseUrlCompany}job/${job_id}`,
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
