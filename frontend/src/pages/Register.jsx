import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import {
  Box,
  VStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    major: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const { name, position, major, email, username, password, password2 } =
    formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = { name, position, major, email, username, password };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[20, "10vh"]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <VStack
        spacing={1}
        align={["flex-start", "center"]}
        w="full"
        mb={3}
        p={3}
      >
        <Heading>
          <FaUser /> Register
        </Heading>
        <Text>Create an account.</Text>
      </VStack>

      <form onSubmit={onSubmit}>
        <VStack spacing={4} align={["flex-start"]} w="full" mb={3}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              variant="filled"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Role</FormLabel>
            <Input
              type="position"
              className="form-control"
              id="position"
              name="position"
              value={position}
              placeholder="Student/Staff"
              variant="filled"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Course of Study</FormLabel>
            <Input
              type="major"
              className="form-control"
              id="major"
              name="major"
              value={major}
              placeholder="Course of Study"
              variant="filled"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>E-mail Address</FormLabel>
            <Input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              variant="filled"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="username"
              className="form-control"
              id="username"
              name="username"
              value={username}
              placeholder="Username"
              variant="filled"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              variant="filled"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
              variant="filled"
              onChange={onChange}
            />
          </FormControl>
        </VStack>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Register
          </button>
        </div>
      </form>

      <section className="registerFooter">
        <p>Already have an account?</p>
        <strong>
          <Link to="/login">Login</Link>
        </strong>
      </section>
    </Box>
  );
}

export default Register;
