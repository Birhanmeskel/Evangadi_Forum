import React, { useEffect, useState } from "react";
import "./AnswerPage.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";

const AnswerPage = (props) => {
  const { title, askedby, qdesc, questionid } = props;
  const { question_id } = useParams();
  console.log(question_id);
  const token = localStorage.getItem("token");
  const [answerdata, setAnswerdata] = useState([]);

  const [answer, setAnswer] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Answer Submitted:", { answer });
    setAnswer("");
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/answer/get-answer/${question_id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("Data fetched:", data);
        setAnswerdata(data.answers); // Set the fetched data correctly
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
  }, [question_id, token]);
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
          {answerdata?.map((answer) => (
            <>
              <div className="answer-text">
                <p>{answer?.content}</p>
                <span className="username">{answer?.user_name}</span>
              </div>
            </>
          ))}
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
