import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SurveyForm from "../components/SurveyForm";
import SurveyItem from "../components/SurveyItem";
import Spinner from "../components/Spinner";
import { getSurveys, reset } from "../features/surveys/surveySlice";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { surveys, isLoading, isError, message } = useSelector(
    (state) => state.surveys
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getSurveys());
      return () => {
        dispatch(reset());
      };
    }
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Survey Dashboard</p>
      </section>
      <SurveyForm />

      <section className="content">
        {surveys.length > 0 ? (
          <div className="surveys">
            {surveys.map((survey) => (
              <SurveyItem key={survey._id} survey={survey} />
            ))}
          </div>
        ) : (
          <h3>You have not created any surveys</h3>
        )}
      </section>
    </>
  );
}

export default Dashboard;
