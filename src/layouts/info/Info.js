import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import MapIcon from "@mui/icons-material/Map";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const Info = (props) => {
  return (
    <Stack
      direction="column"
      rowGap={1}
      sx={{
        borderRadius: "10px",
        border: "1px solid silver",
        padding: "10px",
        backgroundColor: "white",
      }}
    >
      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems="center"
      >
        <h3>Info</h3>
        <EditIcon
          fontSize="small"
          onClick={props.handleAboutEdit}
          sx={{
            padding: "5px",
            m: "5px",
            borderRadius: "50%",
            backgroundColor: "lightgray",
            cursor: "pointer",
            "&:hover": {
              color: "blue",
            },
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" columnGap={1}>
        <WorkIcon />
        <p>Lorem ipsum dolor sit amet</p>
      </Stack>
      <Stack direction="row" alignItems="center" columnGap={1}>
        <MapIcon />
        <p>Lorem ipsum dolor sit amet</p>
      </Stack>
      <Stack direction="row" alignItems="center" columnGap={1}>
        <AutoStoriesIcon />
        <p>Lorem ipsum dolor sit amet</p>
      </Stack>
    </Stack>
  );
};

export default Info;
