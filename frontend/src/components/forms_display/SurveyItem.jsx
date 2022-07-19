import { useDispatch } from "react-redux";
import { deleteSurvey } from "../../features/surveys/surveySlice";
import { FaChartLine, FaEdit } from "react-icons/fa";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";

function SurveyItem({ survey }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = { id: survey._id };

  const editDraftSurvey = () =>
    navigate({
      pathname: "/createSurveyStart",
      search: `?${createSearchParams(params)}`,
    });

  const handleClick =
    String(survey.isPublished) === "false" ? editDraftSurvey : null;

  return (
    <div className="survey" onClick={handleClick}>
      <Checkbox className="checkbox" borderColor="#707070" />
      <div className="favourite">
        <FaStar />
      </div>
      <div className="survey-info">
        <div className="title">
          {survey.title === "" ? "Form" : survey.title}
        </div>
        <div className="subtitle">
          Created on {new Date(survey.createdAt).toLocaleString("en-US")}
        </div>
      </div>

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
        <FaTrashAlt size="15px" />
      </button>
    </div>
  );
}

export default SurveyItem;
