import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FeedSurveyItem from "../components/FeedSurveyItem";
import Spinner from "../components/Spinner";
import { getFeedSurveys, reset } from "../features/surveys/surveySlice";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";

function SurveyFeed() {
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
      dispatch(getFeedSurveys());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Sidebar user={user} />

      <div className="my-feed">
        <SearchBar surveys={surveys} className="search-bar" />
        <section className="heading">
          <h1>Survey Feed</h1>
          <p>Explore Surveys Published By Other Users</p>
        </section>

        <section className="content">
          {surveys.length > 0 ? (
            <div className="surveys">
              {surveys.map((survey) => (
                <FeedSurveyItem key={survey._id} survey={survey} />
              ))}
            </div>
          ) : (
            <h3>There are no published surveys by other users</h3>
          )}
        </section>
      </div>
    </>
  );
}

export default SurveyFeed;
