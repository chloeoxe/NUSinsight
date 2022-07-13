import { useState, useEffect } from "react";
import { Box, FormControl, Input, Stack, Textarea } from "@chakra-ui/react";

function DoOpenEnded(props) {
  const { qnObject, updateAnswers } = props;

  const { question, response } = qnObject;

  const answerType = response.answerType;

  const [userInput, setUserInput] = useState("");

  const handleAnswerChange = (e) => {
    setUserInput(e.target.value);
  };

  useEffect(() => {
    updateAnswers([userInput]);
    console.log("open-ended submitted");
  }, [userInput, updateAnswers]);

  return (
    <FormControl>
      <Stack p={5}>
        <Box>{question}</Box>
      </Stack>
      <Box align="left">
        {answerType === "long" ? (
          <Textarea
            placeholder="Answer Here"
            size="md"
            maxWidth="100%"
            minWidth="50%"
            fontFamily="var(--chakra-fonts-body)"
            onChange={handleAnswerChange}
          />
        ) : (
          <Input
            placeholder="Answer Here"
            fontFamily="var(--chakra-fonts-body)"
            onChange={handleAnswerChange}
          />
        )}
      </Box>
    </FormControl>
  );
}

export default DoOpenEnded;
