import { VStack, Container, Box, Text, Button, Input } from "@chakra-ui/react";
import QuestionBox from "../survey/QuestionBox";
import { useSelector } from "react-redux";

function SurveyForm(props) {
  const {
    onChange,
    onSubmit,
    onPublish,
    title,
    desc,
    addQuestion,
    delQuestion,
    updateQuestion,
    questions,
  } = props;

  const { isLoading } = useSelector((state) => state.surveys);

  return (
    <>
      <form onSubmit={onSubmit}>
        <VStack>
          <Box
            class="form-box"
            shadow="md"
            width="800px"
            p={5}
            border="1px"
            borderColor="gray.200"
            bg="white"
            cursor="pointer"
            _hover={{ borderLeft: "5px solid #FFA500" }}
            _focusWithin={{ borderLeft: "5px solid #FFA500" }}
            tabIndex={0}
          >
            <div className="form-group">
              <Input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Title"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="desc"
                id="desc"
                value={desc}
                placeholder="Description"
                onChange={onChange}
              />
            </div>
          </Box>
          {questions.map(({ id, type, question, response }) => (
            <QuestionBox
              key={id}
              id={id}
              num={
                questions.findIndex((q) => {
                  return q.id === id;
                }) + 1
              }
              type={type}
              question={question}
              response={response}
              delQuestion={delQuestion}
              updateQuestion={updateQuestion(id)}
            />
          ))}
        </VStack>
        <Container p={10} className="form-group">
          {questions.length === 0 ? (
            <Text>This survey has no questions yet</Text>
          ) : (
            ""
          )}
          <Button
            colorScheme="default"
            variant="outline"
            border="0px"
            _hover={{ cursor: "pointer" }}
            onClick={addQuestion}
          >
            Add a question
          </Button>
        </Container>
        <Container className="heading" maxW="800px">
          <div className="form-group">
            {isLoading ? (
              <Button
                isLoading
                colorScheme="orange"
                borderRadius="10px"
                border="0px"
                marginBottom="100px"
              >
                Publish Survey
              </Button>
            ) : (
              <Button
                colorScheme="orange"
                borderRadius="10px"
                border="0px"
                type="submit"
                onClick={onPublish}
                cursor="pointer"
                marginBottom="100px"
              >
                Publish Survey
              </Button>
            )}
          </div>
        </Container>
      </form>
    </>
  );
}

export default SurveyForm;
