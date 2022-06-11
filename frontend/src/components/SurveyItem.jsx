import { useDispatch } from "react-redux";
import { deleteSurvey } from "../features/surveys/surveySlice";

function SurveyItem({ survey }) {
  const dispatch = useDispatch();
  const questionsArray = survey.questions;

  return (
    <div className="survey">
      <div>{new Date(survey.createdAt).toLocaleString("en-US")}</div>
      <h2>{survey.title}</h2>
      <h4>{survey.desc}</h4>
      {questionsArray.map((q) => {
        return (
          <>
            <h4>Question type: {q.type}</h4>
            <h4>Question: {q.question}</h4>
            <h4>Options: {q.options.map((o) => o.value + " ")}</h4>
          </>
        );
      })}
      <button
        className="close"
        onClick={() => dispatch(deleteSurvey(survey._id))}
      >
        X
      </button>
    </div>
  );
}

export default SurveyItem;
