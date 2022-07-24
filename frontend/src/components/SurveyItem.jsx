import { useDispatch } from "react-redux";
import { deleteSurvey } from "../features/surveys/surveySlice";
import { FaChartLine, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import { Checkbox } from "@chakra-ui/react";

function SurveyItem({ survey }) {
  const dispatch = useDispatch();

  return (
    <div>
      {String(survey.isPublished) === "true" ? (
        <Link to={`/surveyFindings/${survey._id}`} title="View Survey Findings">
          <div className="survey">
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

            <div className="publishTag">
              <FaChartLine />
            </div>

            <button
              className="close"
              onClick={() => dispatch(deleteSurvey(survey._id))}
            >
              <FaTrashAlt size="15px" />
            </button>
          </div>
        </Link>
      ) : (
        <Link to={`/editSurvey/${survey._id}`} title="Edit Survey">
          <div className="survey">
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

            <div className="publishTag">
              <FaEdit />
            </div>

            <button
              className="close"
              onClick={() => dispatch(deleteSurvey(survey._id))}
            >
              <FaTrashAlt size="15px" />
            </button>
          </div>
        </Link>
      )}
    </div>
  );
}

export default SurveyItem;
