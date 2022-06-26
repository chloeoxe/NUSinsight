import React from "react";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { BsFilterLeft } from "react-icons/bs";

function FormNavbar() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate("/createSurveyStart");
  };

  return (
    <div className="form-navbar">
      <div>
        <Button
          colorScheme="orange"
          variant="solid"
          border="0px"
          cursor="pointer"
          px="40px"
          py="22px"
          onClick={onClick}
        >
          CREATE FORM
        </Button>
      </div>
      <div>
        <Button py="22px" border="0px">
          <BsFilterLeft />
          Sort/Filter
        </Button>
      </div>
    </div>
  );
}

export default FormNavbar;
