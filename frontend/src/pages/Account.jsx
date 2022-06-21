import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function Account() {
  const navigate = useNavigate();

  const { user, isLoading } = useSelector((state) => state.auth);
  const { name, position, faculty, email, username } = user;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const onEdit = () => {
    navigate("/account/edit");
  };

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
        <p>View and Edit details</p>
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
      <button className="btn btn-block" onClick={onEdit}>
        Edit Account Details
      </button>
    </>
  );
}

export default Account;
