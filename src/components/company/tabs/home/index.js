import { Grid } from "@mui/material";
import React from "react";
import Posts from "./Posts";
import Projects from "./Projects";
import RecentPostedJobs from "./RecentPostedJobs";
import SimilarCompanies from "./SimilarCompanies";
import About from "../../../../layouts/about/About";

const Index = (props) => {
  return (
    <Grid container rowGap={1}>
      {/*======================= left area ====================*/}
      <Grid item container xs={12} md={9} p={1} rowGap={1} height="fit-content">
        {/*------------------ top area */}
        {/* about */}
        <Grid item xs={12}>
          <About
            about={props?.companyData?.company?.company_about}
            user_id={props?.companyData?.company?.user?.id}
          />
        </Grid>
        {/* projects */}
        <Grid item xs={12}>
          <Projects
            projectData={props?.companyData?.company_projects}
            user_id={props?.companyData?.company?.user?.id}
          />
        </Grid>
        {/*------------------ bottom area */}
        <Grid item container xs={12} rowGap={1}>
          {/* recent posted jobs */}
          <Grid item xs={12} md={6}>
            <RecentPostedJobs
              companyId={props.companyId}
              user_id={props?.companyData?.company?.user?.id}
              recentJobs={props?.companyData?.company_jobs}
            />
          </Grid>
          {/* posts */}
          <Grid item xs={12} md={6}>
            <Posts companyCreatorId={props.companyCreatorId} />
          </Grid>
        </Grid>
      </Grid>
      {/*====================== right area ======================*/}
      {/* similar companies */}
      <Grid item xs={12} md={3} p={1} height="fit-content">
        <SimilarCompanies similars={props?.companyData?.similar_companies} setCompanyData={props?.setCompanyData}/>
      </Grid>
    </Grid>
  );
};

export default Index;
