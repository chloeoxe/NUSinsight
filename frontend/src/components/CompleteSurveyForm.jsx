import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { submitSurvey } from "../features/surveys/surveySlice";
import { VStack, Container, Box, Text } from "@chakra-ui/react";
import DoQuestionBox from "./survey_completion/DoQuestionBox";

function CompleteSurveyForm(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const survey = props.survey;
  const surveyId = props.surveyId;

  const { user } = useSelector((state) => state.auth);

  const { title, desc, questions, isPublished } = survey;

  const initialAnswers = {};

  const [answers, setAnswers] = useState(initialAnswers);

  const updateAnswers = (num) => {
    return (qnAnswer) => {
      const newAnswers = { ...answers };
      let qnNum = num;
      newAnswers[qnNum] = qnAnswer;
      setAnswers(newAnswers);
    };
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const surveyData = {
      userId: user._id,
      surveyId,
      title,
      desc,
      questions,
      answers,
      isPublished,
    };

    dispatch(submitSurvey(surveyData));

    //console.log("response submitted");

    navigate(`/responseSubmitted/${surveyId}`);
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
            <Text fontSize="5xl">{title}</Text>
            <Text fontSize="2xl">{desc}</Text>
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
                    updateAnswers={updateAnswers}
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
