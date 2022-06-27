import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getSurveys, reset } from "../features/surveys/surveySlice";
import SurveyItem from "../components/SurveyItem";
import survey from "../images/survey.png";
import { Button } from "@chakra-ui/react";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { surveys, isLoading, isError, message } = useSelector(
    (state) => state.surveys
  );

  const numPublishedSurveys = surveys.filter(
    (s) => s.isPublished === true
  ).length;

  const numDraftSurveys = surveys.filter((s) => s.isPublished === false).length;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getSurveys());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  const onClick = () => navigate("/createSurveyStart");

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Survey Dashboard</p>
      </section>
      <div className="dash-sidebar">
        <div className="stats-list">
          <div className="text header-text">YOU HAVE</div>
          <ul>
            <div>
              {numPublishedSurveys === 1 ? (
                <li>{`${numPublishedSurveys} published survey`}</li>
              ) : (
                <li>{`${numPublishedSurveys} published surveys`}</li>
              )}
            </div>
            <div>
              {numDraftSurveys === 1 ? (
                <li>{`${numDraftSurveys} draft survey`}</li>
              ) : (
                <li>{`${numDraftSurveys} draft surveys`}</li>
              )}
            </div>
          </ul>
        </div>
      </div>
      <div class="view-forms">
        {surveys.length > 0 ? (
          <div className="surveys">
            <ul>
              {surveys.map((survey) => (
                <li>
                  <SurveyItem key={survey._id} survey={survey} />
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-surveys">
            <img src={survey} alt="Survey Logo" width="180px" height="180px" />
            <div className="text">YOU DON'T HAVE ANY FORMS YET!</div>
            <div className="subtext">Your forms will appear here.</div>
            <Button
              mt="25px"
              colorScheme="orange"
              variant="outline"
              cursor="pointer"
              px="40px"
              py="22px"
              onClick={onClick}
            >
              CREATE FORM
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
