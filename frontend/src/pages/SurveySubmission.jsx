import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getSurveyToComplete } from "../features/surveys/surveySlice";

function SurveySubmission() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  let pathname = String(location.pathname);
  const pathArray = pathname.split("/");
  let surveyId = pathArray[pathArray.length - 1];

  const { user } = useSelector((state) => state.auth);

  const { surveys, isLoading } = useSelector((state) => state.surveys);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getSurveyToComplete(surveyId));
  }, [user, surveyId, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return <p>Survey Response Submitted</p>;
}

export default SurveySubmission;
