import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSurveyToComplete } from "../features/surveys/surveySlice";

function OthersAccountSurveyItem({ survey }) {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/completeSurvey/${survey._id}`}
      onClick={() => dispatch(getSurveyToComplete(survey._id))}
    >
      <div className="survey">
        <h2>{survey.title}</h2>
      </div>
    </Link>
  );
}

export default OthersAccountSurveyItem;
