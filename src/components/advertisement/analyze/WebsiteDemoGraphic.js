import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, TextField, Card, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Insightsvg from "../images/insight.svg";
import {
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    312.44
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "London, UK",
    "VISA ⠀•••• 2574",
    866.99
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "Boston, MA",
    "MC ⠀•••• 1253",
    100.81
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    654.39
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    212.79
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Websitedemographic() {
  return (
    <Grid>
      <Stack sx={{ width: "100%", border: "1px solid lightgrey", padding: "20px" }}>
        <Typography sx={{ padding: "10px" }} variant="h6">
        Website demographics
        </Typography>
        <Typography>
        Gain insights about your website audience with professional data from LinkedIn
        </Typography>
      </Stack>
      <Grid sx={{ width: "100%",minHeight:"80vh"  }}>     
        <Grid >
          <React.Fragment>
            <Box sx={{ width: "40%", padding: "25px", textAlign: "center",margin:"auto"}}>
              <img
                src={Insightsvg}
                style={{
                  width: "300px",
                  height: "300px",
                  borderRadius: "100%",
                }}
              />
              <Typography variant="h5">
              Get started by creating an Insight Tag
              </Typography>
             
              <Typography variant="body2">
              Gain insights on who visits your website and what pages they engage with. Get started by installing your Insight Tag on your website.
              </Typography> <br></br>
              <Button variant="contained">Install my Insight Tag</Button>
            </Box>
          </React.Fragment>
        </Grid>{" "}      
      </Grid>
    </Grid>
  );
}
