import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import FeedIcon from "@mui/icons-material/Feed";
import PeopleIcon from "@mui/icons-material/People";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import PersonalVideoIcon from "@mui/icons-material/PersonalVideo";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import ViewQuiltIcon from "@mui/icons-material/ViewQuilt";
import WorkIcon from '@mui/icons-material/Work';

export const menuDataTabs = [
  {
    id: 0,
    title: "All",
    icon: <AllInclusiveIcon />,
    query: "all"
  },
  {
    id: 1,
    title: "Posts",
    icon: <FeedIcon />,
    query: "posts"
  },
  {
    id: 2,
    title: "People",
    icon: <PeopleIcon />,
    query: "users"
  },
  {
    id: 3,
    title: "Photos",
    icon: <InsertPhotoIcon />,
    query: "images"
  },
  {
    id: 4,
    title: "Videos",
    icon: <PersonalVideoIcon />,
    query: "videos"
  },
  {
    id: 5,
    title: "Companies",
    icon: <ApartmentIcon />,
    query: "companies"
  },
  {
    id: 6,
    title: "Groups",
    icon: <GroupsIcon />,
    query: "groups"
  },
  {
    id: 7,
    title: "Pages",
    icon: <ViewQuiltIcon />,
    query: "pages"
  },
  {
    id: 8,
    title: "Jobs",
    icon: <WorkIcon />,
    query: "jobs"
  },
];
