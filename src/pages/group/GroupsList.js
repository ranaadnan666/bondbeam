import { useState } from "react";
import { useEffect } from "react";
import ListBox from "../../layouts/list_box/ListBox";
import { getGroupsByQuery } from "../../utils/helpers/group/group_crud";

const GroupsList = () => {
  const [groups, setGroups] = useState([]);

  const getListOfGroups = async (query) => {
    const lsUser = JSON.parse(localStorage.getItem("userLoggedIn"));
    const response = await getGroupsByQuery(lsUser?.token?.access, query);
    setGroups(response?.results);
  };

  useEffect(() => {
    //
    getListOfGroups("YourGroups");
  }, []);

  return (
    <>
      <ListBox
        totalLength="12"
        title="Group"
        data={groups}
        getListOfGroups={getListOfGroups}
      />
    </>
  );
};

export default GroupsList;
