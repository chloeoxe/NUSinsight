import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Container,
  Select,
  SimpleGrid,
} from "@chakra-ui/react";
import MultipleChoice from "./survey/MultipleChoice";
import OpenEnded from "./survey/OpenEnded";
import { v4 as uuidv4 } from "uuid";

//handles different types of questions here
function QuestionBox(props) {
  const [questionType, setQuestionType] = useState("mcq");

  const initialOptions = [{ key: uuidv4(), value: "", id: 1 }];

  //state for questionInput
  const [questionInput, setQuestionInput] = useState("");

  //state for MCQ options
  const [options, setOptions] = useState(initialOptions);

  useEffect(() => {
    props.updateQuestion(questionType, questionInput, options);
  }, [questionType, questionInput, options]);

  const clearOptions = () => {
    setOptions([...initialOptions]);
  };

  const clearQuestionInput = () => {
    setQuestionInput("");
  };

  const handleTypeChange = (e) => {
    setQuestionType(e.target.value);
    clearOptions();
    clearQuestionInput();
  };

  return (
    <Box
      className="name"
      shadow="md"
      width="800px"
      p={5}
      border="1px"
      borderColor="gray.200"
    >
      <Container maxW="780px" align="right">
        <Button
          className="close"
          onClick={() => props.delQuestion(props.id)}
          variant="outline"
          colorScheme="white"
          border="0px"
        >
          X
        </Button>
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
            options={options}
            setOptions={setOptions}
            setQuestionInput={setQuestionInput}
          />
        ) : (
          ""
        )}
        {questionType === "oe" ? <OpenEnded /> : ""}
      </Container>
    </Box>
  );
}

export default QuestionBox;
