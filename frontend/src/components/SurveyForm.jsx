import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSurvey } from "../features/surveys/surveySlice";
import { VStack, Container, Box } from "@chakra-ui/react";
import AddQuestion from "./survey/AddQuestion";

function SurveyForm() {
  const initialFormData = {
    title: "",
    desc: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const { title, desc } = formData;

  const dispatch = useDispatch();

  const clearForm = () => setFormData({ ...initialFormData });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const surveyData = { title, desc };

    dispatch(createSurvey(surveyData));

    clearForm();
  };

  const [numOfQuestions, setNumOfQuestions] = useState(0);

  return (
    <>
      <VStack>
        <Container className="heading" maxW="800px">
          <h1>Create a Survey</h1>
          <p>Fill in the details below</p>
        </Container>
        <Box
          className="name"
          shadow="md"
          width="800px"
          p={5}
          border="1px"
          borderColor="gray.200"
        >
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                placeholder="Title"
                onChange={onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="desc"
                id="desc"
                value={desc}
                placeholder="Description"
                onChange={onChange}
              />
            </div>
          </form>
        </Box>
        {numOfQuestions === 0 ? (
          <AddQuestion setNumOfQuestions={setNumOfQuestions} />
        ) : (
          <>
            <div></div>
          </>
        )}
        <Container className="heading" maxW="800px" p={10}>
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Publish Survey
            </button>
          </div>
        </Container>
      </VStack>
    </>
  );
}

export default SurveyForm;
