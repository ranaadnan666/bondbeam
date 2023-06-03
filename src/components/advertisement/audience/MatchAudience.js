import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, TextField, Card, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import image from "../images/myimg.jpg";
import svgImage from "../images/svgimage.svg";
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

export default function MatchAudience() {
  return (
    <Grid sx={{ width: "100%",minHeight:"80vh"  }}>     
    <Grid >
      <React.Fragment>
        <Box sx={{ width: "40%", padding: "25px", textAlign: "center",margin:"auto"}}>
          <img
            src={svgImage}
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "100%",
            }}
          />
          <Typography variant="h5">
          Reach key companies and decision makers
          </Typography>
          <Typography variant="body2">
          Learn more about the companies and decision makers engaging with your business before creating a campaign. Upload a contact or company list, retarget website visitors, or grow your business with lookalike targeting.
          </Typography> <br></br>
          <Button variant="contained">Create Audience</Button>
        </Box>
      </React.Fragment>
    </Grid>{" "}      
  </Grid>
  )
        }