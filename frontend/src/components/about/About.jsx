// src/components/About.jsx
import React from 'react';
// import './About.css'; // Import CSS file for styling

const About = () => {
    return (
        <div className="about-container">
            <header className="about-header">
                <h1>About Vangadi</h1>
                <p>Your trusted platform for community connections.</p>
            </header>
            
            <section className="about-content">
                <h2>Our Mission</h2>
                <p>At Vangadi, we are dedicated to fostering connections and building communities through innovative solutions and resources.</p>
                
                <h2>Our History</h2>
                <p>Founded in [Year], Vangadi started with a vision to [brief history]. Over the years, we have evolved into a comprehensive platform offering various services.</p>

                <h2>Core Values</h2>
                <ul>
                    <li>Community</li>
                    <li>Integrity</li>
                    <li>Support</li>
                    <li>Innovation</li>
                </ul>
            </section>

            <section className="team">
                <h2>Meet Our Team</h2>
                <div className="team-member">
                    <h3>John Doe</h3>
                    <p>Founder & CEO</p>
                    <p>John has a passion for building community and has over 10 years of experience in the industry.</p>
                </div>
                <div className="team-member">
                    <h3>Jane Smith</h3>
                    <p>Community Manager</p>
                    <p>Jane loves to connect with individuals and ensure that our members derive value from our platform.</p>
                </div>
            </section>

            <footer className="about-footer">
                <p>&copy; 2023 Vangadi. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;