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
import {
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import BillingCenterFooter from "./BillingCenterfootertrans";

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

export default function BillingCenter() {
  return (
    <Grid>
      <Stack sx={{ width: "100%", border: "1px solid lightgrey", padding: "20px"}}>
        <Typography sx={{ padding: "10px" }} variant="h6">
          Billing Center
        </Typography>
      </Stack>
      <Grid sx={{ width: "95%", marginLeft:"20px" }}>
        <Typography sx={{ padding: "10px" }}>Payment method</Typography>
        <Grid sx={{ border: "1px solid lightgrey" }}>
          <React.Fragment>
            <Box sx={{ width: "100%", padding: "15px", textAlign: "center" }}>
              <img
                src={image}
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "100%",
                }}
              />
              <Typography>
                Add a credit card to start running your campaigns.
              </Typography>
              <Button variant="contained">Add credit card</Button>
            </Box>
          </React.Fragment>
        </Grid>{" "}
        <br></br>
        <Typography sx={{ padding: "10px" }}>Biling activity</Typography>
        <Grid sx={{ border: "1px solid lightgrey" }}>
          <React.Fragment>
            <Box sx={{ width: "100%", textAlign: "center", display:"flex" }}>
              <Box sx={{width:"33.3%",height:"60px",borderRight:".1px solid lightgrey"}} >
              <Box sx={{width:"100%",height:"60px",display:"flex",justifyContent:"center",alignItems:"center",padding:"5px"}} >
               <Typography ><Link>Transactions</Link></Typography>
              </Box>
              </Box>
              <Box sx={{width:"33.3%",height:"60px",borderRight:".1px solid lightgrey"}}>
              <Box sx={{width:"100%",height:"60px",display:"flex",justifyContent:"center",alignItems:"center",padding:"5px"}} >
               <Typography ><Link>Coupons/Credits</Link></Typography>
              </Box>
              </Box>
              <Box sx={{width:"33.3%",height:"60px",borderRight:".1px solid lightgrey"}}>
              <Box sx={{width:"100%",height:"60px",display:"flex",justifyContent:"center",alignItems:"center",padding:"5px"}} >
              <Typography ><Link>Receipts</Link></Typography>
              </Box>
              </Box>
            </Box>
            
             <BillingCenterFooter/>
          </React.Fragment>
        </Grid>
      </Grid>
    </Grid>
  );
}
