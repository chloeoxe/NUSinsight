import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSurveyToComplete } from "../features/surveys/surveySlice";

function FeedSurveyItem({ survey }) {
  const dispatch = useDispatch();

  return (
    <Link
      to={`/completeSurvey/${survey._id}`}
      onClick={() => dispatch(getSurveyToComplete(survey._id))}
    >
      <div className="survey">
        <div className="survey-info">
          <div className="title">{survey.title}</div>
          <div className="subtitle">
            <Link to={`/account/${survey.username}`}>{survey.username}</Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default FeedSurveyItem;
