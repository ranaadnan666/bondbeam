import axios from "axios";
import { baseUrlCompany, baseUrlNewsfeed } from "../../constants/base_urls";

//================= get all companies =================
export const getAllCompanies = async (token) => {
  try {
    const response = await axios.get(
      `${baseUrlCompany}companies/?filter_by=AllCompanies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

//================ get companies by query ==================

// 1. filter_by=YourCompany
// 2. filter_by=JoinedCompany
// 3. filter_by=RequestedCompany
// 4. filter_by=SuggestedCompany

export const getCompaniesByQuery = async (token, query) => {
  try {
    const response = await axios.get(
      `${baseUrlCompany}companies/?filter_by=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

//============== get details of single company by id ===============
export const getCompanyDetailsById = async (token, companyId) => {
  try {
    const response = await axios.get(
      `${baseUrlCompany}companies/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

//===================== get newsfeed of a company by id =====================
export const getCompanyNewsfeedById = async (token, companyId) => {
  try {
    const response = await axios.get(
      `${baseUrlCompany}company_newsfeed/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {}
};

//=============== get all jobs of a company by id ================
export const getCompanyJobsById = async (token, companyId) => {
  try {
    const response = await axios.get(`${baseUrlCompany}job`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

//================== get all categories of a company ==================
export const getCompanyCategories = async (token) => {
  try {
    const response = await axios.get(`${baseUrlCompany}companies_category/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

//====================== create a new company ======================
export const createCompany = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrlCompany}companies/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

//===================== create new post for a company =====================
export const createCompanyPost = async (token, data) => {
  try {
    const response = await axios.post(`${baseUrlCompany}company_post/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

//=================== post a comment to company post -- using base url of newsfeed ==================
export const postCommentToPost = async (token, data) => {
  // data will include 3 things
  // 1. comment_of = company_post
  // 2. post_id = id of the non shared post  || shared_post_id = id of the shared post
  // 3. comment = comment text
  try {
    const response = await axios.post(`${baseUrlNewsfeed}post_comment/`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {}
};

//===================== get all comments of a company post -- using base url of newsfeed =====================
export const getCompanyPostComments = async (token, postId, isShared) => {
  // isShared -- boolean (true/false)
  try {
    const response = await axios.get(
      `${baseUrlNewsfeed}post_comment/?comment_of=company_post&${
        isShared ? "shared_post_id" : "post_id"
      }=${postId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {}
};

//====================== follow others company ======================
export const followCompany = async (token, companyId) => {
  console.log(token);
  console.log(companyId);
  try {
    const response = await axios.post(
      `${baseUrlCompany}company_follow/`,
      { compnay_id: companyId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
//================= un-follow others company =================
export const unFollowCompany = async (token, companyId) => {
  console.log("Un-Follow Company token", token);
  try {
    const response = await axios.delete(
      `${baseUrlCompany}company_follow/`,

      {
        data: { compnay_id: companyId },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
    // console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

//====================== get all followers of a company ====================
export const getCompanyFollowers = async (token, companyId) => {
  try {
    const response = await axios.get(
      `${baseUrlCompany}company_follow/${companyId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // return response.data;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};

// ====================== edit company details =====================
export const editCompanyDetails = async (token, companyId, data) => {
  try {
    const response = await axios.patch(
      `${baseUrlCompany}companies/${companyId}`,
      data,
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
