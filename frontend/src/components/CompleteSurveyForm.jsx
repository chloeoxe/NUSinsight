import { useState } from "react";
import { useDispatch } from "react-redux";
import { submitSurvey } from "../features/surveys/surveySlice";
import { VStack, Container, Box, Text } from "@chakra-ui/react";
import DoQuestionBox from "./DoQuestionBox";

function CompleteSurveyForm(props) {
  const dispatch = useDispatch();
  const survey = props.survey;
  const surveyId = props.surveyId;

  const { title, desc, questions: initialQuestions, isPublished } = survey;

  //define questions state
  const [questions, setQuestions] = useState(initialQuestions);

  const updateQuestionAnswers = (id) => {
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

  const onSubmit = (e) => {
    e.preventDefault();

    const surveyData = { surveyId, title, desc, questions, isPublished };

    dispatch(submitSurvey(surveyData));

    console.log("response submitted");
  };

  return (
    <>
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
            <Text fontSize="5xl">{survey.title}</Text>
            <Text fontSize="2xl">{survey.desc}</Text>
          </Box>
          <div>
            {questions.length > 0 ? (
              <div>
                {questions.map((qn) => (
                  <DoQuestionBox
                    key={qn.id}
                    id={qn.id}
                    num={
                      questions.findIndex((q) => {
                        return q.id === qn.id;
                      }) + 1
                    }
                    qnObject={qn}
                    updateQuestionAnswers={updateQuestionAnswers(qn.id)}
                  />
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </VStack>
        <Container className="heading" maxW="800px" p={5}>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit Response
            </button>
          </div>
        </Container>
      </form>
    </>
  );
}

export default CompleteSurveyForm;
