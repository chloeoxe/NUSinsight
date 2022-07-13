import { useState } from "react";
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
  const { qnObject, updateAnswers } = props;

  const { question, response } = qnObject;

  const options = response.options;

  const [selectedOption, setSelectedOption] = useState(0);

  const handleAnswerChange = (e) => {
    const newSelectedOption =
      options.findIndex((o) => {
        return o.id === Number(e.target.getAttribute("id"));
      }) + 1;
    setSelectedOption(newSelectedOption);

    updateAnswers([newSelectedOption]);
  };

  return (
    <FormControl>
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
                        onChange={handleAnswerChange}
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
