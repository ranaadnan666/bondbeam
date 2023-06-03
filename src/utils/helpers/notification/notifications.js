import React from 'react';
import axios from 'axios';
import { baseUrlApi } from '../../constants/base_urls';


export const getNotifications = async (token, page_no) => {
    try {
        const response = await axios.get(
          `${baseUrlApi}notification/?page=${page_no}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
      } catch (error) {}
}

export const readNotifications = async (token, id) => {
  try {
      const response = await axios.post(
        `${baseUrlApi}notification/`,
        
           {
            record_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
       
      );
      return response.data;
    } catch (error) {}
}

