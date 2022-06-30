import { useState } from "react";
import { Box, FormControl, Input, Stack, Textarea } from "@chakra-ui/react";

function DoOpenEnded(props) {
  const { qnObject, updateQuestionAnswers } = props;

  const { type, question, response, answers } = qnObject;

  const answerType = response.answerType;

  const [submittedAnswers, setSubmittedAnswers] = useState(answers);

  const [userInput, setUserInput] = useState("");

  const onChange = (e) => {
    setUserInput(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const openEndedAnswer = userInput;

    const newSubmittedAnswers = submittedAnswers.push(openEndedAnswer);
    setSubmittedAnswers(newSubmittedAnswers);

    updateQuestionAnswers(type, question, response, submittedAnswers);

    console.log("open-ended submitted");
  };

  return (
    <FormControl onSubmit={onSubmit}>
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
            onChange={onChange}
          />
        ) : (
          <Input
            placeholder="Answer Here"
            fontFamily="var(--chakra-fonts-body)"
            onChange={onChange}
          />
        )}
      </Box>
    </FormControl>
  );
}

export default DoOpenEnded;
