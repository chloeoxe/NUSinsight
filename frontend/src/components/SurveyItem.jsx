import { useDispatch } from "react-redux";
import { deleteSurvey } from "../features/surveys/surveySlice";

function SurveyItem({ survey }) {
  const dispatch = useDispatch();

  return (
    <div className="survey">
      <div>{new Date(survey.createdAt).toLocaleString("en-US")}</div>
      <h2>{survey.title}</h2>
      <h4>{survey.desc}</h4>
      <h5>{survey.isPublished}</h5>
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
