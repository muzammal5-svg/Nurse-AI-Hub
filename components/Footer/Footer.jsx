"use client";

import React, { useEffect, useState } from 'react';
import Social from '../Social/Social';
import { Icon } from '@iconify/react';


const Footer = ({ data, varient }) => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const [scrollPosition, setScrollPosition] = useState(0);


  const handleScroll = () => {
    const currentPosition = window.scrollY;
    setScrollPosition(currentPosition);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={`st-site-footer st-sticky-footer st-dynamic-bg ${varient ? varient : ""}`}
      style={{ backgroundImage: `url(${data.bgImg})` }}>
      <div className="st-main-footer">
        <div className="container">
          <div className="row">
          
            
            <div className="col-lg-4">
              <div className="st-footer-widget">
              
              </div>
            </div>
            <div className="col-lg-4">
              <div className="st-footer-widget">
                <div className="st-text-field">
                  <img src={data.logo} alt={data.logo} className="st-footer-logo" />
                  <div className="st-height-b25 st-height-lg-b25" />
                  <div className="st-footer-text">{data.subTitle}</div>
                  <div className="st-height-b25 st-height-lg-b25" />
                  <Social
                   data={"links"}
                    />
                </div>
              </div>
            </div>
            <div className="col-lg-4">
             
            </div>
          </div>
        </div>
      </div>
      <div className="st-copyright-wrap">
        <div className="container">
          <div className="st-copyright-in">
            <div className="st-left-copyright">
              <div className="st-copyright-text">
                Copyright © {currentYear}. Nurse AI Hub
              </div>
            </div>
            <div className="st-right-copyright">
              <div id="st-backtotop" style={{ scale: `${scrollPosition >= 100 ? "1" : "0"}` }} onClick={scrollToTop}>
                <Icon icon="fa6-solid:angle-up" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
