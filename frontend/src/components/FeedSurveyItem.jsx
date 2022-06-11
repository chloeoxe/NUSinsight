function FeedSurveyItem({ survey }) {
  return (
    <div className="survey">
      <h2>{survey.title}</h2>
      <h4>{survey.username}</h4>
    </div>
  );
}

export default FeedSurveyItem;
