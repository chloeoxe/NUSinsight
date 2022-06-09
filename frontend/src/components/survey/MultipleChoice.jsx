import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  RadioGroup,
  Radio,
  VStack,
  Button,
  HStack,
} from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { set } from "mongoose";

function MultipleChoice() {
  const [options, setOptions] = useState([
    { key: uuidv4(), content: "", value: 1 },
  ]);

  //each option has a unique key, content(input) and value(number)
  const handleAddOption = () => {
    setOptions([
      ...options,
      { key: uuidv4(), content: "", value: options.length + 1 },
    ]);
  };

  const handleRemoveOption = () => {
    const newOptions = [...options];
    const removedOption = newOptions.pop();
    setOptions(newOptions);
    if (selectedOption == removedOption.value) {
      if (selectedOption == 1) {
        //do nothing
      } else {
        setSelectedOption(newOptions.length);
      }
    }
  };

  const [selectedOption, setSelectedOption] = useState(1);

  const handleSelectOption = (e) => {
    const newSelectedOption =
      options.findIndex((o) => {
        return o.value == e.target.value;
      }) + 1;
    setSelectedOption(newSelectedOption);
  };

  return (
    <FormControl>
      <Stack p={5}>
        <Box>
          <FormLabel>Question</FormLabel>
          <Input id="question" placeholder="Enter your question here"></Input>
        </Box>
        <Box align="left">
          <FormLabel>Options</FormLabel>
          <VStack alignItems="left">
            {options.map(({ key, content, value }) => {
              return (
                <Radio
                  key={key}
                  value={value}
                  isChecked={value === selectedOption}
                  onChange={handleSelectOption}
                >
                  <Input placeholder={"Option " + value}></Input>
                </Radio>
              );
            })}
            <HStack>
              <Button width="10px" variant="outline" onClick={handleAddOption}>
                +
              </Button>
              <Button
                width="10px"
                variant="outline"
                onClick={handleRemoveOption}
              >
                -
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Stack>
    </FormControl>
  );
}

export default MultipleChoice;
