import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, TextField, Card, Box } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Installinsight from "../images/in1.svg";
import Emailinsight from "../images/in2.svg";
import Taginsight from "../images/in3.svg";
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
        <Stack sx={{ width: "100%", border: "1px solid lightgrey", padding: "20px" }}>
        <Typography variant="h6">Insight Tag</Typography>
        
      </Stack>
      <Grid sx={{display:"flex",width:'100%'}} >
    <Grid sx={{width:"70%",marginLeft:"10px"}} >
      
      <Grid sx={{ border: "1px solid lightgrey", marginTop: "40px",padding:"10px" }}>
      <Typography variant="h6" >Choose how to install your tag</Typography> <br></br>
          <Box sx={{padding:"40px",display:"flex"}} >
            <img src={Installinsight} style={{marginRight:"10px"}} />
           <Box>
           <Typography variant="body1" ><b>I will install the tag myself</b></Typography>
           <Typography variant="body2" >Get the tag code to add to your website</Typography>
           </Box>
          </Box>
          <hr/>
          <Box sx={{padding:"40px",display:"flex"}} >
            <img src={Emailinsight} style={{marginRight:"10px"}} />
           <Box>
           <Typography variant="body1" ><b>I will send the tag to the developer</b></Typography>
           <Typography variant="body2" >Send the tag to your email inbox with install instructions</Typography>
           </Box>
          </Box>
          <hr/>
          <Box sx={{padding:"40px",display:"flex"}} >
            <img src={Taginsight} style={{marginRight:"10px"}} />
           <Box>
           <Typography variant="body1" ><b>I will use a tag manager</b></Typography>
           <Typography variant="body2" >Add th tag without changing your website code</Typography>
           </Box>
          </Box>
          <hr/>
          <Box sx={{padding:"40px",display:"flex"}} >          
           <Box>
           <Typography variant="body2" >By using the Insight Tag, you agree to the Ads Agreement. <Link>Adds Agreement</Link></Typography>
           </Box>
          </Box>
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
