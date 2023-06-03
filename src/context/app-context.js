import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import {
  baseUrlApi,
  baseUrlNewsfeed,
  baseUrlLocalServer,
} from "../utils/constants/base_urls";
import { localToken } from "../utils/constants/tokens";
import {
  getUserBio,
  getRecentlyArrived,
  getSingleUserTimeline,
} from "../utils/helpers/user/user_data";
import { getAllNewsfeed } from "../utils/helpers/news_feed/get_all_posts";
import {
  companyInitialState,
  groupInitialState,
  pageInitialState,
  postInitialState,
} from "./initial_states/post_initial_state";
import { getCompanyNewsfeedById } from "../utils/helpers/company/company_crud";
import { getGroupNewsfeedById } from "../utils/helpers/group/group_crud";
import { getPageNewsfeedById } from "../utils/helpers/page/page_crud";
import { getNotifications } from "../utils/helpers/notification/notifications";
import { getAllConnection } from "../utils/helpers/network/network";
import { getAllSuggestion } from "../utils/helpers/network/network";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showAccess, setShowAccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editmode, setEditmode] = useState(false);
  const [user, setUser] = useState({});
  const [blur, setBlur] = useState(false);
  const [recentArrived, setRecentArrived] = useState(null);
  const [chatUsers, setChatUsers] = useState([]);
  const [chatUserId, setChatUserId] = useState(null);
  const [messagesOfSingleChatRoom, setMessagesOfSingleChatRoom] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [chatRoomId, setChatRoomId] = useState(null);
  const [generalIdofParent, setGeneralIdofParent] = useState(null);
  const [notifications, setAllNotifications] = useState([]);
  const [allNetwork, setAllNetwork] = useState([]);
  // page info

  const [selectedAdvertiseContent, setSelectedAdvertiseContent] =
    useState("audience");
  const [allSuggestion, setAllSuggestion] = useState([]);
  // list of all members of Company/Group/Page
  const [membersList, setMembersList] = useState([]);
  // create, update, delete & share post
  const [post, setPost] = useState(postInitialState);
  // state for all newsfeed overall application
  const [allNewsFeed, setAllNewsFeed] = useState({
    data: [],
    postOf: "",
    idOfParent: "",
    isError: false,
    isModalOpen: false,
    msg: "",
  });
  // state for company form data (create, update)
  const [companyFormData, setCompanyFormData] = useState(companyInitialState);

  // state for group form data (create, update)
  const [groupFormData, setGroupFormData] = useState(groupInitialState);

  // state for page form data (create, update)
  const [pageFormData, setPageFormData] = useState(pageInitialState);

  // state for global search
  const [searchResult, setSearchResult] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
  const token = lsUser?.token?.access;
  const lsUserId = lsUser?.data?.id;

  useEffect(() => {
    if (chatUsers.length > 0 && chatUserId) {
      const filteredChatUser = chatUsers.filter(
        (user) => user.other_user.id === chatUserId
      );
      setActiveChatUser(filteredChatUser[0]);
    }
  }, [chatUserId]);

  useEffect(() => {
    getAllNotifications(1);
  }, []);
  // ===================== get user bio =====================
  const userInfo = async (givenId, givenToken) => {
    const response = await getUserBio(givenId, givenToken);
    setUser(response);
  };

  // ===================== get recently arrived user =====================
  const getRecentArrived = async (givenToken) => {
    const response = await getRecentlyArrived(givenToken);
    setRecentArrived(response?.results);
  };

  // ===================== get news feed =====================
  const getNewsFeed = async () => {
    // setLoading(true);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getAllNewsfeed(lsUser?.token?.access, 10);
    setAllNewsFeed((prev) => {
      return {
        ...prev,
        data: response?.results,
        postOf: "main",
        idOfParent: null,
      };
    });
    // setLoading(false);
  };
  // ===================== get compnay newsfeed =====================
  const getCompanyNewsfeed = async (givenId) => {
    // setLoading(true);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getCompanyNewsfeedById(
      lsUser?.token?.access,
      givenId
    );
    const idOfCompany =
      response?.results[0]?.company ||
      response?.results[0]?.original_post?.company;
    setAllNewsFeed((prev) => {
      return {
        ...prev,
        data: response?.results,
        postOf: "company",
        idOfParent: idOfCompany,
      };
    });
    // setLoading(false);
  };
  // ===================== get group newsfeed =====================
  const getGroupNewsfeed = async (givenId) => {
    // setLoading(true);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getGroupNewsfeedById(lsUser?.token?.access, givenId);
    const idOfGroup =
      response?.results[0]?.group || response?.results[0]?.original_post?.group;
    setAllNewsFeed((prev) => {
      return {
        ...prev,
        data: response?.results,
        postOf: "group",
        idOfParent: idOfGroup,
      };
    });
    // setLoading(false);
  };
  // ===================== get page newsfeed =====================
  const getPageNewsfeed = async (givenId) => {
    // setLoading(true);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getPageNewsfeedById(lsUser?.token?.access, givenId);
    const idOfPage =
      response?.results[0]?.page || response?.results[0]?.original_post?.page;
    setAllNewsFeed((prev) => {
      return {
        ...prev,
        data: response?.results,
        postOf: "page",
        idOfParent: idOfPage,
      };
    });
    // setLoading(false);
  };

  // ===================== get all notification =====================

  const getAllNotifications = async (page_no) => {
    // setLoading(true);
    console.log("page_no in getAllNotifications app_context", page_no);

    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getNotifications(lsUser?.token?.access, page_no);

    console.log("Notification in App_context", response?.results);

    setAllNotifications(response);
  };
  // ===================== get user timeline =====================
  const getUserTimeline = async (userId) => {
    // setLoading(true);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getSingleUserTimeline(userId, lsUser?.token?.access);
    // const idOfTimeline =
    //   response?.results[0]?.timeline ||
    //   response?.results[0]?.original_post?.timeline;
    setAllNewsFeed((prev) => {
      return {
        ...prev,
        data: response?.results,
        postOf: "timeline",
        idOfParent: null,
      };
    });
    // setLoading(false);
  };

  // get likes of post
  const getLikesPost = async (post_type, id) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
      const response = await axios.get(
        `${baseUrlNewsfeed}react_on_post/?${post_type}=${id}`,

        {
          headers: {
            Authorization: `Bearer ${lsUser?.token?.access}`,
            // "Content-Encoding": "gzip",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      // setLoadingForLike(false);
      return response?.data;
    } catch (error) {
      // setLoadingForLike(false);

      return error?.response?.data;
    }
  };

  // post comment
  const postComment = async (givenObj) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
      const response = await axios.post(
        `${baseUrlNewsfeed}post_comment/`,
        givenObj,
        {
          headers: {
            Authorization: `Bearer ${lsUser?.token?.access}`,
            // "Content-Encoding": "gzip",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  };
  // post comment Reply
  const postCommentReply = async (givenObj) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
      const response = await axios.post(
        `${baseUrlNewsfeed}post_comment/`,
        givenObj,
        {
          headers: {
            Authorization: `Bearer ${lsUser?.token?.access}`,
            // "Content-Encoding": "gzip",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  // get chat users list
  const getChatUsersList = async () => {
    try {
      const response = await axios.get(
        `${baseUrlLocalServer}user_chat/get_user_chat_rooms`,
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
            // "Content-Encoding": "gzip",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      setChatUsers(response?.data?.data);
    } catch (error) {
      return error?.response?.data;
    }
  };

  // get single user chat list
  const getSingleUserChatList = async (chat_id, userId) => {
    setChatUserId(userId);
    setChatRoomId(chat_id);
    try {
      const response = await axios.post(
        `${baseUrlLocalServer}user_chat/get_user_sms/`,
        { chat_id },
        {
          headers: {
            Authorization: `Bearer ${localToken}`,
            // "Content-Encoding": "gzip",
            Accept: "application/json, text/plain, */*",
          },
        }
      );
      setMessagesOfSingleChatRoom(response?.data?.results);
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  // user follow and unfollow
  const userFollowUnfollow = async (givenObj) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
      const response = await axios.post(
        `${baseUrlApi}user_follow_unfollow/`,
        givenObj,
        {
          headers: {
            Authorization: `Bearer ${lsUser?.token?.access}`,
          },
        }
      );
      if (response?.data?.status && response?.data?.status_code === 200) {
        getRecentArrived(lsUser?.token?.access);
      }
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  // user profile update
  const userProfileUpdate = async (givenObj, userId) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    try {
      const response = await axios.patch(
        `${baseUrlApi}user_profile/${userId}`,
        givenObj,
        {
          headers: {
            Authorization: `Bearer ${lsUser?.token?.access}`,
          },
        }
      );
      setUser(response?.data);
      //
      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  // delete comment
  const deleteComment = async (givenObj) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));

    try {
      const response = await axios.delete(
        `https://api.bondbeam.com/newsfeed/post_comment/`,
        {
          headers: {
            Authorization: `Bearer ${lsUser?.token?.access}`,
          },
          data: givenObj,
        }
      );

      return response?.data;
    } catch (error) {
      return error?.response?.data;
    }
  };

  useEffect(() => {
    if (token) {
      userInfo(lsUserId, token);
    }
  }, [token, lsUserId]);

  // all network
  const getMyNetwork = async (filter_by) => {
    try {
      const response = await getAllConnection(filter_by);
      setAllNetwork(response.results);
      return response;
    } catch (error) {
      return error?.response?.data;
    }
  };

  // all network suggestion
  const getMySuggestion = async () => {
    try {
      const response = await getAllSuggestion();
      setAllSuggestion(response.results);
      return response;
    } catch (error) {
      return error?.response?.data;
    }
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        editmode,
        user,
        blur,
        recentArrived,
        chatUsers,
        messagesOfSingleChatRoom,
        activeChatUser,
        chatUserId,
        chatRoomId,
        getUserTimeline,
        allNewsFeed,
        setAllNewsFeed,
        post,
        membersList,
        setMembersList,
        setEditmode,
        getCompanyNewsfeed,
        getGroupNewsfeed,
        getPageNewsfeed,
        setPost,
        setMessagesOfSingleChatRoom,
        deleteComment,
        userInfo,
        userProfileUpdate,
        userFollowUnfollow,
        getRecentArrived,
        getSingleUserChatList,
        postComment,
        postCommentReply,
        getNewsFeed,
        setUser,
        setBlur,
        setLoading,
        generalIdofParent,
        setGeneralIdofParent,
        notifications,
        getAllNotifications,
        setAllNotifications,
        allNetwork,
        setAllNetwork,
        getMyNetwork,
        allSuggestion,
        setAllSuggestion,
        getMySuggestion,
        getLikesPost,
        // for company
        companyFormData,
        setCompanyFormData,
        // for group
        groupFormData,
        setGroupFormData,
        // for page
        pageFormData,
        setPageFormData,
        selectedAdvertiseContent,
        setSelectedAdvertiseContent,
        // search
        searchResult,
        setSearchResult,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
