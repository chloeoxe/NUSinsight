import { useState } from "react";
import { useDispatch } from "react-redux";
import { createSurvey } from "../features/surveys/surveySlice";

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

  return (
    <>
      <section className="heading">
        <h1>Create a Survey</h1>
        <p>Fill in the details below</p>
      </section>

      <section className="form">
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
          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Add Survey
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default SurveyForm;
