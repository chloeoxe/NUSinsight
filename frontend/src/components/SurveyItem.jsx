import { useDispatch } from "react-redux";
import { deleteSurvey } from "../features/surveys/surveySlice";

function SurveyItem({ survey }) {
  const dispatch = useDispatch();

  return (
    <div className="survey">
      <div>{new Date(survey.createdAt).toLocaleString("en-US")}</div>
      <h2>{survey.text}</h2>
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
