import { Box, Button, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import WelcomeBg from "../../images/welcome-bg.webp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRef } from "react";

const Welcome = ({ data }) => {
  const navigate = useNavigate();
  const endOfPageRef = useRef(null);
  const handleClick = () => {
    endOfPageRef.current.scrollIntoView({ behavior: "smooth" });
  };
  if (data?.status === true) {
    navigate("/");
  }

  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        rowGap={3}
        alignItems="center"
        minHeight="400px"
        // p={3}
      >
        {/* <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          rowGap={10}
          sx={{
            backgroundImage: `url(${WelcomeBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100vh",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
            // rowGap: "40px",
          }}
        >
          <Stack
            direction="column"
            rowGap={3}
            mt={30}
            justifyContent="center"
            alignItems="center"
          >
            <h1>Welcome to BondBeam</h1>

            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-evenly"
              columnGap={2}
              rowGap={2}
            >
              <Link style={{ textDecoration: "none" }} to="/signin">
                <Button size="large" variant="contained">
                  Sign In
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/signup">
                <Button size="large" variant="contained" color="warning">
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              // black transparent background
              background: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.7)",
              },
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "700",
                textAlign: "center",
                borderRadius: "10px",
                padding: "5px 20px",
              }}
            >
              scroll down
            </p>
            <KeyboardArrowDownIcon sx={{ color: "white" }} fontSize="large" />
          </Stack>
        </Stack> */}
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="space-center"
          position={"relative"}
          rowGap={10}
          sx={{
            backgroundImage: `url(${WelcomeBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            cursor: "pointer",
          }}
        >
          <Stack
            direction="column"
            rowGap={3}
            justifyContent="center"
            alignItems="center"
          >
            <h1>Welcome to BondBeam</h1>

            <Stack
              direction={{ xs: "column", md: "row" }}
              alignItems="center"
              justifyContent="space-evenly"
              columnGap={2}
              rowGap={2}
            >
              <Link style={{ textDecoration: "none" }} to="/signin">
                <Button size="large" variant="contained">
                  Sign In
                </Button>
              </Link>
              <Link style={{ textDecoration: "none" }} to="/signup">
                <Button size="large" variant="contained" color="warning">
                  Sign Up
                </Button>
              </Link>
            </Stack>
          </Stack>
          <Stack
            onClick={handleClick}
            direction="column"
            alignItems="center"
            justifyContent="center"
            position={"absolute"}
            bottom={"0"}
            sx={{
              // black transparent background
              background: "rgba(0, 0, 0, 0.5)",
              "&:hover": {
                background: "rgba(0, 0, 0, 0.7)",
              },
              width: "100%",
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: "1.2rem",
                fontWeight: "700",
                textAlign: "center",
                borderRadius: "10px",
                padding: "5px 20px",
              }}
            >
              scroll down
            </p>
            <KeyboardArrowDownIcon sx={{ color: "white" }} fontSize="large" />
          </Stack>
        </Stack>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "700",
            textAlign: "center",
          }}
        >
          Who we are
        </h2>
        <div
          style={{
            width: "5%",

            height: "5px",
            backgroundColor: "#ED6C02",
            margin: "0 auto",
            borderRadius: "10px",
          }}
        ></div>
        <p
          style={{
            width: "80%",
            textAlign: "center",
            fontSize: "1.2rem",
            lineHeight: "1.8rem",
            margin: "0 auto",
          }}
          ref={endOfPageRef}
        >
          Bondbeam is the world's largest professional network on the internet
          for construction workers and companies. You can use Bondbeam to find
          the right job , connect and strengthen professional relationships, and
          learn the skills you need to succeed in your construction career.A
          complete Bondbeam profile can help you connect with opportunities by
          showcasing your unique professional story through experience,
          skills, and education.
        </p>
      </Stack>
    </>
  );
};

export default Welcome;
