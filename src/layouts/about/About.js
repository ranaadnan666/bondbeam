import EditIcon from "@mui/icons-material/Edit";
import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useAppContext } from "../../context/app-context";

const About = (props) => {
  const { user } = useAppContext();
  const [aboutLength, setAboutLength] = useState(200);
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
        <h3>About</h3>
        {user?.data?.id === props?.user_id && (
          <EditIcon
            fontSize="small"
            // onClick={props?.handleAboutEdit}
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
        )}
      </Stack>
      {props?.about?.length === 0 ? (
        <p>Nothing to show here</p>
      ) : (
        <>
          <p>{props?.about?.substring(0, aboutLength)}</p>
          {props?.about?.length > 200 && (
            <>
              {props?.about?.length > aboutLength ? (
                <Button
                  variant="contained"
                  color="info"
                  sx={{ width: "fit-content", mx: "auto" }}
                  onClick={() => setAboutLength(props?.about?.length)}
                >
                  See More
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ width: "fit-content", mx: "auto" }}
                  onClick={() => setAboutLength(200)}
                >
                  See Less
                </Button>
              )}
            </>
          )}
        </>
      )}
    </Stack>
  );
};

export default About;
