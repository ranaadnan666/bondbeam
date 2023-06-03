import React from 'react'
import { Button, Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import { Stack,Box } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Analyzetab from '../analyze/Tab';
import { useAppContext } from '../../../context/app-context';
import EditAccount from '../account/EditAccount';
import ManageAccess from '../manageaccess/ManageAccess';
import BillingCenter from '../accountsetting/BillingCenter';
import Audience from '../audience/Audience';
import InsightTag from '../analyze/InsightTag';
import Websitedemographic from '../analyze/WebsiteDemoGraphic';
import ConversionTrack from '../analyze/ConversionTracking';
import Analytics from '../analyze/Analytics';




const Main = () => {
  const {setSelectedAdvertiseContent, selectedAdvertiseContent} = useAppContext()
  return (
<h1>
{/* <Analyzetab/> */}
 
{/* <ManageAccess/> */}
{/* {
  selectedAdvertiseContent === "manage_access" ?  <ManageAccess/> :selectedAdvertiseContent === "billing" ?  <BillingCenter/>: selectedAdvertiseContent === "edit" ? <EditAccount/> : 
   selectedAdvertiseContent === "audience" ? <Audience/> :  selectedAdvertiseContent === "websitedemographic" ? <Websitedemographic/> :  selectedAdvertiseContent === "insighttag" ? <InsightTag/> :
   selectedAdvertiseContent === "conversiontrack" ? <ConversionTrack/> : selectedAdvertiseContent === "analytics" ? <Analytics/>  :selectedAdvertiseContent === "analyze" ? <Analyzetab/>: "other data" 

} */}


</h1>
  )
}

export default Main