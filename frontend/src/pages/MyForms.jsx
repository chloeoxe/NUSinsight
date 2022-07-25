import { useState } from "react";
import DraftsList from "../components/forms_display/DraftsList";
import FormNavbar from "../components/forms_display/FormNavbar";
import FormSidebar from "../components/forms_display/FormSidebar";
import FormsList from "../components/forms_display/FormsList";
import FavsList from "../components/forms_display/FavsList";

function MyForms() {
  const [folder, setFolder] = useState("MyForms");
  const [folders, setFolders] = useState({
    MyForms: <FormsList />,
    MyDrafts: <DraftsList />,
    MyFavourites: <FavsList />,
  });

  const changeFolder = (folderName) => {
    setFolder(folderName);
  };

  return (
    <>
      <FormNavbar />
      <FormSidebar changeFolder={changeFolder} currentFolder={folder} />
      {folders[folder]}
    </>
  );
}

export default MyForms;
