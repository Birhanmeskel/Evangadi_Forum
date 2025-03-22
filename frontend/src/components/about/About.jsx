// src/components/About.jsx
import React from "react";
// import './About.css'; // Import CSS file for styling

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About</h1>
        <p>Evangadi Networks</p>
      </header>

      <section className="about-content">
        <p>
          No matter what stage of life you are in, whether you're just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <br />
        <br />

        <p>
          Wheather you are willing to share your knowledge or you are just
          looking to Meet mentors o your own, please start by joining the
          network here.
        </p>

        <button onClick='button'>HOW IT WORKS</button>
      </section>
    </div>
  );
};

export default About;
