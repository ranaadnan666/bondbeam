import { Grid, TextField } from "@mui/material";
import react from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Accountimg from "../images/createacc.svg";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
function CreateAccountAdvertisement() {
    return (
        <Grid>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            {/* <MenuIcon /> */}
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            COMPAIGN MANAGER
                        </Typography>
                        <Button color="inherit"><AccountCircleIcon/></Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid sx={{display:"flex",width:"100%",justifyContent:"center",alignItems:"center",flexDirection:"column" }} >
              <Grid sx={{width:{xs:"90%",md:"60%"},minHeight:"80vh",border:"1px solid lightgrey",marginTop:"10px", borderRadius:"10px"}} >
                <img src={Accountimg} style={{width:"100%",height:"300px"}} />
                <Box sx={{padding:"10px"}} >
                <Typography variant="h6" > Do business where business is done! </Typography> <br></br>
                <Typography>Engage the largest professional community in the world with Campaign Manager. Generate leads, drive website traffic, and build brand awareness.</Typography>
                <br></br>
                <Typography variant="title1" ><b>Let’s set up your Campaign Manager account</b></Typography>
                <Typography>This account will contain all your campaigns, ads, and related billing informationt</Typography> <br></br>
                <label><b>Account name</b></label> <br></br>
                <TextField id="outlined-size-small" defaultValue="Account name" size="small" /> <br/><br/>
                <label><b>Associate a LinkedIn Page</b></label> <br></br>
                <p>Connect your company page to unlock all available ad formats</p> <br></br>
                <TextField  l id="outlined-size-small" size="small" placeholder="Enter the page name, url, or create a new one" /> <br></br>
                <Typography variant="title1" ><b>Currency</b></Typography> <br></br>
                <Typography variant="title1" >Your currency is set to USD.</Typography>
                </Box>
              </Grid>
              <Grid justifyContent={"space-between"} sx={{width:{xs:"90%",md:"60%"},marginTop:"10px", borderRadius:"10px",display:"flex"}} >
                <Typography>By clicking "Agree & create account", you agree to the <Link>Ads Agreement</Link></Typography>
              <Button sx={{justifySelf:"flex-end"}} variant="contained" href="/createadd" >Agree and create account</Button>
              </Grid>
               </Grid>
              
        </Grid>
    )
}
export default CreateAccountAdvertisement;