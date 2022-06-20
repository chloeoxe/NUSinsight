import { useDispatch } from "react-redux";
import { deleteSurvey } from "../features/surveys/surveySlice";
import { FaCheckCircle, FaCog } from "react-icons/fa";

function SurveyItem({ survey }) {
  const dispatch = useDispatch();
  const questionsArray = survey.questions;

  return (
    <div className="survey">
      <div>{new Date(survey.createdAt).toLocaleString("en-US")}</div>
      <h2>{survey.title}</h2>
      <h4>{survey.desc}</h4>
      {questionsArray.map((q) => {
        if (q.type === "mcq") {
          return (
            <>
              <h4>{q.question}</h4>
              {q.response.options.map((o) => (
                <h4>{o.value}</h4>
              ))}
            </>
          );
        } else {
          return "";
        }
      })}
      <div>
        {String(survey.isPublished) === "true" ? (
          <div className="publishTag">
            <FaCheckCircle />
          </div>
        ) : (
          <div className="publishTag">
            <FaCog />
          </div>
        )}
      </div>
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
