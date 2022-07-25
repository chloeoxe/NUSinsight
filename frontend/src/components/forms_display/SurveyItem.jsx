import { useDispatch } from "react-redux";
import { deleteSurvey } from "../../features/surveys/surveySlice";
import { FaChartLine, FaEdit } from "react-icons/fa";
import { useNavigate, createSearchParams } from "react-router-dom";
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

  const viewSurveyFindings = () =>
    navigate({
      pathname: "/surveyFindings",
      search: `${createSearchParams(params)}`,
    });

  return (
    <>
      {String(survey.isPublished) === "true" ? (
        <div className="survey">
          <Checkbox className="checkbox" borderColor="#707070" />
          <div className="favourite">
            <FaStar />
          </div>
          <div
            className="survey-info"
            onClick={viewSurveyFindings}
            title="View Survey Findings"
          >
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
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteSurvey(survey._id));
            }}
          >
            <FaTrashAlt size="15px" />
          </button>
        </div>
      ) : (
        <div className="survey">
          <Checkbox className="checkbox" borderColor="#707070" />
          <div className="favourite">
            <FaStar />
          </div>
          <div
            className="survey-info"
            onClick={editDraftSurvey}
            title="Edit Draft Survey"
          >
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
            onClick={(e) => {
              e.stopPropagation();
              dispatch(deleteSurvey(survey._id));
            }}
          >
            <FaTrashAlt size="15px" />
          </button>
        </div>
      )}
    </>
  );
}

export default SurveyItem;
