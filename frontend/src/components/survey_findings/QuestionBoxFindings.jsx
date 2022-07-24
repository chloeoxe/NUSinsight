import { Box, Text, Container, SimpleGrid } from "@chakra-ui/react";
import MultipleChoiceFindings from "./MultipleChoiceFindings";
import OpenEndedFindings from "./OpenEndedFindings";

function QuestionBoxFindings(props) {
  const { qnObject, getQnFindings } = props;

  //get findings for qn by triggering getQnFindings()
  const qnFindings = getQnFindings(props.num);

  return (
    <Box
      className="name"
      shadow="md"
      width="800px"
      p={5}
      border="1px"
      borderColor="gray.200"
      bg="white"
    >
      <SimpleGrid columns={2} spacing={0} pr={12} pl={8}>
        <Text align="left" lineHeight="250%" fontWeight="bold">
          Question {props.num}
        </Text>
      </SimpleGrid>
      <Container maxW="780px">
        {qnObject.type === "mcq" ? (
          <MultipleChoiceFindings qnObject={qnObject} findings={qnFindings} />
        ) : (
          ""
        )}
        {qnObject.type === "oe" ? (
          <OpenEndedFindings qnObject={qnObject} findings={qnFindings} />
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
}

export default QuestionBoxFindings;
