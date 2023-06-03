import { async } from "@firebase/util";
import axios from "axios";
import { baseUrlAdvertisement } from "../../constants/base_urls";

// ================get account detail==================

export const getAccountDetail =async(token) => {
  try {
    const response = await axios.get(`${baseUrlAdvertisement}account/1`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {}
};

// ================get compaign list==================

export const getComaignList = async (token) => {
  try {
    const response = await axios.get(`${baseUrlAdvertisement}campaign/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {}
};

// ================get compaign group==================

export const getCompaignGroup = async (token) => {
  try {
    const response = await axios.get(`${baseUrlAdvertisement}campaign_group/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {}
};
// ================create account for advertise==================
export const CreateAddAccount =async (givenObj, token) => {
  try {
    const response =await axios.post(`${baseUrlAdvertisement}account/`, givenObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// ================create compaign group ==================

export const CreateCompaignGroup =async (givenObj, token) => {
  try {
    const response =await axios.post(
      `${baseUrlAdvertisement}campaign_group/`,
      givenObj,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ==================create compaign  ==================

export const CreateCompaign =async (givenObj, token) => {
  try {
    const response =await axios.post(`${baseUrlAdvertisement}campaign/`, givenObj, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response?.data;
  } catch (error) {
    console.log(error);
  }
};

// ==================Update compaign ==================

export const updateCompaign =async (id, token) => {
  try {
    const response =await axios.patch(
      `${baseUrlAdvertisement}campaign/${id}`,
      {},
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

// ================Update compaign group ==================

export const updateCompaignGroup =async (id, token) => {
  try {
    const response =await axios.patch(
      `${baseUrlAdvertisement}campaign_group/${id}`,
      {},
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

// ================Delete compaign group ==================

export const DeleteCompaignGroup =async (id, token) => {
  try {
    const response =await axios.delete(
      `${baseUrlAdvertisement}campaign_group/${id}`,
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

// ================Delete compaign group ==================

export const DeleteCompaign =async (id, token) => {
  try {
    const response =await axios.delete(`${baseUrlAdvertisement}campaign/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
