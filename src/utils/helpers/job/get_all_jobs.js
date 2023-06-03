import axios from "axios";
import { baseUrlCompany } from "../../constants/base_urls";

// ===================== get all jobs  =====================

export const getAlljobs = async (token) => {
  try {
    const response = await axios.get(`${baseUrlCompany}job/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {}
};

// ===================== get single job description  =====================

export const getSinglejob = async (id, token) => {
  try {
    const response = await axios.get(`${baseUrlCompany}job/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {}
};
