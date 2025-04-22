import React, {useEffect, createContext, useContext, useState} from 'react';
import { Button, Badge, Grid, Flex, Container, Title, Text } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const QuizContext = createContext();

export function QuizProvider({ children }) {
  const [quizState, setQuizState] = useState({});

  const updateQuizState = (question, answer) => {
    setQuizState((prev) => ({ ...prev, [question]: answer }));
  };

  return (
    <QuizContext.Provider value={{ quizState, updateQuizState }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  return useContext(QuizContext);
}

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{
          backgroundColor: '#1F297A',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          textAlign: 'center',
          marginBottom: ".5rem",
      }}
    >
      <Title
          order={1}
          c="white"
          size={55}
          ta="center">
        YOUR DAILY BREAD
      </Title>
      <Text
        c="white"
        align="center"
        size="clamp(0.875rem, 5vw, 1.3rem)"
        my="md"
        style={{
            maxWidth: '90%',
            wordWrap: 'break-word',
            marginBottom: "2rem",
      }}
      >
        fill out this quick survey to receive a customized devotion catered specially to you and your cultural context.
      </Text>
      <Button
        variant="filled"
        size="lg"
        radius="xl"
        sx={{
            backgroundColor: '#B8A926',
            color: '#ECEAD8',
            fontWeight: 'bold',
            minWidth: '9rm',
            '&:hover': { backgroundColor: '#ECEAD8', color: '#B8A926' },
        }}
        onClick={() => navigate('/q1')}
      >
        take quiz
      </Button>
    </Flex>
  );
}

function Question1() {
  const navigate = useNavigate();
  const [selectedChoice] = useState(null);
  const { updateQuizState } = useQuiz();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleChoice = (choice) => {
    updateQuizState("q1", choice);
    navigate('/q2');
  };

  return (
    <div
      style={{
        backgroundColor: '#ECEAD8',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
    }}>
      <h2
          style={{
              color: '#CC532E',
              display: 'flex',
              alignItems: 'center',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              maxWidth: '90%',
              justifyContent: 'center'
      }}>
          WHAT CULTURAL CONTEXT DO YOU PREFER FOR READING YOUR DEVOTIONAL?
      </h2>

      <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
      }}>
        {['JAPAN', 'KOREA', 'MEXICO/CENTRAL\n AMERICA', 'NORTH AMERICA'].map((option) => (
          <Button
            key={option}
            variant="filled"
            size="lg"
            radius="999px"
            sx={{
                backgroundColor: selectedChoice === option ? '#6B6317' : '#B8A826',
                color: 'white',
              fontWeight: 'bold',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)',
                height: 'clamp(5rem, 7vw, 15rem)',
                width: 'clamp(2rm, 10vw, 5rm)',
              textAlign: 'center',
              '&:hover': { backgroundColor: '#6B6317' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => handleChoice(option)}
          >
            {option.split('\n').map((text, index) => (
              <React.Fragment key={index}>
                {text}
                {index !== option.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Button>
        ))}
      </div>

      <div
          style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: 'min(5vh, 80px)',
        }}>
        <Badge
          sx={{
            backgroundColor: '#CC532E',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 'clamp(0.8rem, 4vw, .8rem)',
        }}>
          1/3
        </Badge>
      </div>
    </div>
  );
}

function ArchButton({ children, onClick }) {
  return (
    <Button
      variant="filled"
      size="lg"
      sx={{
        backgroundColor: '#CC532E',
        '&:hover': { backgroundColor: '#A84526' },
        color: 'white',
        fontWeight: 'bold',
        fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
        height: 'clamp(40vh, 76vh, 85vh)',
        width: 'clamp(16vh, 20vw, 25vw)',
        textAlign: 'center',
        borderRadius: '9999px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        lineHeight: '1',
        position: 'relative',
        '@media (max-width: 600px)': { height: '40vh' },
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function Question2() {
  const navigate = useNavigate();
  const [selectedChoice] = useState(null);
  const { updateQuizState } = useQuiz();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleChoice = (choice) => {
    updateQuizState("q2", choice);
    navigate('/q3');
  };

  return (
    <div
      style={{
        backgroundColor: '#1F297A',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
    }}
    >
      <h2
          style={{
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)',
              maxWidth: '90%',
             marginTop: 'min(13vh)',
              justifyContent: 'center'
      }}>
          WHAT BIBLE AREA ARE YOU CURIOUS ABOUT?
      </h2>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
        {['OLD \nTESTAMENT', 'PARELLELS \nBETWEEN \nTHE TWO', 'NEW \nTESTAMENT'].map((option) => (
          <ArchButton key={option} onClick={() => handleChoice(option)}>
            {option.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </ArchButton>
        ))}
      </div>

      <div
          style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: 'min(5vh, 80px)',
        }}>
        <Badge
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#1F297A',
            fontWeight: 'bold',
            fontSize: 'clamp(0.8rem, 4vw, .8rem)',
        }}>
          2/3
        </Badge>
      </div>
    </div>
  );
}

function Question3() {
  const navigate = useNavigate();
  const { quizState, updateQuizState } = useQuiz();
  const [selectedChoice, setSelectedChoice] = useState(null);

  useEffect(() => {
    console.log("Current quiz state in Question3:", quizState);
  }, [quizState]);

  const handleChoice = async (choice) => {
    setSelectedChoice(choice);
    const completeQuizState = {
      ...quizState,
      q3: choice
    };

    updateQuizState("q3", choice);
    console.log("Full quiz state being sent:", completeQuizState);

    try {
      const response = await fetch(API_URL + "/api/submit/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Accept-Encoding": "deflate, gzip",
            "Host": "4x5cb0h8eh.execute-api.us-east-1.amazonaws.com",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
          // "X-CSRFToken": getCookie("csrftoken"),
        },
        body: JSON.stringify(completeQuizState)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Backend response:", data);

    } catch (error) {
      console.error("Submission error:", error);
    }

    navigate("/completed");
  };

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  return (
    <div
      style={{
        backgroundColor: "#B8A826",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          color: "#ECEAD8",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          maxWidth: "90%",
        }}
      >
        ARE YOU STRUGGLING WITH ANYTHING YOU WANT TO ADDRESS?
      </h2>

      <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
      }}>
        {["ANXIETY", "LONLINESS", "DOUBT", "NOTHING SPECIFIC"].map((option) => (
          <Button
            key={option}
            variant="filled"
            size="lg"
            radius="999px"
            sx={{
                backgroundColor: selectedChoice === option ? '#A84526' : '#CC532E',
                color: 'white',
              fontWeight: 'bold',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)',
                height: 'clamp(5rem, 7vw, 15rem)',
                width: 'clamp(2rm, 10vw, 5rm)',
              textAlign: 'center',
              '&:hover': { backgroundColor: '#A84526' },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={() => handleChoice(option)}
          >
            {option.split('\n').map((text, index) => (
              <React.Fragment key={index}>
                {text}
                {index !== option.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </Button>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "min(5vh, 80px)",
        }}
      >
        <Badge
          sx={{
            backgroundColor: "#AE2901",
            color: "white",
            fontWeight: "bold",
            fontSize: "clamp(0.8rem, 4vw, .8rem)",
          }}
        >
          3/3
        </Badge>
      </div>
    </div>
  );
}

function Completed() {
    const { quizState } = useQuiz();
    const [devotional, setDevotional] = useState({
        title_devo: "Generating your devotional...",
        verse_devo: "",
        content_devo: "",
        prayer_devo: ""
    });

    useEffect(() => {
        const fetchDevo = async () => {
            try {
                console.log("Sending quiz state to backend:", quizState);

                const response = await fetch(API_URL + "api/generate-devo/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                        "Accept-Encoding": "deflate, gzip",
                        "Host": "4x5cb0h8eh.execute-api.us-east-1.amazonaws.com",
                        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
                        // "X-CSRFToken": getCookie("csrftoken"),
                    },
                    body: JSON.stringify(quizState),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log("Received devotional:", data);
                setDevotional(data);

            } catch (error) {
                console.error("Error fetching devotional:", error);
                setDevotional({
                    title_devo: `There was an error generating your devotional: ${error.message}`,
                    verse_devo: "",
                    content_devo: "",
                    prayer_devo: ""
                });
            }
        };

        fetchDevo();
    }, [quizState]);

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    return (
        <div
            style={{
                backgroundColor: "#DED1B9",
                minHeight: "100vh",
                padding: "5vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
                paddingBottom: "60vh"
            }}
        >
            <h1 style={{
                color: "white",
                fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
                marginBottom: "2rem",
                width: "100%",
                textAlign: "center"
            }}>
                here is your customized devo on <br />
                <span style={{ color: "#B8A826" }}>{quizState["q3"]}</span> through a{" "}
                <span style={{ color: "#CC532E" }}>{quizState["q1"]}</span> cultural lens.
            </h1>

            <div
                style={{
                    backgroundColor: "#1F297A",
                    minHeight: "50vh",
                    color: "white",
                    padding: "5vh 7vw",
                    borderRadius: "50% 50% 0 0 / 20%",
                    fontSize: "clamp(1rem, 1.2rem, 1.5rem)",
                    width: "100vw",
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    overflow: "auto",
                    maxHeight: "70vh",
                    '@media (max-width: 600px)': {
                        borderRadius: "50% 50% 0 0 / 10%",
                        padding: "4vh 5vw",
                        fontSize: "1rem",
                        maxHeight: "60vh"
                    }
                }}
            >
                <div style={{
                    maxWidth: "800px",
                    width: "100%",
                    padding: "0 2rem",
                    marginBottom: "4rem"
                }}>
                    <h2 style={{ fontSize: "1.5em", marginBottom: "1.5rem" }}>{devotional.title_devo}</h2>
                    <p style={{ fontStyle: "italic", marginBottom: "1.5rem" }}>{devotional.verse_devo}</p>
                    <p style={{ marginBottom: "1.5rem", textAlign: "left" }}>{devotional.content_devo}</p>
                    <p style={{ fontStyle: "italic" }}>{devotional.prayer_devo}</p>
                </div>
            </div>
        </div>
    );
}

function App() {
    return (
        <QuizProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage/>}/>
                    <Route path="/q1" element={<Question1/>}/>
                    <Route path="/q2" element={<Question2/>}/>
                    <Route path="/q3" element={<Question3/>}/>
                    <Route path="/completed" element={<Completed/>}/>
                </Routes>
            </Router>
        </QuizProvider>
    );
}

export {Completed};
export default App;