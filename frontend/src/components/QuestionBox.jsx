import React from "react";
import { Box, Text, Button, Container } from "@chakra-ui/react";

function QuestionBox(props) {
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
      <Text>Question {props.num}</Text>
    </Box>
  );
}

export default QuestionBox;
