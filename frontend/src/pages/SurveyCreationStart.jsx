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
  updateDraftSurvey,
  updateDraftToPublish,
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
      clearForm();
      navigate("/myforms");
    }

    if (surveyId) {
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
      const { questions } = surveys[0];
      setFormData(surveys[0]);
      setSurveyQuestions(questions);
    } else {
      setFormData(initialFormData);
    }
  }, [getDraftSuccess]);

  //define state for form data
  const initialFormData = {
    title: "",
    desc: "",
    questions: [],
    answers: { user: { answer: { qn: [] } } },
    isPublished: false,
    isFavourite: false,
  };

  //console.log("Filtered Survey:", surveys[0]);

  const [formData, setFormData] = useState(initialFormData);

  //console.log("Form Data:", formData);

  const { title, desc, answers, isPublished, isFavourite } = formData;

  //define questions state
  const [surveyQuestions, setSurveyQuestions] = useState([]);

  const clearForm = () => {
    setFormData({ ...initialFormData });
    setSurveyQuestions([]);
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
    } else if (surveyQuestions.length === 0) {
      toast.error("Published forms must have at least one question");
      return;
    }

    const questions = [...surveyQuestions];

    for (const qn of questions) {
      if (qn.question === "") {
        toast.error("Fill out all question inputs");
        return;
      }

      if (qn.type === "mcq") {
        for (const opt of qn.response.options) {
          if (!opt.value) {
            toast.error("Fill out all MCQ options");
            return;
          }
        }
      }
    }

    const surveyData = {
      title,
      desc,
      questions,
      answers,
      isPublished: true,
      isFavourite,
    };

    if (surveyId) {
      dispatch(
        updateDraftToPublish({ surveyId: surveyId, surveyData: surveyData })
      );
    } else {
      dispatch(createSurvey(surveyData));
    }
  };

  // Define onSubmitDraft
  const setNew = (e) => {
    e.preventDefault();

    const questions = [...surveyQuestions];

    const surveyData = {
      title,
      desc,
      questions,
      answers,
      isPublished,
      isFavourite,
    };

    if (!title) {
      toast.error("Please add a title to your form");
    } else {
      dispatch(createDraftSurvey(surveyData));
    }
  };

  const updateExisting = (e) => {
    e.preventDefault();

    const questions = [...surveyQuestions];

    const surveyData = { title, desc, questions, isPublished };

    if (!title) {
      toast.error("Please add a title to your form");
    } else {
      dispatch(
        updateDraftSurvey({ surveyId: surveyId, surveyData: surveyData })
      );
    }
  };

  // if surveyId is defined, updateDraftSurvey instead of createDraftSurvey
  const onSubmitDraft = surveyId ? updateExisting : setNew;

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
    setSurveyQuestions([
      ...surveyQuestions,
      {
        id: uuidv4(),
        type: "",
        question: "",
        response: {},
      },
    ]);
  };

  const delQuestion = (id) => {
    const newQuestions = surveyQuestions.filter((q) => q.id !== id);
    setSurveyQuestions(newQuestions);
  };

  const updateQuestion = (id) => {
    return (type, question, response) => {
      const refQuestionIndex = surveyQuestions.findIndex((q) => q.id === id);
      const newQuestions = [...surveyQuestions];
      newQuestions[refQuestionIndex] = {
        ...surveyQuestions[refQuestionIndex],
        type: type,
        question: question,
        response: response,
      };
      setSurveyQuestions(newQuestions);
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
        questions={surveyQuestions}
        addQuestion={addQuestion}
        delQuestion={delQuestion}
        updateQuestion={updateQuestion}
      />
    </div>
  );
}

export default SurveyCreationStart;
