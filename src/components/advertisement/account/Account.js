import { AppBar, Grid } from '@mui/material'
import React,{ useState} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DenseTable from '../analyze/DenseTable';
// import Button from '@mui/material/Button';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Tooltip from '@mui/material/Tooltip';
import { Stack } from '@mui/system';
import { Link, NavLink } from 'react-router-dom';
import Create from './Create';
import Carddetail from './CardDetail';
const CreateAccount = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  

  return (
    <Grid p={5}>
       <Stack direction="row">
       <Grid item>
            <Tooltip sx={{backgroundColor:"white"}} title="Back To Account" placement="right-start">
             <NavLink  to="/advertisements/advertise"> <Button  ><KeyboardBackspaceIcon/></Button></NavLink>
            </Tooltip>
          </Grid>
        <p style={{fontSize:"1.5rem",fontWeight:"500"}}>Detailed account list</p>
       </Stack>
  
   <Button
        id="basic-button"
        variant='contained'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{marginTop:"1rem"}}
      >
        Create Account
        
      </Button>
   
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem  onClose={handleClose} ><Create/></MenuItem>
     
      </Menu>
      <Grid padding="2rem 1rem">
        {/* <DenseTable/> */}
        <Carddetail />
        </Grid>
    </Grid>
  )
}

export default CreateAccount