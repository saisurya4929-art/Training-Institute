import React from "react";
import '../Styles/Hero-banner.css';



function Herobanner(){
    return(
        <section className="hero">
            <div className="hero-overlay">
                <div className="hero-contet">
                    <h1>Become a Job-Ready Full Stack Developer</h1>
                    <p>
                        Learn Java, Spring Boot, React JS and MERN Stack with real-time
                        projects and placement support.
                    </p>
                    <div className="hero-features">
                        <span>✔ Live Projects</span> 
                        <span>✔ Expert Trainers</span>
                        <span>✔ Placement Assistance</span>
                    </div>
                    <div className="hero-buttons">
                        <button className="btn-primary">Enroll Now</button>
                        <button className="btn-secondary">Free demo class</button>
                    </div>

  
                </div>
            </div>
        </section>
    
    );
}
export default Herobanner;

