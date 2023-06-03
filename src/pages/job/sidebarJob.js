import React from 'react'
import { Box, Button, Grid, Hidden, Stack } from "@mui/material";
import { sidebar } from "../../pages/newsfeed/side_menu_data";
import { Link, useParams } from "react-router-dom";

const SidebarJob = () => {
  return (
    <div>
          <Stack   direction="column"  marginLeft="15px" pb={3} overflow="hidden">
            {sidebar.map(({ id, name, icon, url }) => (
              <Link
                key={id}
                to={url}
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Stack
                  key={id}
                  direction="row"
                  alignItems="center"
                  columnGap={2}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#F3F5F6",
                      cursor: "pointer",
                    },
                    borderRadius: "30px 0px 0px 30px",
                    height: "50px",
                    marginLeft: "15px",
                  }}
                >
                  <Box
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#E8EBED",
                      marginLeft: "5px",
                    }}
                  >
                    {icon}
                  </Box>
                  <p>{name}</p>
                </Stack>
              </Link>
            ))}
          </Stack>
    </div>
  )
}

export default SidebarJob