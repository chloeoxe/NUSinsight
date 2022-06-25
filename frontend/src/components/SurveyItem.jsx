import { useDispatch } from "react-redux";
import { deleteSurvey } from "../features/surveys/surveySlice";
import { FaChartLine, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function SurveyItem({ survey }) {
  const dispatch = useDispatch();

  return (
    <div className="survey">
      <div>{new Date(survey.createdAt).toLocaleString("en-US")}</div>
      <h2>{survey.title}</h2>
      <div>
        {String(survey.isPublished) === "true" ? (
          <Link to={`/surveyFindings/${survey._id}`}>
            <div title="View Survey Findings" className="publishTag">
              <FaChartLine />
            </div>
          </Link>
        ) : (
          <Link to={`/editSurvey/${survey._id}`}>
            <div title="Edit Survey" className="publishTag">
              <FaEdit />
            </div>
          </Link>
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
