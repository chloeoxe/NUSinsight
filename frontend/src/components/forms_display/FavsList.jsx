import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getFavSurveys,
  updateFavSurvey,
  reset,
} from "../../features/surveys/surveySlice";
import Spinner from "../Spinner";
import SurveyItem from "./SurveyItem";
import { FaStar } from "react-icons/fa";

function FavsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { surveys, isLoading, postFavSuccess, isError, message } = useSelector(
    (state) => state.surveys
  );

  const updateFavourite = (surveyId, fav) => {
    const surveyParams = { surveyId, fav };
    dispatch(updateFavSurvey(surveyParams));
  };

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getFavSurveys());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  useEffect(() => {
    if (postFavSuccess) {
      dispatch(getFavSurveys());
    }

    return () => {
      dispatch(reset());
    };
  }, [postFavSuccess]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div class="view-forms">
      {surveys.length > 0 ? (
        <div className="surveys">
          <ul>
            {surveys.map((survey) => (
              <li>
                <SurveyItem
                  key={survey._id}
                  survey={survey}
                  updateFavourite={updateFavourite}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="no-surveys">
          <FaStar size={100} fill="Orange" />
          <div className="text">YOU DON'T HAVE ANY FAVOURITES YET!</div>
          <div className="subtext">Your favourited forms will appear here.</div>
        </div>
      )}
    </div>
  );
}

export default FavsList;
