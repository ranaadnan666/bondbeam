import  React,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from 'react-router-dom';
import Create from '../account/Create';
import CreateGroupCompaign from '../compaign/CreateGroup';
import { getAccountDetail} from "../../../utils/helpers/advertisement/advertisement_crud"
import CreateCompaigns from '../compaign/CreateCompaign';

export default function BasicMenu(props) {
  const [data, setData] = useState({});

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  
  const cardData = async () => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getAccountDetail(lsUser?.token?.access);
    setData(response.data);
  };
  useEffect(() => {
    cardData();
  }, []);
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Create
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
        
        <MenuItem ><CreateCompaigns title={"Compaign"} data={props.data} getallCompaign={props.getallCompaign}/></MenuItem>
        <MenuItem ><CreateGroupCompaign title={"Compaign Group"} data={data} getallcomgroups={props.getallcomgroups} /></MenuItem>
          <MenuItem  onClose={handleClose} ><Create/></MenuItem>
      </Menu>
    </div>
  );
}