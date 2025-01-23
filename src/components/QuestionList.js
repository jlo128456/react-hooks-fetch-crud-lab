import React from "react";

function QuestionList({ questions, setQuestions }) {
  // Handle deleting a question
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the question.");
      }

      // Update the state by removing the deleted question
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
      alert("Question deleted successfully!");
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("An error occurred while deleting the question. Please try again.");
    }
  };

  // Handle updating a question
  const handleUpdate = async (id, newCorrectIndex) => {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update the question.");
      }
  
      const updatedQuestion = await response.json();
  
      // Debugging the server response
      console.log("Updated question from server:", updatedQuestion);
  
      setQuestions((prevQuestions) =>
        prevQuestions.map((questions) =>
          questions.id === id
            ? { ...questions, correctIndex: updatedQuestion.correctIndex }
            : questions
            
            
        )
        
      );
      
    } catch (error) {
      console.error("Error updating question:", error);
    }
  };
  
  
  

  return (
    <section>
      <h1>Question List</h1>
      <ul>
        {questions.map((question) => (
          
          <li key={question.id}>
            <h3>{question.prompt}</h3>
            <ul>
              {question.answers.map((answer, index) => (
                <li key={index}>{answer}</li>
              ))}
            </ul>
            <label>
              Correct Answer:
              <select
                value={question.correctIndex}
                onChange={(e) =>
                  handleUpdate(question.id, parseInt(e.target.value, 10))
                }
              >
                {question.answers.map((answer, index) => (
                  <option key={index} value={index}>
                    {answer}
                  </option>
                ))}
              </select>
            </label>
            <button onClick={() => handleDelete(question.id)}>Delete Question</button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;

