import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import { Link } from "react-router-dom";
import { getMe, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

function Account() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, message } = useSelector(
    (state) => state.auth
  );
  const { name, position, major, email, username, password } = user;

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getMe());
      return () => {
        dispatch(reset());
      };
    }
  }, [user, isError, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Your Account
        </h1>
        <p>View & Edit details</p>
      </section>

      <div className="container">
        <h3>{name}</h3>
      </div>
      <div className="container">
        <h3>{position}</h3>
      </div>
      <div className="container">
        <h3>{major}</h3>
      </div>
      <div className="container">
        <h3>{email}</h3>
      </div>
      <div className="container">
        <h3>{username}</h3>
      </div>
      <div className="container">
        <h3>{password}</h3>
      </div>
      <button className="btn btn-block">Edit account details</button>
    </>
  );
}

export default Account;
