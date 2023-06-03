import  React ,{useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, width } from "@mui/system";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import {CreateAddAccount} from "../../../utils/helpers/advertisement/advertisement_crud"
import Modal from "../../modal/Modal";

export default function Create() {
  const [open, setOpen] = useState(false);
  const [info,setInfo]  = useState({
    name: "",
    account_no: "",
    currency: "",
    status:""
  });

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  // ===================== modal state   =====================

  const [showMsg, setShowMsg] = useState({
    isError: false,
    displayMessage: "",
    isModalOpen: false,
  });

  const CreateNewAccount=async()=>{
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"))
    const response = await CreateAddAccount(info,lsUser?.token?.access);
    console.log(response,"response")
    if (response?.status || response?.status_code === 200) {
      setShowMsg((prev) => {
        return {
          ...prev,
          isError: false,
          displayMessage: "Account created successfully",
          isModalOpen: true,
        };
      });
   
    } 
    else {
      setShowMsg((prev) => {
        return {
          ...prev,
          isError: true,
          displayMessage: "advertiser user with this user already exists",
          isModalOpen: true,
        };
      });
 
  }

     setInfo((prev)=>{
         return{
        ...prev,
        account_no:"",
      account_title:"",
      currency:""
    }
})

  }


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
        {showMsg.isModalOpen && (
        <Modal msg={showMsg.displayMessage} isError={showMsg.isError} />
      )}
      <Button sx={{ color: "black",width:"130px" }} onClick={handleClickOpen}>
        Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent >
   <Grid container>
   <Stack rowGap={1} columnGap={1} direction="column" justifyContent="space-between" alignItems={'center'} sx={{width:"99%"}} mx='auto'>
       <Stack direction="column" width={"100%"}>
            <label>Account Name</label>
            <input
            name="name"
            value={info.name}
            onChange={handleOnChange}
              style={{
                borderRadius: "5px",
                border: "1px solid gray",
                outline: "none",
                padding: "8px",
              }}
              type="text"
              placeholder="account name"
            />
          </Stack>
       </Stack>
       <Stack rowGap={1} columnGap={1} direction="column" justifyContent="space-between" alignItems={'center'} sx={{width:"99%"}} mx='auto'>
       <Stack direction="column" width={"100%"}>
            <label>Account Number</label>
            <input
              name="account_no"
              value={info.account_no}
              onChange={handleOnChange}
              style={{
                borderRadius: "5px",
                border: "1px solid gray",
                outline: "none",
                padding: "8px",
              }}
              type="text"
              placeholder="account no"
            />
          </Stack>
       </Stack>
     <Stack direction={{xs:"column",md:"row"}} rowGap={1} columnGap={1} justifyContent="space-between" alignItems={'center'} sx={{width:"99%"}} mx='auto'>
     <Stack width={{xs:"100%",md:"50%"}}>
              <label for="Currency">Currency</label>
              <select style={{ padding: "7px" }}   
              name="currency"
              value={info.currency}
              onChange={handleOnChange} defaultValue={""} >
              <option value="Pakistan">Select Currency</option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
              <option value="Bangladesh">Bangladesh</option>
              </select>
           
          </Stack>
          <Stack width={{xs:"100%",md:"50%"}}>
            <label for="Currency">Status</label>
            <select style={{ padding: "7px" }}   
            name="status"
              value={info.status}
              onChange={handleOnChange} defaultValue={""} >
              <option value="Pakistan">Select Status</option>

              <option value="Active">Active</option>
              <option value="Block">Block</option>
              <option value="Restricted">Restricted</option>
              <option value="Requested">Requested</option>
              <option value="Disapproved">Disapproved</option>
              
            </select>
          </Stack>
     </Stack>
          <p style={{ color: "gray", fontSize: "13px" }}>
              Note that you cannot change currency later.
            </p>
          <p>Associate a LinkedIn Page with your account (optional)</p>
       <Stack direction="column" width="100%">
       <p style={{ color: "gray", fontSize: "13px" }}>
            Connect your company page to unlock all available ad formats
          </p>
          <input
            style={{
              borderRadius: "5px",
              border: "1px solid gray",
              outline: "none",
              // width: "500px",
              padding: "8px",
            }}
            type="text"
            placeholder="enter an exixting name/URL"
          />
       </Stack>
         
   </Grid>
          <Link>Create New Linkedin page</Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={()=>{CreateNewAccount();handleClose()}} autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
