import  React ,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DenseTable from './DenseTable';
import BasicMenu from './Menu';
import { DeleteCompaign, DeleteCompaignGroup, getComaignList, getCompaignGroup } from '../../../utils/helpers/advertisement/advertisement_crud';

import Analytics from './Analytics';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{  }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Analyzetab() {
  const [value, setValue] = useState(0);
  const [groups, setGroups] = useState([]);
  const [compaign, setCompaign] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


 
  const headCells = [
    {
      id: 1,
      label: "No",
    },
    {
      id: 2,
      label: "Group Names",
    },
    {
      id: 3,
      label: "Impression",
    },
    {
      id: 4,
      label: "Spend",
    },
    {
      id: 5,

      label: "Clicks",
    },
    {
      id: 6,
      label: "bid",
    },
    {
      id: 7,
      label: "Status",
    },
    {
      id: 8,

      label: "Start date",
    },
    {
      id: 9,
      label: "End Date",
    },
    {
      id: 10,
      label: "Created by",
    },
    {
      id: 11,
      label: "Status",
    },
  ];
   
  const column = [
    {
      id: 1,
      label: "No",
    },
    {
      id: 2,
      label: "Group Names",
    },
    {
      id: 3,
      label: "Media",
    },
    {
      id: 3,
      label: "Impression",
    },
    
    {
      id: 4,
      label: "Spend",
    },
    {
      id: 5,

      label: "Clicks",
    },
    {
      id: 6,
      label: "bid",
    },
    {
      id: 7,
      label: "Status",
    },
    {
      id: 8,

      label: "type",
    },
    {
      id: 8,

      label: "Start date",
    },
    {
      id: 9,
      label: "End Date",
    },
    {
      id: 10,
      label: "Created by",
    },
    {
      id: 11,
      label: "Status",
    },
  ];

    // ===================== get compaign group   =====================


  const getallcomgroups=async()=>{
    const lsUser= JSON.parse(localStorage.getItem("userLoggedIn")) 
    const response=await getCompaignGroup(lsUser?.token?.access)
    setGroups(response?.results)
  

  }

    // ===================== get compaign   =====================

  const getallCompaign=async()=>{
    const lsUser= JSON.parse(localStorage.getItem("userLoggedIn")) 
    const response=await getComaignList(lsUser?.token?.access)
    setCompaign(response?.results)

  }
  useEffect(()=>{
    getallcomgroups()
    getallCompaign()
  },[])



    // ===================== delete compaign group   =====================

const DeleteGroupById=async(id)=>{
  const lsUser=JSON.parse(localStorage.getItem("userLoggedIn"))
  const response =await DeleteCompaignGroup(id, lsUser.token.access)
// {
//   response.status  && response.code==200
// }
  
let filteredArray = groups.filter(item => item.id !== id)
setGroups({groups: filteredArray});
console.log("delete array", groups)
}

  // ===================== delete compaign   =====================

  const DeletecompaignById=async(id)=>{
    const lsUser=JSON.parse(localStorage.getItem("userLoggedIn"))
    const response =await DeleteCompaign(id, lsUser.token.access)
  
  }
  return (
    <Box >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Compaings Groups" {...a11yProps(0)} />
          <Tab label="Compaing" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <BasicMenu data={groups}   getallcomgroups={getallcomgroups} getallCompaign={getallCompaign}/>
      <TabPanel value={value} index={0}>
      <Analytics column={headCells} setGroups={setGroups} row={groups} response={DeleteGroupById} />
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Analytics column={column} row={compaign} setCompaign={setCompaign} title={"compaign"} />

      </TabPanel>
      {/* <TabPanel value={value} index={2}>
      <DenseTable/>
      </TabPanel> */}
    </Box>
  );
}