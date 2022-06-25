import React from "react";
import FormNavbar from "../components/forms_display/FormNavbar";
import FormSidebar from "../components/forms_display/FormSidebar";
import FormsList from "../components/forms_display/FormsList";

function MyForms() {
  return (
    <>
      <FormNavbar />
      <FormSidebar />
      <FormsList />
    </>
  );
}

export default MyForms;
