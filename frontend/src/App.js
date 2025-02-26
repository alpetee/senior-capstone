import React, {useEffect, useState} from 'react';
import { Button, Badge } from '@mantine/core';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

const globalQuizState = {}; // Stores quiz answers
console.log("beginning", globalQuizState);

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#1F297A', minHeight: '100vh', padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: 'white', fontSize: 55 }}>YOUR DAILY BREAD</h1>
      <h2 style={{ color: 'white'}}> Fill out this quick survey to recieve a customized devotion catered specially to you and your context. </h2>
      <Button
          variant="filled"
          size="lg"
            radius="999px" // Fully rounded!
        sx={{
        backgroundColor: '#ECEAD8',
        color: '#B8A926',
        fontWeight: 'bold', // button text bold
        '&:hover': { backgroundColor: '#B8A926', color: '#ECEAD8' }, // color changes at hover
      }}
        onClick={() => navigate('/q1')}>
        take quiz
      </Button>
    </div>
  );
}

function Question1() {
  const navigate = useNavigate();
  const [selectedChoice, setSelectedChoice] = useState(null); // Track selection

  const handleChoice = (choice) => {
    setSelectedChoice(choice); // Saves selected choice to state
    globalQuizState['q1'] = choice; // Stores choice in globalQuizState
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
      }}
    >
      {/* First Third: Title */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ color: '#CC532E', textAlign: 'center' }}>
          WHAT CULTURAL CONTEXT DO YOU PREFER FOR READING YOUR DEVOTIONAL?
        </h2>
      </div>

      {/* Second Third: Choices */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {['JAPAN', 'KOREA', 'LATIN/CENTRAL\n AMERICA', 'NORTH AMERICA'].map((option) => (
          <Button
            key={option}
            variant="filled"
            size="lg"
            radius="999px" // Fully rounded!
            sx={{
              backgroundColor: selectedChoice === option ? '#6B6317' : '#B8A826', // Change color if selected
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px',
              height: '80px',
                // width: '275px', // Make all buttons the same width

              '&:hover': { backgroundColor: '#6B6317' },
                textAlign: 'center', // Center the text inside the button
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
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '20px' }}>
        {/* Page Number */}
        <Badge
          sx={{
            backgroundColor: '#CC532E',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
            marginTop: '10px', // Add spacing above badge
          }}
        >
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
        fontSize: '32px', // Adjusted text size
        height: '570px',
        width: '260px',
        textAlign: 'center',
        borderRadius: '9999px', // Fully rounded pill shape
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start', // Align text to the top
        paddingTop: '0px', // Try adjusting this
        gap: '5px', // Reduces space between lines
        lineHeight: '1', // Compacts text vertically
        marginTop: '-90px', // Moves text higher
        position: 'relative',
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

function Question2() {
  const navigate = useNavigate();
  console.log("on q2", globalQuizState);

  const handleChoice = (choice) => {
    globalQuizState['q2'] = choice;
    navigate('/q3');
  };

    console.log("2", globalQuizState);

  return (
    <div style={{
      backgroundColor: '#1F297A',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px',
      position: 'relative',
    }}>
      {/* First Third: Question Title */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
          paddingBottom: '120px', // Adjusts spacing under the title?

      }}>
        <h2 style={{ color: '#FFFFFF', textAlign: 'center' }}>WHAT AREA OF THE BIBLE ARE YOU CURIOUS ABOUT?</h2>
      </div>

      {/* Second Third: Choices (Positioned Lower) */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end', // Push buttons lower
        paddingBottom: '10px', // Adjusts spacing above the badge
      }}>
        {['NEW \nTESTAMENT', 'PARELLELS \nBETWEEN \nTHE TWO', 'OLD \nTESTAMENT'].map((option) => (
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

      {/* Third Third: Page Number Badge (Always Visible at Bottom) */}
      <div style={{
        position: 'absolute', // Ensures it stays in place
        bottom: '90px', // Moves it up above the bottom edge
        left: '50%', // Centers it horizontally
        transform: 'translateX(-50%)', // Adjusts centering
        zIndex: 10, // Ensures it layers on top of buttons
      }}>
        <Badge
          sx={{
            backgroundColor: '#FFFFFF',
            color: 'black',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
          }}
        >
          2/3
        </Badge>
      </div>
    </div>
  );
}


function Question3() {
  const navigate = useNavigate();

  const handleChoice = async (choice) => {
    globalQuizState['q3'] = choice;

    try {
        await fetch('http://localhost:5000/api/submit/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(globalQuizState)
      });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }

    navigate('/completed');
  };

  return (
    <div style={{
      backgroundColor: '#B8A826',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Distribute sections evenly
    }}>
      {/* First Third: Question */}
      <div style={{
        flex: 1, // Equal height for each section
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <h2 style={{ color: '#ECEAD8', textAlign: 'center' }}>ARE YOU STRUGGLING WITH ANYTHING YOU WANT TO ADDRESS?</h2>
      </div>

      {/* Second Third: Choices */}
      <div style={{
        flex: 1, // Equal height for each section
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {['ANGER', 'SADNESS', 'LONLINESS', 'ANXIETY'].map((option) => (
          <Button
            key={option}
            variant="filled"
            size="lg"
            radius="999px" // Fully rounded!
            sx={{
              backgroundColor: '#CC532E',
              '&:hover': { backgroundColor: '#A84526' },
              color: 'white',
              fontWeight: 'bold',
              fontSize: '24px', // Bigger text
              height: '80px', // Bigger height
              width: '275px', // Make all buttons the same width
              textAlign: 'center', // Center the text inside the button
            }}
            onClick={() => handleChoice(option)}
          >
            {option.split('\n').map((text, index) => (
              <React.Fragment key={index}>
                {text}
                {index !== option.split('\n').length - 1 && <br />} {/* Add a <br /> except for the last part */}
              </React.Fragment>
            ))}
          </Button>
        ))}
      </div>

      {/* Third Third: Page Number */}
      <div style={{
        flex: 1, // Equal height for each section
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: '20px',
      }}>
        <Badge
          sx={{
            backgroundColor: '#CC532E',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '30px',
            fontWeight: 'bold',
            marginTop: '10px', // Add spacing above badge
          }}
        >
          3/3
        </Badge>
      </div>
    </div>
  );
}


function Completed() {
  const [devotional, setDevotional] = useState("Generating your devotional...");

  useEffect(() => {
    const fetchDevo = async () => {
      try {
          const response = await fetch("http://localhost:8000/api/generate-devo/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(globalQuizState),
        });

        const data = await response.json();
        setDevotional(data.devo);
      } catch (error) {
        console.error("Error fetching devotional:", error);
        setDevotional("There was an error generating your devotional.");
      }
    };

    fetchDevo();
  }, []);



  return (
    <div style={{ backgroundColor: "#DED1B9", minHeight: "100vh", padding: "50px", display: "flex", flexDirection: "column", alignItems: "left" }}>
      <h1 style={{ color: "white" }}>
        Here is your customized devo on <br />
        <span style={{ color: "#B8A826" }}>{globalQuizState["q3"]}</span> through a{" "}
        <span style={{ color: "#CC532E" }}>{globalQuizState["q1"]}</span> cultural lens.
      </h1>
      <p style={{ marginTop: "20px", color: "white", fontSize: "18px", maxWidth: "600px" }}>
        {devotional}
      </p>
    </div>
  );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/q1" element={<Question1 />} />
        <Route path="/q2" element={<Question2 />} />
        <Route path="/q3" element={<Question3 />} />
        <Route path="/completed" element={<Completed />} />
      </Routes>
    </Router>
  );
}

export { Completed }; // Named export
export default App; // Default export