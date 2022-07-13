import { Box, Text, Container, SimpleGrid } from "@chakra-ui/react";
import DoMultipleChoice from "./DoMultipleChoice";
import DoOpenEnded from "./DoOpenEnded";

function DoQuestionBox(props) {
  const { qnObject } = props;

  //update survey answers if there are any changes
  const updateAnswers = props.updateAnswers;

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
            updateAnswers={updateAnswers(props.num)}
          />
        ) : (
          ""
        )}
        {qnObject.type === "oe" ? (
          <DoOpenEnded
            qnObject={qnObject}
            updateAnswers={updateAnswers(props.num)}
          />
        ) : (
          ""
        )}
      </Container>
    </Box>
  );
}

export default DoQuestionBox;
