import { useEffect, useState } from "react";
import ListBox from "../../layouts/list_box/ListBox";
import { getPagesByQuery } from "../../utils/helpers/page/page_crud";

const PagesList = () => {
  const [pages, setPages] = useState([]);

  const getListOfPages = async (query) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getPagesByQuery(lsUser?.token?.access, query);
    setPages(response?.results);
  };

  useEffect(() => {
    //
    getListOfPages("YourPages");
  }, []);

  return (
    <>
      <ListBox
        totalLength="12"
        title="Page"
        data={pages}
        getListOfPages={getListOfPages}
      />
    </>
  );
};

export default PagesList;
