import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ApartmentIcon from "@mui/icons-material/Apartment";
import WorkIcon from "@mui/icons-material/Work";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import NotificationsIcon from "@mui/icons-material/Notifications";

const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));

export const sidebar = [
  {
    id: 1,
    name: "My Profile",
    icon: <PersonIcon />,
    url: `/profile/${lsUser?.data?.id}`,
  },
  {
    id: 2,

    name: "General Settings",
    icon: <SettingsIcon />,
    url: "/setting/general",
  },
  {
    id: 3,
    name: "Companies",
    icon: <ApartmentIcon />,
    url: "/company/list",
  },
  {
    id: 4,
    name: "Jobs",
    icon: <WorkIcon />,
    url: "/job/findjob",
  },
  {
    id: 5,
    name: "Groups",
    icon: <GroupsIcon />,
    url: "/group/list",
  },
  {
    id: 6,
    name: "Pages",
    icon: <ArticleIcon />,
    url: "/page/list",
  },
  {
    id: 7,
    name: "Projects",
    icon: <AccountTreeIcon />,
    url: "/projects",
  },
  {
    id: 8,
    name: "My Network",
    icon: <SupervisorAccountIcon />,
    url: "/network",
  },
  // {
  //   id: 8,
  //   name: "Notifications",
  //   icon: <NotificationsIcon />,
  //   url: "/commingsoon",

  // },
];
