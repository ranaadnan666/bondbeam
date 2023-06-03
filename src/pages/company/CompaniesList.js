import React, { useEffect } from "react";
import ListBox from "../../layouts/list_box/ListBox";
import {
  getCompaniesByQuery,
  getCompanyFollowers,
} from "../../utils/helpers/company/company_crud";

const CompaniesList = () => {
  const [companies, setCompanies] = React.useState([]);
  //

  const getListOfCompanies = async (query) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getCompaniesByQuery(lsUser?.token?.access, query);
    setCompanies(response?.results);
  };

  useEffect(() => {
    //
    getListOfCompanies("YourCompanies");
  }, []);

  return (
    <>
      <ListBox
        totalLength="12"
        title="Company"
        data={companies}
        getListOfCompanies={getListOfCompanies}
      />
    </>
  );
};

export default CompaniesList;
