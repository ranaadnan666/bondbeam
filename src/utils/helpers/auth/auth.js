import axios from "axios";
import { baseUrlApi } from "../../constants/base_urls";

// register user
export const registerUser = async (givenData) => {
  try {
    const response = await axios.post(`${baseUrlApi}register/`, givenData);
    localStorage.setItem("userLoggedIn", JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// verify email
export const verifyEmail = async (givenData) => {
  try {
    const response = await axios.post(`${baseUrlApi}verify_email/`, givenData);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// resend code
export const resendCode = async (id) => {
  try {
    const response = await axios.post(`${baseUrlApi}resend_email_otp/`, id);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// login User
export const login = async (givenData) => {
  try {
    const response = await axios.post(`${baseUrlApi}user_login/`, givenData);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// login with google
export const loginWithGoogle = async (givenData) => {
  try {
    const response = await axios.post(`${baseUrlApi}social_login/`, givenData);
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

// login with facebook
// export const responseFacebook = async(response) => {
  // await axios.post(`https://api.bondbeam.com/api/facebook_login/`,JSON.stringify(response),{
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   }    
  // })
  // const getToken=localStorage.getItem("accessToken")
  // localStorage.setItem("accessToken",JSON.stringify(response?.accessToken))
 
  // await axios.post(`https://api.bondbeam.com/api/facebook_login/`,response,{
  //   headers: {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //   }    
  // })
//  console.log(response)
//   }


// forget password
export const forgetPassword = async (givenData) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}user_forgot_password/`,
      givenData
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};

//  reset password
export const resetPassword = async (givenData) => {
  try {
    const response = await axios.post(
      `${baseUrlApi}user_reset_password/`,
      givenData
    );
    return response?.data;
  } catch (error) {
    return error?.response?.data;
  }
};
