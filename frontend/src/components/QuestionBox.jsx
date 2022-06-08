import { useState } from "react";
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

function QuestionBox(props) {
  const [questionType, setQuestionType] = useState("mcq");

  const handleChange = (e) => {
    setQuestionType(e.target.value);
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
            onChange={handleChange}
            size="md"
            maxW="250px"
          >
            <option value="mcq">MCQ</option>
            <option value="oe">Open-ended</option>
          </Select>
        </Box>
      </SimpleGrid>
      <Container>
        {questionType === "mcq" ? <MultipleChoice /> : ""}
        {questionType === "oe" ? <OpenEnded /> : ""}
      </Container>
    </Box>
  );
}

export default QuestionBox;
