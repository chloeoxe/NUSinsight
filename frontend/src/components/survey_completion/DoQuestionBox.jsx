import { Box, Text, Container, SimpleGrid } from "@chakra-ui/react";
import DoMultipleChoice from "./DoMultipleChoice";
import DoOpenEnded from "./DoOpenEnded";

function DoQuestionBox(props) {
  const { qnObject } = props;

  //update question if there are any changes in answers array
  const updateQuestionAnswers = props.updateQuestionAnswers;

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
          <DoMultipleChoice
            qnObject={qnObject}
            updateQuestionAnswers={updateQuestionAnswers}
          />
        ) : (
          ""
        )}
        {qnObject.type === "oe" ? (
          <DoOpenEnded
            qnObject={qnObject}
            updateQuestionAnswers={updateQuestionAnswers}
          />
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
}

export default DoQuestionBox;
