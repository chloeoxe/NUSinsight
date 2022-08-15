import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  Stack,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";

function SearchBar(props) {
  const { surveys } = props;

  const [matchedSurveys, setMatchedSurveys] = useState([]);

  const [userInput, setUserInput] = useState("");

  const handleSearch = (e) => {
    setUserInput(e.target.value);

    const newMatchedSurveys = surveys.filter((s) =>
      s.title.toLowerCase().includes(userInput.toLowerCase())
    );

    setMatchedSurveys(newMatchedSurveys);
  };

  return (
    <div className="search-bar">
      <Stack spacing={0}>
        <InputGroup size="lg">
          <Input
            variant="filled"
            placeholder="Search Survey"
            value={userInput}
            onChange={handleSearch}
          />
          <InputRightElement children={<FaSearch color="LightGray" />} />
        </InputGroup>
        <div className="user-search">
          {userInput !== "" ? (
            <Accordion allowToggle className="accordion">
              <div className="matched-surveys">
                {matchedSurveys.length > 0 ? (
                  <>
                    {matchedSurveys.map((survey) => (
                      <AccordionItem margin="0px">
                        <AccordionButton bg="#eeeeee">
                          <Box flex="1" textAlign="left">
                            <Text fontWeight="bold">{survey.title}</Text>
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                          <i>Description:</i> {survey.desc}
                        </AccordionPanel>
                        <AccordionPanel pb={4}>
                          <i>User:</i> {survey.username}
                        </AccordionPanel>
                        <AccordionPanel pb={4}>
                          <Link to={`/completeSurvey/${survey._id}`}>
                            <strong>Click Here To Complete Survey</strong>
                          </Link>
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </>
                ) : (
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          No suitable surveys found
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                  </AccordionItem>
                )}
              </div>
            </Accordion>
          ) : (
            ""
          )}
        </div>
      </Stack>
    </div>
  );
}

export default SearchBar;
