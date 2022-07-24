import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Box,
  FormControl,
  Stack,
  VStack,
  Text,
} from "@chakra-ui/react";

function MultipleChoiceFindings(props) {
  const { qnObject, findings } = props;

  const { question, response } = qnObject;

  const options = response.options;

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
                <TableContainer>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Option</Th>
                        <Th isNumeric>Number</Th>
                        <Th isNumeric>Percentage</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {options.map(({ value, id }) => {
                        return (
                          <Tr>
                            <Td>{value}</Td>
                            <Td isNumeric>
                              {findings ? findings[id].num : ""}
                            </Td>
                            <Td isNumeric>
                              {findings ? findings[id].percentage : ""}%
                            </Td>
                          </Tr>
                        );
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
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

export default MultipleChoiceFindings;
