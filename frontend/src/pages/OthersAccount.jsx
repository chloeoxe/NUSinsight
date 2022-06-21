import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
//import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { getOtherUser, reset as resetUser } from "../features/auth/authSlice";
import {
  getOtherUserSurveys,
  reset as resetSurveys,
} from "../features/surveys/surveySlice";
import OthersAccountSurveyItem from "../components/OthersAccountSurveyItem";

function OthersAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user, otherUser, isLoading } = useSelector((state) => state.auth);

  const { name, position, faculty, email, username } = otherUser;

  const { surveys } = useSelector((state) => state.surveys);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      let pathname = String(location.pathname);
      const pathArray = pathname.split("/");
      let otherUsername = pathArray[pathArray.length - 1];
      dispatch(getOtherUser(otherUsername));
      dispatch(getOtherUserSurveys(otherUsername));
    }

    return () => {
      dispatch(resetUser());
      dispatch(resetSurveys());
    };
  }, [user, location, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          {username}
        </h1>
      </section>

      <div className="details">
        <label>Name</label>
        <h3>{name}</h3>
      </div>
      <div className="details">
        <label>Position</label>
        <h3>{position}</h3>
      </div>
      <div className="details">
        <label>Faculty</label>
        <h3>{faculty}</h3>
      </div>
      <div className="details">
        <label>Email</label>
        <h3>{email}</h3>
      </div>
      <div className="details">
        <label>Username</label>
        <h3>@{username}</h3>
      </div>

      <section className="heading">
        <h3>Published Surveys</h3>
      </section>

      <section className="content">
        {surveys.length > 0 ? (
          <div className="surveys">
            {surveys.map((survey) => (
              <OthersAccountSurveyItem key={survey._id} survey={survey} />
            ))}
          </div>
        ) : (
          <h3>@{username} has not published any surveys</h3>
        )}
      </section>
    </>
  );
}

export default OthersAccount;
