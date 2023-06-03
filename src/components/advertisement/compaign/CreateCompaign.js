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
import {CreateCompaign, updateCompaign} from "../../../utils/helpers/advertisement/advertisement_crud"
import Modal from "../../modal/Modal";

const CreateCompaigns=(props)=> {
  console.log("props data compain",props.item);
  const [open, setOpen] = useState(false);


  const [info,setInfo]  = useState({
    campaign_group_id:"",
    name: "",
    start_date: "",
    end_date:"",
    status: "",
    type:"",
    spent:"",
    bid:"",

  });


  const [selectedFile, setSelectedFile] = useState();
  const handleOnChange = event => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

 // ===================== handle image   =====================

 const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);

};

 // ===================== handle prefil    =====================
   
  // filter the prefilled data array to get the data you want to prefill
// const Editor =(id)=>{
//   console.log("id",id);
//   const prefilledData = props?.item?.filter(data => data.id ===id)[0];

//   // update the state object with the prefilled data
//   const updatedFormData = {
//     ...info,
//     ...prefilledData
//   };
//   setInfo(updatedFormData);
// }

const Editor = (id) => {
  const preefill = props?.item?.filter((item) => {
    if (id === item.id) {
      return item  
    }
  });
  

  setInfo({
    name: preefill[0].name,
    type: preefill[0].type,
    status: preefill[0].status,
    start_date: preefill[0].start_date,
    end_date: preefill[0].end_date,
    spent: preefill[0].spent,
    bid: preefill[0].bid,
  })

}

 // =====================  handle update    =====================

 const updateCompaignByid=async()=>{
  const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response=await updateCompaign(props.id, lsUser?.token?.access)
 }

  // ===================== modal state   =====================

  // const [showMsg, setShowMsg] = useState({
  //   isError: false,
  //   displayMessage: "",
  //   isModalOpen: false,
  // });

  const CreateNewAccount=()=>{
    const formData = new FormData();
    formData.append("campaign_group_id", info.campaign_group_id);
    formData.append("name", info.name);
    formData.append("start_date", info.start_date);
    formData.append("end_date", info.end_date);
    formData.append("status", info.status);
    formData.append("type", info.type);
    formData.append("spent", info.spent);
    formData.append("bid", info.bid);
    formData.append('media', selectedFile);
    console.log("acount created information",formData);
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response =CreateCompaign(formData,lsUser?.token?.access)
    props.getallCompaign()
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
    props.getallCompaign()
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
      <Button sx={{ color: "black",width:"130px" }} onClick={handleClickOpen}>
        <span style={{width:"120px"}} onClick={()=>{Editor(props.id)}}>{props.title}</span>
      
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create new compaign"}
        </DialogTitle>
        <DialogContent >
   <Grid container>
   <Stack rowGap={1} columnGap={1} direction={{xs:"column",md:"row"}} justifyContent="space-between" alignItems={'center'} sx={{width:"99%"}} mx='auto'>

   <Stack width={{xs:"100%",md:"50%"}}>
            <label for="status">Compaign Group Name</label>
            <select style={{ padding: "7px" }}   
            name="campaign_group_id"
              value={info.campaign_group_id}
              onChange={handleOnChange} >
              <option value="">select Compain Group Name</option>
              {
                props?.data?.map((data,i) =>{
                    return(
                        <option key={i} value={data?.id}>{data?.name}</option>
                    )
                })
              }
            </select>
            
          </Stack>
          <Stack direction="column" width={{xs:"100%",md:"50%"}}>
            <label>Compaign Name</label>
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
              placeholder="compaign name"
            />
          </Stack>
          </Stack>
          <Stack rowGap={1} columnGap={1} direction={{xs:"column",md:"row"}} justifyContent="space-between" alignItems={'center'} sx={{width:"99%"}} mx='auto'>

<Stack width={{xs:"100%",md:"50%"}}>
         <label for="status">Spent</label>
         <input
         name="spent"
         value={info.spent}
         onChange={handleOnChange}
           style={{
             borderRadius: "5px",
             border: "1px solid gray",
             outline: "none",
             padding: "8px",
           }}
           type="text"
           placeholder="spent"
         />
         
       </Stack>
       <Stack direction="column" width={{xs:"100%",md:"50%"}}>
         <label>Bid</label>
         <input
         name="bid"
         value={info.bid}
         onChange={handleOnChange}
           style={{
             borderRadius: "5px",
             border: "1px solid gray",
             outline: "none",
             padding: "8px",
           }}
           type="text"
           placeholder="bid"
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

       <Stack rowGap={1} columnGap={1} direction={{xs:"column",md:"row"}} justifyContent="space-between" alignItems={'center'} sx={{width:"99%"}} mx='auto'>
       <Stack direction="column" width={{xs:"100%",md:"50%"}}>
            <label> Select File</label>
            <input
            name="media"
            onChange={changeHandler}
              style={{
                borderRadius: "5px",
                border: "1px solid gray",
                outline: "none",
                padding: "8px",
              }}
              type="file"
             
            />
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
          
          </Stack>
       </Stack>
    
       <Stack width="50%">
            <label for="type">Type</label>
            <select style={{ padding: "7px" }}   
            name="type"
              value={info.type}
              onChange={handleOnChange} >
              <option value="">select Type</option>
              <option value="Campaign">Campaign</option>
              <option value="Ads">Ads</option>
           
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
           props.title==="Edit" ? <Button onClick={()=>{updateCompaignByid();handleClose()}} autoFocus>
           Edit
         </Button>:<Button onClick={()=>{handleClose();CreateNewAccount()}} autoFocus>
            create
          </Button>
          }
          
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default CreateCompaigns