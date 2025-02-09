import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Make sure you're calling the correct URL for the backend
    fetch('/api/homepage/')

      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<h1>{message || "loading..."}</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
