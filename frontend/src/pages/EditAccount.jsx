import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
//import { Link } from "react-router-dom";
import { updateUser, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import Sidebar from "../components/Sidebar";
import {
  FormLabel,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";

function EditAccount() {
  const [formData, setFormData] = useState({
    name: "",
    position: "Student",
    faculty: "",
    email: "",
    username: "",
  });

  const { name, position, faculty, email, username } = formData;

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

    const userData = { name, position, faculty, email, username };

    dispatch(updateUser(userData));
    navigate("/account");
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Sidebar user={user} />

      <div className="my-feed">
        <section className="heading">
          <h1>
            <FaUser />
            Edit Account
          </h1>
          <p>Edit Details Below</p>
        </section>

        <section className="form">
          <form onSubmit={onSubmit}>
            <VStack spacing={6} align={["flex-start"]} w="full" mb={3}>
              <Input
                isRequired
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
                onChange={onChange}
                bg="white"
              />
              <SimpleGrid columns={2} width="100%">
                <FormLabel pl={3}>I am a...</FormLabel>
                <RadioGroup
                  type="position"
                  value={position}
                  className="form-control"
                  id="position"
                  name="position"
                  rounded="true"
                  onChange={(newPosition) => {
                    setFormData((prevState) => ({
                      ...prevState,
                      position: newPosition,
                    }));
                  }}
                >
                  <HStack spacing="24px">
                    <Radio value="Student">Student</Radio>
                    <Radio value="Staff">Staff</Radio>
                  </HStack>
                </RadioGroup>
              </SimpleGrid>
              <Select
                isRequired
                type="faculty"
                className="form-control"
                id="faculty"
                name="faculty"
                value={faculty}
                placeholder="-- Select your faculty --"
                rounded="false"
                onChange={onChange}
                bg="white"
              >
                <option value="College of Humanities and Sciences (CHS)">
                  College of Humanities and Sciences (CHS)
                </option>
                <option value="Business School">Business</option>
                <option value="Computing">Computing</option>
                <option value="Dentistry">Dentistry</option>
                <option value="College of Design and Engineering (CDE)">
                  College of Design and Engineering (CDE)
                </option>
                <option value="Law">Law</option>
                <option value="Medicine">Medicine</option>
                <option value="Pharmacy">Pharmacy</option>
              </Select>
              <Input
                isRequired
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={onChange}
                bg="white"
              />
              <Input
                isRequired
                type="username"
                className="form-control"
                id="username"
                name="username"
                value={username}
                placeholder="Username"
                onChange={onChange}
                bg="white"
              />
              <button type="submit" className="btn btn-block">
                Confirm Changes
              </button>
            </VStack>
          </form>
        </section>
      </div>
    </>
  );
}

export default EditAccount;
