import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SurveyForm from "../components/SurveyForm";

function SurveyCreationStart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate, dispatch]);

  return (
    <div className="surveyStart">
      <SurveyForm />
    </div>
  );
}

export default SurveyCreationStart;
