import HouseIcon from "@mui/icons-material/House";
import WorkIcon from "@mui/icons-material/Work";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ForumIcon from "@mui/icons-material/Forum";

export const menu = [
  {
    id: 1,
    title: "Home",
    url: "/",
    icon: <HouseIcon fontSize="medium" />,
  },
  {
    id: 2,
    title: "Jobs",
    url: "/job/findjob",
    icon: <WorkIcon fontSize="medium" />,
  },
  {
    id: 3,
    title: "Learn",
    url: "/commingsoon",
    icon: <LocalLibraryIcon fontSize="medium" />,
  },
  {
    id: 4,
    title: "Wallet",
    url: "/commingsoon",
    icon: <AccountBalanceWalletIcon fontSize="medium" />,
  },
  {
    id: 5,
    title: "Messages",
    url: "/chat",
    icon: <ForumIcon fontSize="medium" />,
  },
  {
    id: 6,
    title: "My Network",
    url: "/network",
    icon: (
      <SupervisorAccountIcon
        sx={{
          fontSize: "28px",
        }}
      />
    ),
  },
];
