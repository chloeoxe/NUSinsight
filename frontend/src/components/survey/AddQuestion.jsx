import React, { useState } from "react";
import { Container, Text, Button } from "@chakra-ui/react";

function AddQuestion(props) {
  return (
    <Container p={10} className="form-group">
      <Text>This survey has no questions yet</Text>
      <Button
        colorScheme="default"
        bg="white"
        variant="link"
        border="0px"
        _hover={{ cursor: "pointer" }}
        setNumOfQuestions={props.setNumOfQuestions}
      >
        Add a question
      </Button>
    </Container>
  );
}

export default AddQuestion;
