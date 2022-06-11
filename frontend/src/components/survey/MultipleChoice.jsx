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

function MultipleChoice(props) {
  const { options, setOptions, setQuestionInput } = props;

  //each option has a unique key, value(string), and id(number)
  const handleAddOption = () => {
    setOptions([
      ...options,
      { key: uuidv4(), value: "", id: options.length + 1 },
    ]);
  };

  const handleOptionChange = (e) => {
    const temp_state = [...options];
    const temp_option_index = options.findIndex((o) => {
      return o.id == e.target.getAttribute("id");
    });
    const temp_option = {
      ...options[temp_option_index],
    };
    temp_option.value = e.target.value;
    temp_state[temp_option_index] = temp_option;
    setOptions(temp_state);
  };

  const handleQuestionChange = (e) => {
    setQuestionInput(e.target.value);
  };

  const handleRemoveOption = () => {
    let newOptions = [...options];
    let removedOption = newOptions.pop();
    setOptions(newOptions);
    if (selectedOption == removedOption.id) {
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
        return o.id == e.target.getAttribute("id");
      }) + 1;
    setSelectedOption(newSelectedOption);
  };

  return (
    <FormControl>
      <Stack p={5}>
        <Box>
          <FormLabel>Question</FormLabel>
          <Input
            id="question"
            placeholder="Enter your question here"
            defaultValue=""
            onChange={handleQuestionChange}
          ></Input>
        </Box>
        <Box align="left">
          <FormLabel>Options</FormLabel>
          <VStack alignItems="left">
            {options.map(({ key, value, id }) => {
              return (
                <HStack>
                  <Radio
                    key={key}
                    id={id}
                    isChecked={id === selectedOption}
                    onChange={handleSelectOption}
                  />
                  <Input
                    type="text"
                    placeholder={"Option " + id}
                    id={id}
                    defaultValue={value}
                    onChange={handleOptionChange}
                  />
                </HStack>
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
