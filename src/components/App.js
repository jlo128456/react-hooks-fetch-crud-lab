import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";


function App() {
  const [page, setPage] = useState("List"); // Toggles between List and Form
  const [questions, setQuestions] = useState([]); // Manages the list of questions

  // Fetch questions from the server on load
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, []);

  // Add a new question to the state
  const handleAddQuestion = (newQuestion) => {
    setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
  };

  return (
    <main>
      {/* Navigation Bar */}
      <AdminNavBar onChangePage={setPage} />

      {/* Conditional Rendering */}
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList questions={questions} setQuestions={setQuestions} />
      )}
    </main>
  );
}

export default App;



