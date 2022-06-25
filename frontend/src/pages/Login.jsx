import { useState, useEffect } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";
import {
  Box,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

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

    const userData = { email, password };

    dispatch(login(userData));
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
      bg="white"
    >
      <VStack
        spacing={1}
        align={["flex-start", "center"]}
        w="full"
        mb={3}
        p={3}
      >
        <Heading>
          <FaSignInAlt /> Login
        </Heading>
        <Text>Sign in to your account.</Text>
      </VStack>

      <form onSubmit={onSubmit}>
        <VStack spacing={4} align={["flex-start"]} w="full" mb={3}>
          <FormControl>
            <FormLabel fontWeight="bold">E-mail Address</FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel fontWeight="bold">Password</FormLabel>
            <Input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChange}
            />
          </FormControl>
        </VStack>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Login
          </button>
        </div>
      </form>

      <Box align="center">
        <Text>Don't have an account?</Text>
        <strong>
          <Link to="/register">Register</Link>
        </strong>
      </Box>
    </Box>
  );
}

export default Login;
