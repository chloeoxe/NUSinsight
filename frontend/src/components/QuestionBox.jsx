import React from "react";
import { Box, Text, Button } from "@chakra-ui/react";

function QuestionBox(props) {
  const delQuestion = (id) => {
    const newQuestions = props.questions.filter((q) => q.key !== id);
    props.setQuestions(newQuestions);
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
      <Text>Question {props.id}</Text>
      <Button className="close" onClick={() => delQuestion(props.id)}>
        X
      </Button>
    </Box>
  );
}

export default QuestionBox;
