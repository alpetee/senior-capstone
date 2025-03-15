import React, {useEffect, createContext, useContext, useState} from 'react';
import { Button, Badge, Grid, Flex, Container, Title, Text } from '@mantine/core';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';


// const globalQuizState = {}; // Stores quiz answers
const QuizContext = createContext();
// Provide Context
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

// Hook for consuming context
export function useQuiz() {
  return useContext(QuizContext);
}

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Prevent scrolling when component mounts
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when leaving the page
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
          minHeight: '100vh', // Fix for mobile height issues
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
          ta="clamp(2rem, 5vw, 3.8rem">
        YOUR DAILY BREAD
      </Title>
      <Text
        c="white"
        align="center"
        size="clamp(0.875rem, 5vw, 1.3rem)" // min, scale up, max
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
  const [selectedChoice] = useState(null); // just for making it darker
  const { updateQuizState } = useQuiz();

  useEffect(() => {
    // Prevent scrolling when component mounts
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when leaving the page
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleChoice = (choice) => {
    updateQuizState("q1", choice); // Saves selected choice to state
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
      {/* First section: Title */}
      <h2
          style={{
              color: '#CC532E',
              display: 'flex',
              alignItems: 'center',
              fontSize: 'clamp(1.5rem, 3vw, 2rem)', // maybe update depending on liking later
              maxWidth: '90%', // Prevents text overflow

              justifyContent: 'center'
      }}>
          WHAT CULTURAL CONTEXT DO YOU PREFER FOR READING YOUR DEVOTIONAL?
      </h2>

      {/* Second section: Choices */}
      <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
      }}>
        {['JAPAN', 'KOREA', 'LATIN/CENTRAL\n AMERICA', 'NORTH AMERICA'].map((option) => (
          <Button
            key={option}
            variant="filled"
            size="lg"
            radius="999px" // Fully rounded!
            sx={{
                backgroundColor: selectedChoice === option ? '#6B6317' : '#B8A826',
                color: 'white',
              fontWeight: 'bold',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)', // Scales text dynamically
                height: 'clamp(5rem, 7vw, 15rem)', // Scales button height
                width: 'clamp(2rm, 10vw, 5rm)', // Dynamic button width
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
          {index !== option.split('\n').length - 1 && <br />} {/* Add a <br /> except for the last part */}
        </React.Fragment>
      ))}          </Button>
        ))}
      </div>

      {/* Third Third: Page Number */}
      <div
          style={{
              position: 'absolute', // Position it relative to the viewport
              left: '50%', // Center it horizontally
              transform: 'translateX(-50%)', // Ensures perfect centering
              bottom: 'min(5vh, 80px)', // Prevents it from going too high on zoom
        }}>
          {/* Page Number */}
        <Badge
          sx={{
            backgroundColor: '#CC532E',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 'clamp(0.8rem, 4vw, .8rem)', // Dynamic font size (scales based on viewport width)
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
        height: 'clamp(40vh, 76vh, 85vh)', //40vh, 55vh, 60vh
        width: 'clamp(16vh, 20vw, 25vw)',
        textAlign: 'center',
        borderRadius: '9999px', // Fully rounded pill shape
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align text to the top
        lineHeight: '1', // Compacts text vertically
        position: 'relative',
              '@media (max-width: 600px)': { height: '40vh' }, // Way smaller on mobile

      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function Question2() {
  const navigate = useNavigate();
  const [selectedChoice] = useState(null); // just for making it darker
  const { updateQuizState } = useQuiz();

  useEffect(() => {
    // Prevent scrolling when component mounts
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      // Re-enable scrolling when leaving the page
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, []);

  const handleChoice = (choice) => {
    updateQuizState("q2", choice); // Saves selected choice to state
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
      {/* First section: Title */}
      <h2
          style={{
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
                // marginTop: '20vh', // Lower the heading

              fontSize: 'clamp(1.5rem, 3vw, 2rem)', // maybe update depending on liking later
              maxWidth: '90%', // Prevents text overflow
             marginTop: 'min(13vh)', // Pushes it lower dynamically

              justifyContent: 'center'
      }}>
          WHAT BIBLE AREA ARE YOU CURIOUS ABOUT?
      </h2>
      {/* Second Third: Choices (Positioned Lower) */}
      <div style={{
        // flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end', // Push buttons lower
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

      {/* Third Third: Page Number */}
      <div
          style={{
              position: 'absolute', // Position it relative to the viewport
              left: '50%', // Center it horizontally
              transform: 'translateX(-50%)', // Ensures perfect centering
              bottom: 'min(5vh, 80px)', // Prevents it from going too high on zoom
        }}>
          {/* Page Number */}
        <Badge
          sx={{
            backgroundColor: '#FFFFFF',

            color: '#1F297A',
            fontWeight: 'bold',
            fontSize: 'clamp(0.8rem, 4vw, .8rem)', // Dynamic font size (scales based on viewport width)
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
  const [selectedChoice, setSelectedChoice] = useState(null); // Add state

  const handleChoice = async (choice) => {
    setSelectedChoice(choice); // Update state when user selects an option
    updateQuizState("q3", choice);

    try {
      await fetch("http://localhost:5000/api/submit/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...quizState, q3: choice }), // Ensure updated state is sent
      });
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }

    navigate("/completed");
  };

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
      {/* Title */}
      <h2
        style={{
          color: "#ECEAD8",
          fontSize: "clamp(1.5rem, 3vw, 2rem)",
          maxWidth: "90%",
        }}
      >
        ARE YOU STRUGGLING WITH ANYTHING YOU WANT TO ADDRESS?
      </h2>

      {/* Second section: Choices */}
      <div
          style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              // width? still figuring out
      }}>
        {["ANXIETY", "LONLINESS", "DOUBT", "NOTHING SPECIFIC"].map((option) => (
          <Button
            key={option}
            variant="filled"
            size="lg"
            radius="999px" // Fully rounded!
            sx={{
                backgroundColor: selectedChoice === option ? '#A84526' : '#CC532E',
                color: 'white',
              fontWeight: 'bold',
              fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)', // Scales text dynamically
                height: 'clamp(5rem, 7vw, 15rem)', // Scales button height
                width: 'clamp(2rm, 10vw, 5rm)', // Dynamic button width
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
          {index !== option.split('\n').length - 1 && <br />} {/* Add a <br /> except for the last part */}
        </React.Fragment>
      ))}          </Button>
        ))}
      </div>




      {/* Page Number */}
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
    const {quizState} = useQuiz();
    const [devotional, setDevotional] = useState("Generating your devotional..."); // text while there is no devotional response

    useEffect(() => {
        const fetchDevo = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/generate-devo/", {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(quizState),
                });

                const data = await response.json();
                setDevotional(data.devo); // unresolved varible?
            } catch (error) {
                console.error("Error fetching devotional:", error);
                setDevotional("There was an error generating your devotional.");
            }
        };

        fetchDevo();
    }, [quizState]);


    return (
        <div
            style={{
                backgroundColor: "#DED1B9",
                minHeight: "200vh",
                padding: "5vh", // Responsive padding
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                position: "relative",
            }}
        >
            <h1 style={{
                color: "white",
                fontSize: "clamp(1.5rem, 4vw, 5vh)", // title sizing.
            }}>
                here is your customized devo on <br/>
                <span style={{color: "#B8A826"}}>{quizState["q3"]}</span> through a{" "}
                <span style={{color: "#CC532E"}}>{quizState["q1"]}</span> cultural lens.
            </h1>

            <div
                style={{

                    backgroundColor: "#1F297A",
                    minHeight: "clamp(150vh, 180vh, 190vh)",
                    color: "white",
                    padding: "clamp(3vh, 5vh, 7vh) clamp(4vw, 6vw, 8vw)",
                   borderRadius: "100% 100% 0 0", // Creates an arch effect
                    fontSize: "clamp(1.5vh, 2vh, 2.5vh)",
                    height: "clamp(40vh, 50vh, 60vh)", // Adjust height of the arch
                    width: "clamp(90vw, 100vw, 120vw)", // Make it fill the screen width
                    position: "absolute", // Positions it at the bottom
                    bottom: "0", // Anchors it to the bottom
                    left: "50%", // Centers it horizontally
                    transform: "translateX(-50%)", // Ensures proper centering
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    boxSizing: "border-box",
                    overflow: "hidden", // makes sure text doesn't overflow
                    wordWrap: "break-word", // breaks long words if necessary
                whiteSpace: "normal", // Ensures text wraps normally
                    '@media (max-width: 600px)': { borderRadius: "5px 5px 0 0" },  // working on getting the round right for mobile. should be changed to percents eventually.
}}
            >
                {devotional}
                <Button
                    variant="filled"
                    size="lg"
                    radius="999px"
                    sx={{
                        backgroundColor: "#B8A926",
                        color: "#ECEAD8",
                        fontWeight: "bold",
                        "&:hover": {backgroundColor: "#ECEAD8", color: "#B8A926"},
                        position: 'fixed',
                        bottom: "10vh", // Add some space from the bottom
                    }}
                >
                    save
                </Button>
            </div>
        </div>
        // <div
        //     style={{
        //         backgroundColor: "#DED1B9",
        //         minHeight: "100vh",
        //         padding: "50px",
        //         display: "flex",
        //         flexDirection: "column",
        //         alignItems: "flex-start",
        //     }}
        // >
        //     <h1 style={{color: "white"}}>
        //         here is your customized devo on <br/>
        //         <span style={{color: "#B8A826"}}>{quizState["q3"]}</span> through a{" "}
        //         <span style={{color: "#CC532E"}}>{quizState["q1"]}</span> cultural lens.
        //     </h1>
        //
        //     <div
        //         style={{
        //             backgroundColor: "#1F297A",
        //             color: "white",
        //             padding: "20px 30px",
        //             borderRadius: "9999px", // Fully rounded edges
        //             fontSize: "15px",
        //             height: "180vh", // Set to half of the page height
        //             width: "188vh", // Make it fill the width
        //             display: "flex",
        //             flexDirection: "column", // Stack content vertically
        //             justifyContent: "space-between", // Distribute space between the content and the button
        //             alignItems: "center", // Center content horizontally
        //             textAlign: "center", // Ensure the text is centered
        //             wordWrap: "break-word", // Ensure text wraps if it overflows
        //             overflow: "hidden", // Hide overflow if the text exceeds
        //             boxSizing: "border-box", // Ensure padding doesn't push content outside
        //             marginTop: "45px", // Buffer above curve
        //             paddingTop: "220px", // Additional buffer space on top
        //             paddingRight: "220px",
        //             paddingLeft: "220px",
        //             paddingBottom: "220px",
        //         }}
        //     >
        //         {devotional}
        //         <Button
        //             variant="filled"
        //             size="lg"
        //             radius="999px" // Fully rounded!
        //             sx={{
        //                 backgroundColor: '#B8A926',
        //                 color: '#ECEAD8',
        //                 fontWeight: 'bold', // Button text bold
        //                 '&:hover': {backgroundColor: '#ECEAD8', color: '#B8A926'}, // Color changes at hover
        //             }}
        //         >
        //             save
        //         </Button>
        //     </div>
        // </div>
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

export {Completed}; // Named export
export default App; // Default export