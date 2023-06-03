import { lazy } from "react";
// settings without lazy-lading - start
import ProfileSetting from "../pages/settings/Profile";
import ProfileVerification from "../pages/settings/ProfileVerification";
import Comming from "../pages/welcome/Comming";
import Settings from "../pages/settings/Settings";
// settings wihtout lazy loading - end
import Feedback from "../pages/feedback/Feedback";
import GroupJoiningRequestsList from "../pages/list/GroupJoiningRequestsList";
import Network from "../pages/networks/Network";
import Analyzetab from "../components/advertisement/analyze/Tab";
import Advertisement from "../pages/advertisement/Advertisement";
import CreateAccount from "../components/advertisement/account/Account";
import PostDetail from "../pages/post_detail/PostDetail";
import CreateAccountAdvertisement from "../components/advertisement/analyze/CreateaAcountAdvertisement";
import Main from "../components/advertisement/main/Main";
import Analytics from "../components/advertisement/analyze/Analytics";
import Audience from "../components/advertisement/audience/Audience";
import Websitedemographic from "../components/advertisement/analyze/WebsiteDemoGraphic";
import InsightTag from "../components/advertisement/analyze/InsightTag";
import ConversionTrack from "../components/advertisement/analyze/ConversionTracking";
import ManageAccess from "../components/advertisement/manageaccess/ManageAccess";
import BillingCenter from "../components/advertisement/accountsetting/BillingCenter";
import EditAccount from "../components/advertisement/account/EditAccount";
import Projects from "../pages/projects/Projects";
import Product from "../components/products/products";
import CreateProduct from "../components/products/createproduct";

const Notification = lazy(() => import("../pages/notification/Notification"));
const GroupMembersList = lazy(() => import("../pages/list/GroupMembersList"));
const NewsFeed = lazy(() => import("../pages/newsfeed/NewsFeed"));
const SignIn = lazy(() => import("../pages/signin/SignIn"));
const SignUp = lazy(() => import("../pages/signup/SignUp"));
const Verification = lazy(() => import("../pages/verification/Verification"));
const Welcome = lazy(() => import("../pages/welcome/Welcome"));
const ForgetPassword = lazy(() => import("../pages/password/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/password/ResetPassword"));
const Notifications = lazy(() => import("../pages/settings/Notifications"));
const General = lazy(() => import("../pages/settings/General"));
const Privacy = lazy(() => import("../pages/settings/Privacy"));
const Password = lazy(() => import("../pages/settings/Password"));
const Sessions = lazy(() => import("../pages/settings/Sessions"));
const TwofacAuth = lazy(() => import("../pages/settings/TwofacAuth"));
const Block = lazy(() => import("../pages/settings/Block"));
const Delete = lazy(() => import("../pages/settings/Delete"));
const ManageSkill = lazy(() => import("../pages/settings/Skill/ManageSkill"));
const ManageProject = lazy(() => import("../pages/settings/project/ManagePro"));
const ManageExperience = lazy(() => import("../pages/settings/Exp/ManageExp"));
// settings - end
const AllFollowers = lazy(() => import("../pages/list/FollowersList"));
const AllFollowings = lazy(() => import("../pages/list/FollowingsList"));
const Maintenance = lazy(() => import("../pages/maintenance/Maintenance"));
const Chat = lazy(() => import("../pages/chat"));
const Profile = lazy(() => import("../pages/profile/Profile"));
const UserVideosList = lazy(() => import("../pages/list/UserVideosList"));
const UserImagesList = lazy(() => import("../pages/list/UserImagesList"));
const PostImagesList = lazy(() => import("../pages/list/PostImagesList"));
const PostVideosList = lazy(() => import("../pages/list/PostVideosList"));
// pages of Details for group, company and page - start
const PageDetails = lazy(() => import("../pages/page/PageDetails"));
const CompanyDetails = lazy(() => import("../pages/company/CompanyDetails"));
const GroupDetails = lazy(() => import("../pages/group/GroupDetails"));
// pages of Details for group, company and page - end
// const Job = lazy(() => import("../pages/job/Job"));
const FindJob = lazy(() => import("../pages/job/FindJob"));
const JobDescription = lazy(() => import("../pages/job/JobDescription"));
const PostNewJob = lazy(() => import("../pages/job/PostNewJob"));
const ApplyToJob = lazy(() => import("../pages/job/ApplyToJob"));
const CompaniesList = lazy(() => import("../pages/company/CompaniesList"));
const PagesList = lazy(() => import("../pages/page/PagesList"));
const GroupsList = lazy(() => import("../pages/group/GroupsList"));
const CreateCompany = lazy(() => import("../pages/company/Create"));
const CreatePage = lazy(() => import("../pages/page/Create"));
const CreateGroup = lazy(() => import("../pages/group/Create"));
const Search = lazy(() => import("../pages/search/Search"));
// const Advertisement = lazy(() => import("../pages/advertisement/Advertisement"));

export const privateRoutes = [
  {
    path: "/maintenance",
    element: <Maintenance />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/network",
    element: <Network />,
  },
  {
    path: "/notifications",
    element: <Notification />,
  },
  {
    path: "/single-post-detail/:postId/:postType",
    element: <PostDetail />,
  },
  {
    path: "/profile/:userId",
    element: <Profile />,
  },
  {
    path: "/page/list",
    element: <PagesList />,
  },
  {
    path: "/group/list",
    element: <GroupsList />,
  },
  {
    path: "/company/list",
    element: <CompaniesList />,
  },
  {
    path: "/company/create",
    element: <CreateCompany />,
  },
  {
    path: "/company/edit",
    element: <CreateCompany />,
  },
  {
    path: "/group/create",
    element: <CreateGroup />,
  },
  {
    path: "/group/edit",
    element: <CreateGroup />,
  },
  {
    path: "/page/create",
    element: <CreatePage />,
  },
  {
    path: "/page/edit",
    element: <CreatePage />,
  },
  {
    path: "/page/user_page/:pageId",
    element: <PageDetails />,
  },
  {
    path: "/group/user_group/:groupId",
    element: <GroupDetails />,
  },
  {
    path: "/group_members/:groupId",
    element: <GroupMembersList />,
  },
  {
    path: "/group_joining_requests/:groupId",
    element: <GroupJoiningRequestsList />,
  },
  {
    path: "/company/user_company/:companyId",
    element: <CompanyDetails />,
  },
  {
    path: "/job/findjob/",
    element: <FindJob />,
  },
  {
    path: "/job/description/:jobId",
    element: <JobDescription />,
  },
  {
    path: "/job/apply/:jobId",
    element: <ApplyToJob />,
  },
  {
    path: "/job/post_new_job/:companyId",
    element: <PostNewJob />,
  },
  {
    path: "/projects",
    element: <Projects />,
  },
  {
    path: "/*",
    element: <NewsFeed />,
  },
  {
    path: "/commingsoon",
    element: <Comming />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/followers/:userid",
    element: <AllFollowers />,
  },
  {
    path: "/followings/:userid",
    element: <AllFollowings />,
  },
  {
    path: "/user_videos/:userid",
    element: <UserVideosList />,
  },
  {
    path: "/user_images/:userid",
    element: <UserImagesList />,
  },
  {
    path: "/post_images/:postid/:shared",
    element: <PostImagesList />,
  },
  {
    path: "/post_videos/:postid/:shared",
    element: <PostVideosList />,
  },

  {
    path: "/createadd",
    element: <CreateAccount />,
  },
  {
    path: "/createproduct/productss",
    element: <Product />,
  },
  {
    path: "/createproduct",
    element: <CreateProduct />,
  },
  {
    path: "/advertisements",
    element: <Advertisement />,
    children: [
      {
        path: "/advertisements/advertise",
        element: <Analyzetab />,
      },
      {
        path: "/advertisements/analytics",
        element: <Analytics />,
      },
      {
        path: "/advertisements/audience",
        element: <Audience />,
      },
      {
        path: "/advertisements/Websitedemographic",
        element: <Websitedemographic />,
      },
      {
        path: "/advertisements/insightTag",
        element: <InsightTag />,
      },
      {
        path: "/advertisements/conversion",
        element: <ConversionTrack />,
      },
      {
        path: "/advertisements/manage",
        element: <ManageAccess />,
      },
      {
        path: "/advertisements/billing",
        element: <BillingCenter />,
      },
      {
        path: "/advertisements/editaccount",
        element: <EditAccount />,
      },
    ],
  },
  {
    path: "/new",
    element: <CreateAccountAdvertisement />,
  },

  // {
  //   path: "/analyze",
  //   element: <Analyzetab />,
  // },

  {
    path: "/setting/",
    element: <Settings />,
    children: [
      {
        path: "/setting/general",
        element: <General />,
      },
      {
        path: "/setting/notifications",
        element: <Notifications />,
      },
      {
        path: "/setting/profile",
        element: <ProfileSetting />,
      },
      {
        path: "/setting/profile-verification",
        element: <ProfileVerification />,
      },
      {
        path: "/setting/privacy",
        element: <Privacy />,
      },
      {
        path: "/setting/password",
        element: <Password />,
      },
      {
        path: "/setting/sessions",
        element: <Sessions />,
      },
      {
        path: "/setting/twofac-auth",
        element: <TwofacAuth />,
      },
      {
        path: "/setting/block",
        element: <Block />,
      },
      {
        path: "/setting/delete",
        element: <Delete />,
      },
      {
        path: "/setting/manageskill",
        element: <ManageSkill />,
      },
      {
        path: "/setting/manageexp",
        element: <ManageExperience />,
      },
      {
        path: "/setting/manageproject",
        element: <ManageProject />,
      },
    ],
  },
];
export const publicRoutes = [
  {
    path: "/forget_password",
    element: <ForgetPassword />,
  },
  {
    path: "/user_reset_password/:id/:id",
    element: <ResetPassword />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/verification/:verifyId",
    element: <Verification />,
  },
  {
    path: "*",
    element: <Welcome />,
  },
];
