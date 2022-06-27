import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  Stack,
  Radio,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";

function DoMultipleChoice(props) {
  const { qnObject, updateQuestionAnswers } = props;

  const { type, question, response, answers } = qnObject;

  const options = response.options;

  const [selectedOption, setSelectedOption] = useState(1);

  const [submittedAnswers, setSubmittedAnswers] = useState(answers);

  const handleSelectOption = (e) => {
    const newSelectedOption =
      options.findIndex((o) => {
        return o.id === Number(e.target.getAttribute("id"));
      }) + 1;
    setSelectedOption(newSelectedOption);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const selectedOptionValue = options.filter(
      (o) => o.id === selectedOption
    )[0].value;
    const newSubmittedAnswers = submittedAnswers.push(selectedOptionValue);
    setSubmittedAnswers(newSubmittedAnswers);

    updateQuestionAnswers(type, question, response, submittedAnswers);

    console.log("mcq submitted");
  };

  return (
    <FormControl onSubmit={onSubmit}>
      <Stack p={5}>
        <Box>
          <Text>{question}</Text>
        </Box>
        <div>
          {options.length > 0 ? (
            <Box align="left">
              <VStack alignItems="left">
                {options.map(({ value, id }) => {
                  return (
                    <HStack key={id}>
                      <Radio
                        id={id}
                        isChecked={id === selectedOption}
                        onChange={handleSelectOption}
                      />
                      <Text>{value}</Text>
                    </HStack>
                  );
                })}
              </VStack>
            </Box>
          ) : (
            ""
          )}
        </div>
      </Stack>
    </FormControl>
  );
}

export default DoMultipleChoice;
