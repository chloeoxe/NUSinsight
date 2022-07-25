import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { getAllSurveys, reset } from "../features/surveys/surveySlice";
import {
  Text,
  HStack,
  Box,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  VStack,
} from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { surveys, isLoading, isError, message } = useSelector(
    (state) => state.surveys
  );

  const numPublishedSurveys =
    surveys !== []
      ? surveys.filter((s) => s.isPublished && String(s.user) === user._id)
          .length
      : 0;

  const numDraftSurveys = surveys.filter(
    (s) => s.isPublished === false && String(s.user) === user._id
  ).length;

  const numCompletedSurveys = surveys.filter((s) => {
    const answers = s.answers; // object
    const users = Object.keys(answers); // array of user IDs (strings)
    return users.includes(user._id);
  }).length;

  const surveysWithResponses = surveys.filter((s) => {
    const answers = s.answers;
    const numOfResponses = Object.keys(answers).length - 1;
    return numOfResponses > 0 && String(s.user) === user._id;
  });

  const mostPopularSurveys = surveysWithResponses
    .map((s) => {
      return {
        title: s.title,
        desc: s.desc,
        numOfResponses: Object.keys(s.answers).length - 1,
      };
    })
    .sort(function (a, b) {
      return b.numOfResponses - a.numOfResponses;
    })
    .slice(0, 5);

  const surveysWithRecentResponses = surveysWithResponses.map(
    ({ title, questions, answers }) => {
      const flattenedAnswers = Object.keys(answers)
        .filter((userId) => userId !== "user")
        .flatMap((userId) =>
          Object.keys(answers[userId]).map(
            (responseNum) => answers[userId][responseNum]
          )
        );
      return { title, questions, answers: flattenedAnswers };
    }
  );

  const allSurveyResponses = surveysWithRecentResponses.flatMap((survey) => {
    const answers = survey.answers;
    return answers.flatMap((ans) => {
      const submittedDate = ans.submittedAt;
      const answerResponses = Object.keys(ans)
        .filter((qNum) => qNum !== "submittedAt")
        .map((qNum) => {
          return { qNum: qNum, a: ans[qNum] };
        });
      return answerResponses.map((res) => {
        const title = survey.title;
        const question = survey.questions[Number(res.qNum) - 1].question;
        const type = survey.questions[Number(res.qNum) - 1].type;
        let qRes = "";
        if (type === "mcq") {
          const temp = res.a.map(
            (optionNum) =>
              survey.questions[Number(res.qNum) - 1].response.options[
                optionNum - 1
              ].value
          );
          for (const x of temp) {
            qRes = qRes + x + ", ";
          }
          qRes = qRes.slice(0, qRes.length - 2);
        } else if (type === "oe") {
          qRes = res.a[0];
        }
        return {
          title: title,
          type: type,
          question: question,
          response: qRes,
          submittedAt: submittedDate,
        };
      });
    });
  }); //returns array of {title, type, question, response, submittedAt} objects

  const mostRecentResponses = allSurveyResponses
    .filter((res) => {
      const submittedDate = new Date(res.submittedAt);
      const endDate = new Date();
      const startDate = new Date(endDate.getDate() - 5);
      return submittedDate <= endDate && submittedDate >= startDate;
    })
    .sort(function (a, b) {
      return new Date(a.submittedAt) <= new Date(b.submittedAt);
    });

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate("/login");
    } else {
      dispatch(getAllSurveys());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="dashboard-heading">
        <Text fontWeight="600">Welcome, {user && user.name}</Text>
        <Text fontSize="22px" fontWeight="400" color="gray.500">
          Here's what's happening in your account recently.
        </Text>
      </section>
      <HStack justify="space-evenly" p={5} mt={8}>
        <Box
          width="500px"
          shadow="md"
          borderRadius="10px"
          p={5}
          borderWidth="1px"
          bg="white"
        >
          <Text fontSize="30px">{numPublishedSurveys}</Text>
          <Text>
            {numPublishedSurveys === 1
              ? "Published Survey"
              : "Published Surveys"}
          </Text>
        </Box>
        <Box
          width="500px"
          shadow="md"
          borderRadius="10px"
          p={5}
          borderWidth="1px"
          bg="white"
        >
          <Text fontSize="30px">{numDraftSurveys}</Text>
          <Text>
            {numDraftSurveys === 1
              ? "Unpublished Survey"
              : "Unpublished Surveys"}
          </Text>
        </Box>
        <Box
          width="500px"
          shadow="md"
          borderRadius="10px"
          p={5}
          borderWidth="1px"
          bg="white"
        >
          <Text fontSize="30px">{numCompletedSurveys}</Text>
          <Text>
            {numCompletedSurveys === 1
              ? "Completed Survey"
              : "Completed Surveys"}
          </Text>
        </Box>
      </HStack>

      <HStack justify="space-evenly" p={5} align="stretch">
        <VStack spacing={10} align="stretch">
          <Box
            width="600px"
            shadow="md"
            borderRadius="10px"
            p={5}
            borderWidth="1px"
            bg="white"
          >
            <Text fontSize="20px" textAlign="left" p={3} className="sticky-row">
              Your most popular surveys
            </Text>
            <Box className="table-container">
              <TableContainer>
                <Table variant="simple">
                  {mostPopularSurveys.length === 0 ? (
                    <TableCaption>
                      You do not have surveys with responses
                    </TableCaption>
                  ) : (
                    ""
                  )}
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Description</Th>
                      <Th>Responses</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mostPopularSurveys.length === 0 ? (
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td isNumeric></Td>
                      </Tr>
                    ) : (
                      mostPopularSurveys.map(
                        ({ title, desc, numOfResponses }) => {
                          return (
                            <Tr>
                              <Td>{title}</Td>
                              <Td>{desc}</Td>
                              <Td isNumeric>{numOfResponses}</Td>
                            </Tr>
                          );
                        }
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box
            width="600px"
            shadow="md"
            borderRadius="10px"
            p={5}
            borderWidth="1px"
            bg="white"
            className="minimized"
          >
            <Text fontSize="20px" textAlign="left" p={3} className="sticky-row">
              Recent responses (Past 5 days)
            </Text>
            <Box className="table-container">
              <TableContainer>
                <Table variant="simple">
                  {mostRecentResponses.length === 0 ? (
                    <TableCaption>
                      You do not have any recent responses
                    </TableCaption>
                  ) : (
                    ""
                  )}
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Type</Th>
                      <Th>Question</Th>
                      <Th>Answer</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {mostRecentResponses.length === 0 ? (
                      <>
                        <Tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                        <Tr>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                          <Td></Td>
                        </Tr>
                      </>
                    ) : (
                      mostRecentResponses.map(
                        ({ title, type, question, response }) => {
                          return (
                            <Tr>
                              <Td>{title}</Td>
                              <Td>{type}</Td>
                              <Td>{question}</Td>
                              <Td>{response}</Td>
                            </Tr>
                          );
                        }
                      )
                    )}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
          <Box
            width="600px"
            shadow="md"
            borderRadius="10px"
            p={5}
            borderWidth="1px"
            bg="rgba(255, 178, 8, 0.8)"
            onClick={() => navigate("/createSurveyStart")}
            cursor="pointer"
            _hover={{ bg: "#ffb208" }}
          >
            <Text fontSize="25px" fontWeight="600" color="white" p={2}>
              CREATE A FORM
            </Text>
            <FaPlusCircle size="25px" color="white" />
          </Box>
        </VStack>
        <Box
          width="950px"
          shadow="md"
          borderRadius="10px"
          p={5}
          borderWidth="1px"
          bg="white"
          className="expanded"
        >
          <Text fontSize="20px" textAlign="left" p={3} className="sticky-row">
            Recent responses (Past 5 days)
          </Text>
          <Box className="table-container">
            <TableContainer>
              <Table variant="simple">
                {mostRecentResponses.length === 0 ? (
                  <TableCaption>
                    You do not have any recent responses
                  </TableCaption>
                ) : (
                  ""
                )}
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Type</Th>
                    <Th>Question</Th>
                    <Th>Answer</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mostRecentResponses.length === 0 ? (
                    <>
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                      <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                      </Tr>
                    </>
                  ) : (
                    mostRecentResponses.map(
                      ({ title, type, question, response }) => {
                        return (
                          <Tr>
                            <Td>{title}</Td>
                            <Td>{type}</Td>
                            <Td>{question}</Td>
                            <Td>{response}</Td>
                          </Tr>
                        );
                      }
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </HStack>
    </>
  );
}

export default Dashboard;
