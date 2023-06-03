import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, TextField, Card } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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

export default function EditAccount() {
  return (
    <Grid>
        <Stack sx={{ width: "97%", border: "1px solid lightgrey", padding: "20px" }}>
        <Typography variant="h6">Edit Account</Typography>
        
      </Stack>
      <Grid sx={{display:"flex",width:'99%',marginLeft:"10px"}} >
    <Grid sx={{width:"70%"}} >
      
      <Grid sx={{ border: "1px solid lightgrey", marginTop: "40px" }}>
        <React.Fragment>
          <Table size="small">         
            <TableBody>
              <TableRow>
                <TableCell sx={{border:"none"}}><b>Account Name</b></TableCell>
                </TableRow> 
                <TableRow>
                <TableCell sx={{border:"none"}}>
                  <TextField sx={{width:"90%", border:"1px solid black"}} size="small" placeholder="Ali's Ad Account" ></TextField>
                </TableCell>
                </TableRow> 
                <br></br>
                
                <TableRow>
                <TableCell sx={{border:"none"}}><b>Currency</b></TableCell>
                </TableRow> 
                <TableRow>
                <TableCell sx={{border:"none"}} >United States of America, Dollar (USD)</TableCell>
                </TableRow>
                
                <TableRow>
                <TableCell sx={{border:"none"}} ><b>Associate a LinkedIn Page with your account (optional)</b></TableCell>
                </TableRow>
                <TableRow>
                <TableCell sx={{border:"none"}}>Connect your company page to unlock all available ad formats</TableCell>
                </TableRow>
                <TableRow>
                <TableCell sx={{border:"none"}}>
                  <TextField sx={{width:"90%", border:"1px solid black"}} size="small" placeholder="Enter an existing name/URL" ></TextField>
                </TableCell>
                </TableRow> 
                <TableRow>
                <TableCell sx={{border:"none"}}><Link >Create a new LinkedIn page +</Link></TableCell>
                </TableRow>
                <TableRow  >
                  <TableCell sx={{display:"flex",width:"80%",justifyContent:"space-between"}}> 
                  <Button variant="contained">Update account</Button>
                  <Link  >Close account</Link>
                  </TableCell>
                </TableRow>
            </TableBody>
          </Table>
        </React.Fragment>
      </Grid>
    </Grid>

    <Grid sx={{width:"25%",border:"1px solid lightgrey",margin:"10px",padding:"10px"}} >
      <Typography > <b>User Roles and Functions in Campaign Manager </b> </Typography> <br></br>
      <Typography >  When you give a member access to your ads account, you’ll need to assign them a role. Below are the definitions for each role:</Typography> <br></br>
      <Typography > <b>Account Manager :</b>  User can control account settings, user access billing center, and download account reports. User can add and edit campaigns (status, bid, budget) and ads (headline, image & copy).

</Typography> <br></br>
<br></br>
      <Typography > <b>Account Manager :</b>  User can control account settings, user access billing center, and download account reports. User can add and edit campaigns (status, bid, budget) and ads (headline, image & copy).

</Typography>

     
    </Grid>
 
    </Grid>
  
    </Grid>
  );
}
