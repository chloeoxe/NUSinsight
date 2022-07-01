import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDraftSurveys, reset } from "../../features/surveys/surveySlice";
import Spinner from "../Spinner";
import SurveyItem from "../SurveyItem";
import draft from "../../images/draft.png";
import { Button } from "@chakra-ui/react";

function DraftsList() {
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
      dispatch(getDraftSurveys());
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
          <img src={draft} alt="Survey Logo" width="180px" height="180px" />
          <div className="text">YOU DON'T HAVE ANY DRAFTS YET!</div>
          <div className="subtext">Your draft forms will appear here.</div>
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
  );
}

export default DraftsList;
