import React, { useEffect, useState } from "react";
import "./AnswerPage.css";
import { IoPersonCircleOutline } from "react-icons/io5";
import { Link, useLocation, useParams } from "react-router-dom";
import axios from "../../utils/axiosConfig";

const AnswerPage = () => {
  const location = useLocation();
  const { title, qdesc } = location?.state || {};
  const { question_id } = useParams();
  const questionid = question_id;

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const token = localStorage.getItem("token");
  const [answerdata, setAnswerdata] = useState([]);
  const [answer, setAnswer] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error on new submit
    setSuccess(null); // Reset success on new submit
    console.log("Answer Submitted:", { answer });

    // Send the answer to the backend
    try {
      const response = await axios.post(
        "/answer",
        {
          answer,
          questionid,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log("Answer Submitted:", response.data);
      setAnswer("");
      setSuccess(response.data.msg);
    } catch (err) {
      console.error("Error submitting Answer:", err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(`/answer/get-answer/${question_id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // console.log("Data fetched:", data);
        setAnswerdata(data.answers); // Set the fetched data correctly
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
  });
  return (
    <div className="container">
      <div className="question-section">
        <h2 className="question-title">{title}</h2>
        <p className="question-text">{qdesc}</p>
        <a href="#" className="question-link">
          how does it work
        </a>
      </div>

      <div className="answer-section">
        <h3 className="answer-title">Answer From The Community</h3>
        <hr />
        {answerdata?.map((answer) => (
          <div className="answer-box d-flex">
            <div className="answer-icon col-2">
              <IoPersonCircleOutline size={70} />
              <p className="username">{answer?.user_name}</p>
            </div>
            <div className="answer-text col-10">
              <p>{answer?.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Answer Input Section */}
      <div className="ans-form-container">
        <h3>Answer The Top Question</h3>
        <Link to={"/"} className="go-to-questions">
          Go to Question page
        </Link>
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
