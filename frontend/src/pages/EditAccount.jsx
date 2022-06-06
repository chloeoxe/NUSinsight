import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import { Link } from "react-router-dom";
import { updateUser, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function EditAccount() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    major: "",
    email: "",
    username: "",
  });

  const { name, position, major, email, username } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate("/login");
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = { name, position, major, email, username };

    dispatch(updateUser(userData));
    navigate("/account");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser />
          Edit Account
        </h1>
        <p>Edit Details Below</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="position"
              className="form-control"
              id="position"
              name="position"
              value={position}
              placeholder="Student/Staff"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="major"
              className="form-control"
              id="major"
              name="major"
              value={major}
              placeholder="Course of Study"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="username"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Username"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Confirm Changes
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default EditAccount;
