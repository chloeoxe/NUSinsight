import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import QuestionBoxFindings from "../components/survey_findings/QuestionBoxFindings";
import {
  getSurveyToComplete,
  getSurveyFindings,
  reset,
} from "../features/surveys/surveySlice";
import { VStack, Box, Text } from "@chakra-ui/react";

function SurveyFindings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);

  const { surveys, findings, isLoading, isSuccess, postFindingsSuccess } =
    useSelector((state) => state.surveys);

  //Set state for survey findings
  const [surveyFindings, setSurveyFindings] = useState(
    findings ? findings : {}
  );

  //Set state for survey
  const initialSurvey =
    surveys !== [] ? surveys[0] : { title: "", desc: "", questions: [] };

  const [survey, setSurvey] = useState(initialSurvey);

  const { title, desc, questions } = survey;

  const getQnFindings = (num) => {
    const qnFindings = surveyFindings[num];
    return qnFindings;
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    let pathname = String(location.pathname);
    const pathArray = pathname.split("/");
    let surveyId = pathArray[pathArray.length - 1];
    dispatch(getSurveyToComplete(surveyId));
    dispatch(getSurveyFindings(surveyId));

    return () => {
      dispatch(reset());
    };
  }, [user, location, navigate, dispatch]);

  useEffect(() => {
    if (isSuccess && postFindingsSuccess) {
      setSurvey(surveys[0]);
      setSurveyFindings(findings);
    }
  }, [isSuccess, postFindingsSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
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
                <QuestionBoxFindings
                  key={qn.id}
                  id={qn.id}
                  num={
                    questions.findIndex((q) => {
                      return q.id === qn.id;
                    }) + 1
                  }
                  qnObject={qn}
                  getQnFindings={getQnFindings}
                />
              ))}
            </div>
          ) : (
            ""
          )}
        </div>
      </VStack>
    </div>
  );
}

export default SurveyFindings;
