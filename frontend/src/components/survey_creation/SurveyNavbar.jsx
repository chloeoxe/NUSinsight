import { Button } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function SurveyNavbar(props) {
  const navigate = useNavigate();

  const { onSave, onSubmitDraft } = props;

  const onClick = () => {
    navigate("/myforms");
  };

  const { isDraftLoading } = useSelector((state) => state.surveys);

  return (
    <div className="survey-navbar">
      <Button
        position="absolute"
        left="2%"
        bg="#e8ebf8"
        fontWeight="600"
        color="#6c749d"
        border="0px"
        cursor="pointer"
        borderRadius="50px"
        onClick={onClick}
        fontFamily="Montserrat"
        fontSize="15px"
      >
        <ArrowBackIcon boxSize="1.2em" marginRight="5px" />
        MY FORMS
      </Button>
      <div className="section-header selected">BUILD</div>
      <form onSubmit={onSubmitDraft}>
        {isDraftLoading ? (
          <Button
            isLoading
            position="absolute"
            right="2%"
            fontWeight="500"
            color="#cefad0"
            bg="none"
            fontFamily="Montserrat"
            border="0px"
            cursor="pointer"
            borderRadius="50px"
            _hover={{ bg: "none" }}
            top="5px"
          >
            SAVE CHANGES
          </Button>
        ) : (
          <Button
            type="submit"
            position="absolute"
            right="2%"
            fontWeight="500"
            color="#cefad0"
            bg="none"
            fontFamily="Montserrat"
            border="0px"
            cursor="pointer"
            borderRadius="50px"
            onClick={onSave}
            _hover={{ bg: "none" }}
            top="5px"
          >
            SAVE CHANGES
          </Button>
        )}
      </form>
      {/* <div className="section-header">PREVIEW</div> */}
    </div>
  );
}

export default SurveyNavbar;
