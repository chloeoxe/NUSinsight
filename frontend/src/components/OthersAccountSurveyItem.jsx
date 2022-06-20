import { Link } from "react-router-dom";

function OthersAccountSurveyItem({ survey }) {
  return (
    <div className="survey">
      <h2>{survey.title}</h2>
    </div>
  );
}

export default OthersAccountSurveyItem;
