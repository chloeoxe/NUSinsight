import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Container,
  Select,
  SimpleGrid,
  CloseButton,
} from "@chakra-ui/react";
import MultipleChoice from "./MultipleChoice";
import OpenEnded from "./OpenEnded";

//handles different types of questions here
function QuestionBox(props) {
  const [questionType, setQuestionType] = useState("mcq");

  //state for questionInput
  const [questionInput, setQuestionInput] = useState("");

  //state for questionResponse
  const [questionResponse, setQuestionResponse] = useState({});

  //state for questionAnswers
  const [questionAnswers, setQuestionAnswers] = useState([]);

  //update question if there are any changes in response object
  const { updateQuestion } = props;

  useEffect(() => {
    updateQuestion(
      questionType,
      questionInput,
      questionResponse,
      questionAnswers
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionType, questionInput, questionResponse, questionAnswers]);

  const clearQuestionInput = () => {
    setQuestionInput("");
  };

  const clearQuestionResponse = () => {
    setQuestionResponse({});
  };

  const handleQuestionInput = (e) => {
    setQuestionInput(e.target.value);
  };

  const handleTypeChange = (e) => {
    setQuestionType(e.target.value);
    clearQuestionInput();
    clearQuestionResponse();
  };

  const updateQuestionResponse = (response) => {
    setQuestionResponse({
      ...response,
    });
  };

  return (
    <Box
      className="name"
      shadow="md"
      width="800px"
      p={5}
      border="1px"
      borderColor="gray.200"
      bg="white"
      cursor="pointer"
      _hover={{ borderLeft: "5px solid #FFA500" }}
      _focusWithin={{ borderLeft: "5px solid #FFA500" }}
      tabIndex={0}
    >
      <Container maxW="780px" align="right">
        <CloseButton
          className="close"
          onClick={() => props.delQuestion(props.id)}
          variant="outline"
          colorScheme="white"
          border="0px"
          bg="none"
          cursor="pointer"
        />
      </Container>
      <SimpleGrid columns={2} spacing={0} pr={12} pl={8}>
        <Text align="left" lineHeight="250%" fontWeight="bold">
          Question {props.num}
        </Text>
        <Box align="right">
          <Select
            value={questionType}
            onChange={handleTypeChange}
            size="md"
            maxW="250px"
          >
            <option value="mcq">MCQ</option>
            <option value="oe">Open-ended</option>
          </Select>
        </Box>
      </SimpleGrid>
      <Container maxW="780px">
        {questionType === "mcq" ? (
          <MultipleChoice
            handleQuestionInput={handleQuestionInput}
            updateQuestionResponse={updateQuestionResponse}
          />
        ) : (
          ""
        )}
        {questionType === "oe" ? (
          <OpenEnded
            handleQuestionInput={handleQuestionInput}
            updateQuestionResponse={updateQuestionResponse}
          />
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
}

export default QuestionBox;
