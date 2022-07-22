import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SurveyForm from "../components/survey_creation/SurveyForm";
import SurveyNavbar from "../components/survey_creation/SurveyNavbar";
import { toast } from "react-toastify";
import {
  createSurvey,
  createDraftSurvey,
  getDraftSurveysById,
  reset,
} from "../features/surveys/surveySlice";
import { v4 as uuidv4 } from "uuid";
import Spinner from "../components/Spinner";

function SurveyCreationStart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get search parameters
  const [searchParams] = useSearchParams();

  const surveyId = searchParams.get("id");

  //access user and survey states
  const { user } = useSelector((state) => state.auth);
  const {
    surveys,
    getDraftSuccess,
    isError,
    isLoading,
    message,
    postSuccess,
    postDraftSuccess,
  } = useSelector((state) => state.surveys);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    if (isError) {
      toast.error(message);
    }

    if (postSuccess || postDraftSuccess) {
      navigate("/myforms");
    }

    if (surveyId) {
      console.log("get survey from new surveyID");
      dispatch(getDraftSurveysById(surveyId));
    }

    return () => {
      dispatch(reset());
    };
  }, [
    user,
    isError,
    message,
    postSuccess,
    postDraftSuccess,
    surveyId,
    navigate,
    dispatch,
  ]);

  useEffect(() => {
    if (getDraftSuccess) {
      setFormData(surveys[0]);
    } else {
      setFormData(initialFormData);
    }
  }, [getDraftSuccess]);

  //define state for form data
  const initialFormData = {
    title: "",
    desc: "",
    questions: [],
    isPublished: false,
  };

  //console.log("Filtered Survey:", surveys);

  const [formData, setFormData] = useState(
    surveys === [] ? initialFormData : surveys[0]
  );

  //console.log("Form Data:", formData);

  const { title, desc, isPublished } = formData;

  //define questions state
  const [questions, setQuestions] = useState([]);

  const clearForm = () => {
    setFormData({ ...initialFormData });
    setQuestions([]);
  };

  //handles title and desc values
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc) {
      toast.error("Form must have a title and description to publish");
      return;
    } else if (questions.length === 0) {
      toast.error("Published forms must have at least one question");
      return;
    }

    const surveyData = { title, desc, questions, isPublished };

    dispatch(createSurvey(surveyData));

    clearForm();
  };

  const onSubmitDraft = (e) => {
    e.preventDefault();

    const surveyData = { title, desc, questions, isPublished };

    if (!title) {
      toast.error("Please add a title to your form");
    }

    dispatch(createDraftSurvey(surveyData));

    clearForm();
  };

  const onSave = () => {
    let updatedPublished = {};
    updatedPublished = { isPublished: false };
    setFormData((prevState) => ({
      ...prevState,
      ...updatedPublished,
    }));
  };

  const onPublish = () => {
    let updatedPublished = {};
    updatedPublished = { isPublished: true };
    setFormData((prevState) => ({
      ...prevState,
      ...updatedPublished,
    }));
  };

  //question object = {id, type, question, questionResponse}
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: uuidv4(),
        type: "",
        question: "",
        response: {},
        answers: [],
      },
    ]);
  };

  const delQuestion = (id) => {
    const newQuestions = questions.filter((q) => q.id !== id);
    setQuestions(newQuestions);
  };

  const updateQuestion = (id) => {
    return (type, question, response, answers) => {
      const refQuestionIndex = questions.findIndex((q) => q.id === id);
      const newQuestions = [...questions];
      newQuestions[refQuestionIndex] = {
        ...questions[refQuestionIndex],
        type: type,
        question: question,
        response: response,
        answers: answers,
      };
      setQuestions(newQuestions);
    };
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="surveyStart">
      <SurveyNavbar onSave={onSave} onSubmitDraft={onSubmitDraft} />
      <SurveyForm
        onChange={onChange}
        onSubmit={onSubmit}
        onPublish={onPublish}
        title={title}
        desc={desc}
        questions={questions}
        addQuestion={addQuestion}
        delQuestion={delQuestion}
        updateQuestion={updateQuestion}
      />
    </div>
  );
}

export default SurveyCreationStart;
