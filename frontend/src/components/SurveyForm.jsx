import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSurvey } from "../features/surveys/surveySlice";
import { VStack, Container, Box, Text, Button } from "@chakra-ui/react";
import QuestionBox from "./QuestionBox";

function SurveyForm() {
  const initialFormData = {
    title: "",
    desc: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const { title, desc } = formData;

  const dispatch = useDispatch();

  const clearForm = () => setFormData({ ...initialFormData });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const surveyData = { title, desc };

    dispatch(createSurvey(surveyData));

    clearForm();
  };

  const [questions, setQuestions] = useState([]);

  //question object = {key: ..., card: div component}
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        key: questions.length + 1,
        card: (
          <QuestionBox
            id={questions.length + 1}
            setQuestions={setQuestions}
            questions={questions}
          />
        ),
      },
    ]);
  };

  return (
    <>
      <VStack>
        <Container className="heading" maxW="800px">
          <h1>Create a Survey</h1>
          <p>Fill in the details below</p>
        </Container>
        <Box
          className="name"
          shadow="md"
          width="800px"
          p={5}
          border="1px"
          borderColor="gray.200"
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Title"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="desc"
                id="desc"
                value={desc}
                placeholder="Description"
                onChange={onChange}
              />
            </div>
          </form>
        </Box>
        {questions.map(({ key, card }) => (
          <div key={key}>{card}</div>
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
          bg="white"
          variant="link"
          border="0px"
          _hover={{ cursor: "pointer" }}
          onClick={addQuestion}
        >
          Add a question
        </Button>
      </Container>
      <Container className="heading" maxW="800px" p={5}>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Publish Survey
          </button>
        </div>
      </Container>
    </>
  );
}

export default SurveyForm;
