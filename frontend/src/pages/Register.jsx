import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser, FaUserAlt, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiRotateLockFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  SimpleGrid,
} from "@chakra-ui/react";
import Spinner from "../components/Spinner";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    position: "Student",
    faculty: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const [state, setState] = useState("1");

  const { name, position, faculty, email, username, password, password2 } =
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
      const userData = { name, position, faculty, email, username, password };

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
      mt={[20, "8vh"]}
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
          <FaUser /> Register
        </Heading>
        <Text>Create an account.</Text>
      </VStack>

      <form onSubmit={onSubmit}>
        <VStack spacing={3} align={["flex-start"]} w="full" mb={3}>
          <FormControl>
            <SimpleGrid columns={2}>
              <FormLabel pt={0.5} pl={3}>
                I am a...
              </FormLabel>
              <RadioGroup
                type="position"
                value={position}
                className="form-control"
                id="position"
                name="position"
                rounded="false"
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
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children={<FaUserAlt />}
              />
              <Input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                placeholder="Name"
                rounded="false"
                onChange={onChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <Select
              type="faculty"
              className="form-control"
              id="faculty"
              name="faculty"
              value={faculty}
              placeholder="-- Select your faculty --"
              rounded="false"
              onChange={onChange}
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
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children={<MdEmail />}
                fontSize="1.3em"
              />
              <Input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                placeholder="Email"
                rounded="false"
                onChange={onChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children="@"
                fontSize="1.3em"
              />
              <Input
                type="username"
                className="form-control"
                id="username"
                name="username"
                value={username}
                placeholder="Username"
                rounded="false"
                onChange={onChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children={<FaLock />}
              />
              <Input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                placeholder="Password"
                rounded="false"
                onChange={onChange}
              />
            </InputGroup>
          </FormControl>
          <FormControl>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                color="gray.300"
                children={<RiRotateLockFill />}
                fontSize="1.5em"
              />
              <Input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                value={password2}
                placeholder="Confirm password"
                rounded="false"
                onChange={onChange}
              />
            </InputGroup>
          </FormControl>
        </VStack>
        <div className="form-group">
          <button type="submit" className="btn btn-block">
            Register
          </button>
        </div>
      </form>

      <Box align="center">
        <Text>Already have an account?</Text>
        <strong>
          <Link to="/login">Login</Link>
        </strong>
      </Box>
    </Box>
  );
}

export default Register;
