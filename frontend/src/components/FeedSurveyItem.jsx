import { Link } from "react-router-dom";

function FeedSurveyItem({ survey }) {
  return (
    <div className="survey">
      <h2>{survey.title}</h2>
      <h4>
        <Link to={`/account/${survey.username}`}>{survey.username}</Link>
      </h4>
    </div>
  );
}

export default FeedSurveyItem;
