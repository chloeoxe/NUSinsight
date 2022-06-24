import { Link } from "react-router-dom";

function FeedSurveyItem({ survey }) {
  return (
    <div className="survey">
      <div className="survey-info">
        <div className="title">{survey.title}</div>
        <div className="subtitle">
          <Link to={`/account/${survey.username}`}>{survey.username}</Link>
        </div>
      </div>
    </div>
  );
}

export default FeedSurveyItem;
