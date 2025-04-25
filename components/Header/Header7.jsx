"use client";

import  { useState, useEffect } from 'react';
import  Link  from 'next/link';

const Header7 = ({ data }) => {
  const { logo } = data;

  const [mobileToggle, setMobileToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const handleMobileToggle = () => {
    setMobileToggle(!mobileToggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth > 768) {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        setIsSticky(scrollPosition > windowHeight / 2);
      } else {

        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      style={{ position: 'fixed', width: '100%' }}
      className={`st-site-header st-style1 st-type1 ${isSticky ? 'sticky-header' : ''}`}
    >
      
      <div
        className="st-main-header"
        style={{
          backgroundColor: isSticky ? '#fff ' : '#e7f2fd',
          transition: 'background-color 0.5s ease-in-out',
        }}
      >
        <div className="container">
          <div className="st-main-header-in">
            <Link className="st-site-branding" href="/">
              <img src={logo} alt={logo} />
            </Link>
            <div className="st-main-header-left">
              <div className="st-nav">
                <ul
                  className={`st-nav-list st-onepage-nav ${mobileToggle ? 'd-block' : 'd-none'}`}
                >
                  <li>
                    <Link href="home" onClick={() => setMobileToggle(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="about" onClick={() => setMobileToggle(false)}>
                      Let's Start
                    </Link>
                  </li>
                  
                </ul>
                <div
                  className={`st-munu-toggle ${mobileToggle ? 'st-toggle-active' : ''
                    }`}
                  onClick={handleMobileToggle}
                >
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header7;
