"use client";

import React, { useState } from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
// import Image1 from '/images/01smart-study.svg';
// import Image2 from '/images/02exam-mastery.svg';
// import Image3 from '/images/03-skills-lab.svg';
// import Image4 from '/images/04care-insight.svg';
// import Image5 from '/images/05live-mentor.svg';
// import Image6 from '/images/06quiz.svg';

const Department = () => {
  const [isActive, setIsActive] = useState(0);

  return (
    <section id="department">
      <div className="st-height-b120 st-height-lg-b80" />
      <SectionHeading title='We Offer Solutions'
        subTitle=
        "We Offer Solutions for Nurses in many domains!" />
      <div className="container">
        <div className="st-tabs st-fade-tabs st-style1">
          <ul className="st-tab-links st-style1 st-mp0">
            <li className={`st-tab-title ${isActive === 0 ? "active" : ""}`} onClick={() => setIsActive(0)}>
              <span className="st-blue-box">
              <img src="/images/01smart-study.svg" alt="Smart Study" />
                <span>Smart Study</span>
              </span>
            </li>
            <li className={`st-tab-title ${isActive === 1 ? "active" : ""}`} onClick={() => setIsActive(1)}>
              <span className="st-red-box">
              <img src="/images/02exam-mastery.svg" alt="Exam Mastery" />
                <span>Exam Mastery</span>
              </span>
            </li>
            <li className={`st-tab-title ${isActive === 2 ? "active" : ""}`} onClick={() => setIsActive(2)}>
              <span className="st-green-box">
              <img src="/images/03skills-lab.svg" alt="Skills Lab" />
                <span>Skill Lab</span>
              </span>
            </li>
            <li className={`st-tab-title ${isActive === 3 ? "active" : ""}`} onClick={() => setIsActive(3)}>
              <span className="st-dip-blue-box">
              <img src="/images/04care-insight.svg" alt="Care Insight" />
                <span>Care Insights</span>
              </span>
            </li>
            <li className={`st-tab-title ${isActive === 4 ? "active" : ""}`} onClick={() => setIsActive(4)}>
              <span className="st-orange-box">
              <img src="/images/05live-mentor.svg" alt="Live Mentor" />

                <span>Live Mentor</span>
              </span>
            </li>
            <li className={`st-tab-title ${isActive === 5 ? "active" : ""}`} onClick={() => setIsActive(5)}>
              <span className="st-gray-box">
              <img src="/images/06quiz.svg" alt="Quiz" />
                <span>Quiz Pro</span>
              </span>
            </li>
          </ul>
          <div className="st-height-b25 st-height-lg-b25" />
          <div className="tab-content">
            <div id="Crutches" className={`st-tab ${isActive === 0 ? "active" : ""}`}>
              <div className="st-imagebox st-style2">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-imagebox-img">
                      <img src="/images/crutches.png" alt="service" />
                    </div>
                    <div className="st-height-b0 st-height-lg-b30" />
                  </div>
                  <div className="col-lg-6">
                    <div className="st-vertical-middle">
                      <div className="st-vertical-middle-in">
                        <div className="st-imagebox-info">
                          <h2 className="st-imagebox-title">
                            Welcome to our <span>Smart Study</span>
                          </h2>
                          <h4 className="st-imagebox-subtitle">
                          AI-curated content for seamless learning{" "}
                          </h4>
                          <div className="st-imagebox-text">
                          Access customized study plans, interactive modules, and quick revision tools tailored to your learning needs.
                          </div>
                        </div>
                        {/* <div className="st-imagebox-btn">
                          <Link to=""
                            className="st-btn st-style1 st-size-medium st-color1"
                          >
                            Read More
                          </Link>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="X-ray" className={`st-tab ${isActive === 1 ? "active" : ""}`}>
              <div className="st-imagebox st-style2">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-imagebox-img">
                      <img src="/images/xray.png" alt="service" />
                    </div>
                    <div className="st-height-b0 st-height-lg-b30" />
                  </div>
                  <div className="col-lg-6">
                    <div className="st-vertical-middle">
                      <div className="st-vertical-middle-in">
                        <div className="st-imagebox-info">
                          <h2 className="st-imagebox-title">
                            Welcome to our <span>Exam Mastery</span>
                          </h2>
                          <h4 className="st-imagebox-subtitle">
                          AI-driven prep to ace exams effortlessly.{" "}
                          </h4>
                          <div className="st-imagebox-text">
                          Experience personalized practice tests, real-time feedback, and performance tracking for your nursing exams.
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="Pulmonary" className={`st-tab ${isActive === 2 ? "active" : ""}`}>
              <div className="st-imagebox st-style2">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-imagebox-img">
                      <img src="/images/pulmonary.png" alt="service" />
                    </div>
                    <div className="st-height-b0 st-height-lg-b30" />
                  </div>
                  <div className="col-lg-6">
                    <div className="st-vertical-middle">
                      <div className="st-vertical-middle-in">
                        <div className="st-imagebox-info">
                          <h2 className="st-imagebox-title">
                            Welcome to our <span>Skill Lab</span>
                          </h2>
                          <h4 className="st-imagebox-subtitle">
                          Hands-on training with AI-guided precision.{" "}
                          </h4>
                          <div className="st-imagebox-text">
                          Simulate clinical scenarios, practice critical procedures, and refine your skills in a virtual environment.
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="Cardiology" className={`st-tab ${isActive === 3 ? "active" : ""}`}>
              <div className="st-imagebox st-style2">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-imagebox-img">
                      <img src="/images/cardiology.png" alt="service" />
                    </div>
                    <div className="st-height-b0 st-height-lg-b30" />
                  </div>
                  <div className="col-lg-6">
                    <div className="st-vertical-middle">
                      <div className="st-vertical-middle-in">
                        <div className="st-imagebox-info">
                          <h2 className="st-imagebox-title">
                            Welcome to our <span>Care Insights</span>
                          </h2>
                          <h4 className="st-imagebox-subtitle">
                          Advanced analytics for patient care excellences{" "}
                          </h4>
                          <div className="st-imagebox-text">
                          Dive into AI-powered case studies, diagnostic tips, and care strategies for better outcomes.
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="DentalCare" className={`st-tab ${isActive === 4 ? "active" : ""}`}>
              <div className="st-imagebox st-style2">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-imagebox-img">
                      <img src="/images/dental-care.png" alt="service" />
                    </div>
                    <div className="st-height-b0 st-height-lg-b30" />
                  </div>
                  <div className="col-lg-6">
                    <div className="st-vertical-middle">
                      <div className="st-vertical-middle-in">
                        <div className="st-imagebox-info">
                          <h2 className="st-imagebox-title">
                            Welcome to our <span>Live Mentor</span>
                          </h2>
                          <h4 className="st-imagebox-subtitle">
                          3D avatar nurse for real-time guidance{" "}
                          </h4>
                          <div className="st-imagebox-text">
                          Interact with a virtual mentor for instant answers, study tips, and step-by-step skill demonstrations.
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="Neurology" className={`st-tab ${isActive === 5 ? "active" : ""}`}>
              <div className="st-imagebox st-style2">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="st-imagebox-img">
                      <img src="/images/neurology.png" alt="service" />
                    </div>
                    <div className="st-height-b0 st-height-lg-b30" />
                  </div>
                  <div className="col-lg-6">
                    <div className="st-vertical-middle">
                      <div className="st-vertical-middle-in">
                        <div className="st-imagebox-info">
                          <h2 className="st-imagebox-title">
                            Welcome to our <span>Quiz Pro</span>
                          </h2>
                          <h4 className="st-imagebox-subtitle">
                          Adaptive AI quizzes to sharpen your knowledge{" "}
                          </h4>
                          <div className="st-imagebox-text">
                          Challenge yourself with dynamic question sets, detailed explanations, and progress analytics.
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="st-height-b120 st-height-lg-b80" />
    </section>
  );
};

export default Department;
