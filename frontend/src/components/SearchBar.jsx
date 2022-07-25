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
    <Stack spacing={4}>
      <InputGroup>
        <Input
          variant="outline"
          placeholder="Search Survey"
          value={userInput}
          onChange={handleSearch}
        />
        <InputRightElement children={<FaSearch color="LightGray" />} />
      </InputGroup>
      <div className="user-search">
        {userInput !== "" ? (
          <Accordion allowToggle>
            <div className="matched-surveys">
              {matchedSurveys.length > 0 ? (
                <div>
                  {matchedSurveys.map((survey) => (
                    <AccordionItem>
                      <h2>
                        <AccordionButton>
                          <Box flex="1" textAlign="left">
                            {survey.title}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel pb={4}>{survey.desc}</AccordionPanel>
                      <AccordionPanel pb={4}>{survey.username}</AccordionPanel>
                      <AccordionPanel pb={4}>
                        <Link to={`/completeSurvey/${survey._id}`}>
                          <strong>Complete Survey</strong>
                        </Link>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </div>
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
  );
}

export default SearchBar;
