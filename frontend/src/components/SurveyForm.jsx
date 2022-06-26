import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSurvey } from "../features/surveys/surveySlice";
import { VStack, Container, Box, Text, Button } from "@chakra-ui/react";
import QuestionBox from "./QuestionBox";
import { v4 as uuidv4 } from "uuid";

function SurveyForm() {
  //define questions state
  const [questions, setQuestions] = useState([]);

  //connection to API endpoint
  const initialFormData = {
    title: "",
    desc: "",
    questions: [],
    isPublished: false,
  };

  const [formData, setFormData] = useState(initialFormData);

  const { title, desc, isPublished } = formData;

  const dispatch = useDispatch();

  const clearForm = () => {
    setQuestions([]);
    setFormData({ ...initialFormData });
  };

  //handles title and desc values
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const surveyData = { title, desc, questions, isPublished };

    dispatch(createSurvey(surveyData));

    clearForm();
  };

  //question object = {id, type, question, questionResponse}
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        type: "",
        question: "",
        response: {},
        answers: [],
      },
    ]);
  };

  const delQuestion = (id) => {
    const newQuestions = questions.filter((q) => q.id !== id);
    setQuestions(newQuestions);
  };

  const updateQuestion = (id) => {
    return (type, question, response, answers) => {
      const refQuestionIndex = questions.findIndex((q) => q.id === id);
      const newQuestions = [...questions];
      newQuestions[refQuestionIndex] = {
        ...questions[refQuestionIndex],
        type: type,
        question: question,
        response: response,
        answers: answers,
      };
      setQuestions(newQuestions);
    };
  };

  const onSave = () => {
    let updatedPublished = {};
    updatedPublished = { isPublished: false };
    setFormData((prevState) => ({
      ...prevState,
      ...updatedPublished,
    }));
  };

  const onPublish = () => {
    let updatedPublished = {};
    updatedPublished = { isPublished: true };
    setFormData((prevState) => ({
      ...prevState,
      ...updatedPublished,
    }));
  };

  return (
    <>
      <Container className="heading" maxW="800px">
        <h1>Create a Survey</h1>
        <p>Fill in the details below</p>
      </Container>
      <form onSubmit={onSubmit}>
        <VStack>
          <Box
            className="name"
            shadow="md"
            width="800px"
            p={5}
            border="1px"
            borderColor="gray.200"
            bg="white"
          >
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
          </Box>
          {questions.map(({ id }) => (
            <QuestionBox
              key={id}
              id={id}
              num={
                questions.findIndex((q) => {
                  return q.id === id;
                }) + 1
              }
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
            <button className="btn btn-block" type="submit" onClick={onSave}>
              Save Survey
            </button>
          </div>
          <div className="form-group">
            <button className="btn btn-block" type="submit" onClick={onPublish}>
              Publish Survey
            </button>
          </div>
        </Container>
      </form>
    </>
  );
}

export default SurveyForm;
