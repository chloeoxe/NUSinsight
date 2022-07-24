import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Switch,
  Textarea,
} from "@chakra-ui/react";

function OpenEnded(props) {
  const {
    handleQuestionInput,
    updateQuestionResponse,
    questionInput,
    draftAnswerType,
  } = props;

  const [answerType, setAnswerType] = useState(
    draftAnswerType ? draftAnswerType : "short"
  );

  useEffect(() => {
    updateQuestionResponse({
      answerType: answerType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerType]);

  const toggleLongAnswer = () => {
    if (answerType === "short") {
      setAnswerType("long");
    } else {
      setAnswerType("short");
    }
  };

  return (
    <FormControl>
      <Stack p={5}>
        <Box>
          <FormLabel>Question</FormLabel>
          <Input
            id="question"
            placeholder="Enter your question here"
            value={questionInput}
            onChange={handleQuestionInput}
            fontFamily="var(--chakra-fonts-body)"
          ></Input>
        </Box>
        <Box align="left">
          <FormLabel>Response</FormLabel>
          {answerType === "long" ? (
            <Textarea
              isDisabled
              placeholder="Long answer text"
              size="md"
              maxWidth="100%"
              minWidth="100%"
              fontFamily="var(--chakra-fonts-body)"
            />
          ) : (
            <Input
              isDisabled
              placeholder="Short answer text"
              fontFamily="var(--chakra-fonts-body)"
            />
          )}
        </Box>
        <Box
          position="absolute"
          right="20px"
          top="95px"
          onChange={toggleLongAnswer}
        >
          Enable long answer?
          <Switch paddingLeft="10px" isChecked={answerType === "long"} />
        </Box>
      </Stack>
    </FormControl>
  );
}

export default OpenEnded;
