import  React ,{useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Stack, width } from "@mui/system";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import {CreateCompaignGroup, getAccountDetail, updateCompaignGroup} from "../../../utils/helpers/advertisement/advertisement_crud"
import Modal from "../../modal/Modal";

const CreateGroupCompaign=(props)=> {
  console.log("props data",props.item);
  const [open, setOpen] = useState(false);


  const [info,setInfo]  = useState({
    advertiser_id:props?.data?.id,
    name: "",
    start_date: "",
    end_date:"",
    status: "",
      
  });

  const handleOnChange = event => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };


   // ===================== handle prefil    =====================
   
  // filter the prefilled data array to get the data you want to prefill
  const Editor =(id)=>{
    const prefilledData = props?.item?.filter(data => data.id ===id)[0];
  
    // update the state object with the prefilled data
    const updatedFormData = {
      ...info,
      ...prefilledData
    };
    setInfo(updatedFormData);
  }

//   const cardData = async () => {
//     const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
//     const response = await getAccountDetail(lsUser?.token?.access);
//     setData(response.data);
//   };
//   useEffect(() => {
//     cardData();
//   }, []);


  // ===================== Update  compaign group    =====================
      
  const updateGroupById=async()=>{

    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response=await updateCompaignGroup(props?.id,lsUser?.token?.access)
  }


  // ===================== create compaign group    =====================
 

  const CreateNewAccount=async()=>{

    
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response =await CreateCompaignGroup(info,lsUser?.token?.access)
    console.log("response",response);
    props.getallcomgroups()
    // props.setGroups(response?.res)
    // if (response?.status || response?.status_code === 200) {
    //   setShowMsg((prev) => {
    //     return {
    //       ...prev,
    //       isError: false,
    //       displayMessage: "Company Successfully Created",
    //       isModalOpen: true,
    //     };
    //   });
    // } else {
    //   setShowMsg((prev) => {
    //     return {
    //       ...prev,
    //       isError: true,
    //       displayMessage: "something went wrong",
    //       isModalOpen: true,
    //     };
    //   });
    // }
   
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
        {/* {showMsg.isModalOpen && (
        <Modal msg={showMsg.displayMessage} isError={showMsg.isError} />
      )} */}
      <Button sx={{ color: "black" }} onClick={handleClickOpen}>
        <span style={{}} onClick={()=>{Editor(props.id)}}>{props.title}</span>
      
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
            <label>User Account Name</label>
            <input
           
            value={props?.data?.name}
           
              style={{
                borderRadius: "5px",
                border: "1px solid gray",
                outline: "none",
                padding: "8px",
              }}
              type="text"
            
            />
          </Stack>
       <Stack direction="column" width={"100%"}>
            <label>Compaign Group Name</label>
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
              placeholder="compaign group name"
            />
          </Stack>
       </Stack>
       <br></br>
       <br></br>
       <Stack rowGap={1} columnGap={1} direction={{xs:"column",md:"row"}} justifyContent="space-between" alignItems={'center'} sx={{width:"99%"}} mx='auto'>
       <Stack direction="column" width={{xs:"100%",md:"50%"}}>
            <label> Start Date</label>
            <input
            name="start_date"
            value={info.start_date}
            onChange={handleOnChange}
              style={{
                borderRadius: "5px",
                border: "1px solid gray",
                outline: "none",
                padding: "8px",
              }}
              type="date"
             
            />
          </Stack>
          <Stack direction="column" width={{xs:"100%",md:"50%"}}>
            <label> End Date</label>
            <input
            name="end_date"
            value={info.end_date}
            onChange={handleOnChange}
              style={{
                borderRadius: "5px",
                border: "1px solid gray",
                outline: "none",
                padding: "8px",
              }}
              type="date"
            />
          </Stack>
       </Stack>
          <Stack width="50%">
            <label for="status">Status</label>
            <select style={{ padding: "7px" }}   
            name="status"
              value={info.status}
              onChange={handleOnChange} >
              <option value="">select status</option>
              <option value="Active">Active</option>
              <option value="In-active">Draft</option>
           
            </select>
            <p style={{ color: "gray", fontSize: "13px" }}>
              Note that you cannot change currency later.
            </p>
          </Stack>
          

         
   </Grid>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {
            props.title==="Edit" ? <Button onClick={()=>{updateGroupById();handleClose()}} autoFocus>
            Edit
          </Button>: <Button onClick={()=>{CreateNewAccount();handleClose()}} autoFocus>
            Create
          </Button>
          }
         
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default CreateGroupCompaign