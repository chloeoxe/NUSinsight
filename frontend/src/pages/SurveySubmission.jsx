import { useDispatch } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { Container, Button, Box, Text } from "@chakra-ui/react";
import { getSurveyToComplete } from "../features/surveys/surveySlice";

function SurveySubmission() {
  const dispatch = useDispatch();
  const location = useLocation();

  let pathname = String(location.pathname);
  const pathArray = pathname.split("/");
  let surveyId = pathArray[pathArray.length - 1];

  return (
    <>
      <Box
        shadow="md"
        width="800px"
        p={5}
        border="1px"
        borderColor="gray.200"
        bg="white"
        marginTop="50px"
        marginLeft="230px"
        marginRight="230px"
      >
        <Text fontSize="2xl">Your Response Has Been Submitted</Text>
      </Box>
      <Container className="heading" maxW="800px" p={5}>
        <div className="form-group">
          <Link
            to={`/completeSurvey/${surveyId}`}
            onClick={() => dispatch(getSurveyToComplete(surveyId))}
          >
            <Button
              colorScheme="orange"
              borderRadius="10px"
              border="0px"
              cursor="pointer"
              marginBottom="100px"
            >
              Submit Another Response
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
}

export default SurveySubmission;
