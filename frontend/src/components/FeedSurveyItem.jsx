import { Link } from "react-router-dom";

function FeedSurveyItem({ survey }) {
  return (
    <Link to={`/completeSurvey/${survey._id}`}>
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
