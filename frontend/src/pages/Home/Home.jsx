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
  const ishome = true;

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/question/all-questions", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        console.log("Data fetched:", data);
        const sortedData = data.sort((a, b) => b.id - a.id);

        setqdata(sortedData);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    }
    fetchData();
  }, [token]);

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
            <h3>Questions</h3>
          </>
        )}

        <hr />
        <div>
          {qdata.map((question) => (
            <>
              <QuestionCard
                key={question?.id}
                title={question?.title}
                askedby={question.username}
                qdesc={question.description}
                questionid={question.questionid}
              />{" "}
            </>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
