import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, Stack, TextField, Card } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import image from "../images/myimg.jpg";
import SearchIcon from '@mui/icons-material/Search';
import {
  Typography,
  Box,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useState } from "react";

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

export default function ManageAccess() {
  const [open, setOpen]=useState(false)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid>
      <Stack
        sx={{ width: "98%", border: "1px solid lightgrey", padding: "20px" }}
      >
        <Typography variant="h6">Manage Access</Typography>
        <Typography variant="body2">
          View and manage the users who can access this ad account
        </Typography>
      </Stack>
      <Grid sx={{ display: "flex", width: "98%",marginLeft:"20px" }}>
        <Grid sx={{ width: "70%" }}>
          <Grid sx={{ border: "1px solid lightgrey", marginTop: "40px" }}>
            <React.Fragment>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Button variant="contained" onClick={handleClickOpen}>Add User</Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow sx={{backgroundColor:"#F5F5F5",width:"100%"}} >
                    <TableCell sx={{ display: "flex", justifyContent:"space-between" }}>
                      <Typography variant="body1">
                        Users assigned access
                        <KeyboardArrowUpIcon />
                      </Typography>                   
                      <Typography variant="body1">
                        Role
                        <KeyboardArrowUpIcon />
                      </Typography>                    
                    </TableCell>
                  </TableRow>
                  <TableRow sx={{backgroundColor:"#F5F5F5"}}>
                    <TableCell>
                      <TextField 
                        size="small"
                        type="text"
                        sx={{ width: "30%",backgroundColor:"white" }}
                        placeholder="search existing users by name"
                      ></TextField>
                      <FormControl sx={{ width: "20%", marginLeft: "40px",backgroundColor:"white"  }}>
                        <InputLabel  id="demo-simple-select-label">
                          All
                        </InputLabel>
                        <Select
                          size="small"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Age"
                        >
                          <MenuItem value={10}>Account manager</MenuItem>
                          <MenuItem value={20}>Compaign manager</MenuItem>
                          <MenuItem value={30}>Creative manager</MenuItem>
                          <MenuItem>Viewer</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow></TableRow>
                  <TableRow>
                    <Grid sx={{ display: "flex" }}>
                      <Box
                        sx={{ width: "50%", display: "flex", padding: "10px" }}
                      >
                        <Stack>
                          <img
                            src={image}
                            alt="image"
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "100%",
                              padding: "10px",
                            }}
                          />
                        </Stack>
                        <Stack>
                          <Typography sx={{ color: "blue" }}>
                            Ali Hassan
                          </Typography>
                          <Typography>
                            Ali Hassan | Node Js | Express Js | React Js
                          </Typography>
                          <Button disabled variant="contained" sx={{ width: "50%" }}>
                            BILLING ADMIN
                          </Button>
                        </Stack>
                      </Box>
                    </Grid>
                  </TableRow>
                  <TableRow
                    sx={{backgroundColor:"#F5F5F5",
                      border: ".001px solid lightgrey",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TableCell  >
                      <Typography>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "grey" }}
                        >
                          1
                        </Button>
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </React.Fragment>
          </Grid>
        </Grid>

        <Grid
          sx={{
            width: "25%",
            border: "1px solid lightgrey",
            margin: "10px",
            padding: "10px",
          }}
        >
          <Typography>
            {" "}
            <b>User Roles and Functions in Campaign Manager </b>{" "}
          </Typography>{" "}
          <br></br>
          <Typography>
            {" "}
            When you give a member access to your ads account, you’ll need to
            assign them a role. Below are the definitions for each role:
          </Typography>{" "}
          <br></br>
          <Typography>
            {" "}
            <b>Account Manager :</b> User can control account settings, user
            access billing center, and download account reports. User can add
            and edit campaigns (status, bid, budget) and ads (headline, image &
            copy).
          </Typography>{" "}
          <br></br>
          <br></br>
          <Typography>
            {" "}
            <b>Account Manager :</b> User can control account settings, user
            access billing center, and download account reports. User can add
            and edit campaigns (status, bid, budget) and ads (headline, image &
            copy).
          </Typography>
        </Grid>
      </Grid>
      <div>

      <Dialog 
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        width="300px"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add User"} <br></br>
          <TextField sx={{size:"small"}} placeholder="search..." >hi</TextField>
        </DialogTitle>
        <hr/>
        <DialogContent>
         <Card sx={{width:"500px",height:"300px"}} >
         </Card>
         <hr/>
         <Card sx={{width:"500px",height:"50px",display:"flex",justifyContent:"space-between",alignItems:"center"}} >
           <Button variant="outlined" onClick={handleClose} >cancel</Button>
           <Button variant="contained" >Add</Button>
         </Card>
        </DialogContent>
      </Dialog>
    </div>
    </Grid>
  );
}
