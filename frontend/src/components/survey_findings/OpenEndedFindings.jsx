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

function OpenEndedFindings(props) {
  const { qnObject, findings } = props;

  const { question, response } = qnObject;

  const ansArray = findings ? findings.ans : [];

  return (
    <FormControl>
      <Stack p={5}>
        <Box>{question}</Box>
      </Stack>
      <Box align="left">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Responses</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ansArray.map((ans) => {
                return (
                  <Tr>
                    <Td>{ans}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </FormControl>
  );
}

export default OpenEndedFindings;
