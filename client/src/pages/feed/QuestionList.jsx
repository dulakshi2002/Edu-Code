import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]); // State to hold the list of questions
  const [filter, setFilter] = useState(''); // State to hold the selected programming language filter
  const navigate = useNavigate(); // useNavigate hook to programmatically navigate to other routes

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/questions/questions');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setQuestions(data); // Update the state with the fetched data
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    };

    fetchQuestions(); // Call the async function to fetch data
  }, []); // Empty dependency array means this useEffect runs only once after the initial render

  // Filter the questions based on the selected programming language
  const filteredQuestions = filter
    ? questions.filter((question) => question.programmingLanguages.includes(filter))
    : questions;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6">All Questions</h1>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700" htmlFor="languageFilter">
          Filter by Programming Language:
        </label>
        <select
          id="languageFilter"
          onChange={(e) => setFilter(e.target.value)} // Update the filter state when a new option is selected
          value={filter} // Ensure the select value is controlled by state
          className="mt-2 block w-32 p-2 border border-gray-300 rounded-md shadow-sm"
        >
          <option value="">All</option>
          <option value="JavaScript">JavaScript</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          {/* Add other options as needed */}
        </select>
      </div>
      {filteredQuestions.length > 0 ? (
        <ul className="space-y-4">
          {filteredQuestions.map((question) => (
            <li key={question._id} className="p-4 bg-gray-100 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{question.name}</h3>
              <p className="text-gray-700">{question.description}</p>
              <p className="text-gray-600">
                Languages: {question.programmingLanguages.join(', ')}
              </p>
              <p className="text-gray-500">
                Comments: {question.comments ? question.comments.length : 0} {/* Display comment count */}
              </p>
              <button
                onClick={() => navigate(`/questions/${question._id}`)} // Navigate to the detail page for the selected question
                className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No questions found.</p> // Message if no questions match the filter
      )}
    </div>
  );
};

export default QuestionList;
