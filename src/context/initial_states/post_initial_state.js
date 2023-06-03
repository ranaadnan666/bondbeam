export const postInitialState = {
  dialog: false,
  desc: "",
  media: [],
  editMode: false,
  sharedPostId: null,
  editPostId: null,
  shareMode: false,
  imageMode: false,
  videoMode: false,
  displayLabels: false,
  loading: false,
  postUserId: null,
  postIsShared: false,
};
// initial state for company form
export const companyInitialState = {
  name: "",
  headline: "",
  mail: "",
  weblink: "",
  shifts: "",
  category: "",
  description: "goog to go",
  address: "",
  employees: "",
  profile_pic: "",
  cover_pic: "",
  about: "",
  opening_time: "",
  closing_time: "",
  isError: false,
  isModalOpen: false,
  editMode: false,
};

// initial state for group form
export const groupInitialState = {
  name: "",
  category: "",
  phone_code: "",
  phone_no: "",
  profile_pic: "",
  cover_pic: "",
  about: "",
  isError: false,
  displayMessage: "",
  isModalOpen: false,
  editMode: false,
};

// initial state for page form
export const pageInitialState = {
  name: "",
  location: "",
  web_link: "",
  category: "",
  phone_code: "",
  phone_no: "",
  profile_pic: "",
  cover_pic: "",
  about: "",
  isError: false,
  displayMessage: "",
  isModalOpen: false,
  editMode: false,
};
