import React, { useContext, useEffect, useState } from "react";
import { AppState } from "../../App";
import QuestionCard from "./QuestionCard";
import axios from "../../utils/axiosConfig";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import AnswerPage from "../Answer/AnswerPage";
function Home() {
  const token = localStorage.getItem("token");
  const { user, setUser } = useContext(AppState);
  const [qdata, setqdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const ishome = true;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/question/all-questions", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        // console.log("Data fetched:", data);
        const sortedData = data.sort((a, b) => b.id - a.id);

        setqdata(sortedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
  }, [token]);

  // Filter questions using tags
  const filteredQuestions = qdata.filter((question) => {
    const tagsArray =
      typeof question.tag === "string" ? question.tag.split(",") : [];
    return tagsArray.some((tag) =>
      tag.toLowerCase().trim().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <section className="container">
        {ishome && (
          <>
            <div className="d-flex justify-content-between m-5">
              <div>
                <Link to={`/ask-question/`} className="btn btn-primary">
                  Ask question
                </Link>
              </div>
              <div>Welcome: {user?.username}</div>
            </div>
            {/* Search Input */}
            <div className="mb-3">
              <input
                style={{ width: "93%", borderRadius: "10px" }}
                type="text"
                className="p-2"
                placeholder="Search questions by tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && <h3>Search Results</h3>}
            <hr />
            {searchQuery &&
              (filteredQuestions.length > 0 ? (
                filteredQuestions.map((question) => (
                  <QuestionCard
                    key={question?.id}
                    title={question?.title}
                    askedby={question?.username}
                    qdesc={question?.description}
                    questionid={question?.questionid}
                  />
                ))
              ) : (
                <p>No matching questions found.</p>
              ))}

            <h3>All Questions</h3>
            <hr />
            <div>
              {qdata.map((question) => (
                <QuestionCard
                  key={question?.id}
                  title={question?.title}
                  askedby={question?.username}
                  qdesc={question?.description}
                  questionid={question?.questionid}
                />
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}

export default Home;
