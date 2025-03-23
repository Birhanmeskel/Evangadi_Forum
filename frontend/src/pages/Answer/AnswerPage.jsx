import React, { useState } from "react";
import "./AnswerPage.css";
import { IoPersonCircleOutline } from "react-icons/io5";

const AnswerPage = () => {
  const [answer, setAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Answer Submitted:", { answer });
    setAnswer("");
  };
  return (
    <div className="container">
      <div className="question-section">
        <h2 className="question-title">Question</h2>
        <p className="question-text">what's react-router-dom?</p>
        <a href="#" className="question-link">
          how does it work
        </a>
      </div>

      <div className="answer-section">
        <h3 className="answer-title">Answer From The Community</h3>
        <hr />
        <div className="answer-box">
          <IoPersonCircleOutline size={80} />

          <div className="answer-text">
            <p>it uses for routing purpose</p>
            <span className="username">misrak_Z</span>
          </div>
        </div>
      </div>

      {/* Answer Input Section */}
      <div className="ans-form-container">
        <h3>Answer The Top Question</h3>
        <p className="go-to-questions">Go to Question page</p>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Your Answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="ans-textarea"
            required
          ></textarea>
          <button type="submit" className="ans-submit-btn">
            Post Your Answer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AnswerPage;
