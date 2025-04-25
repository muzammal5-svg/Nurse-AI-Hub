import React, { useEffect, useState } from 'react'
import { Link as ScrollLink } from 'react-scroll'
import { Link } from 'react-router-dom';

const Header6 = ({ data, varient }) => {
  const { logo } = data;

  const [mobileToggle, setMobileToggle] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isSticky, setIsSticky] = useState(false);

  const handleMobileToggle = () => {
    setMobileToggle(!mobileToggle);
  };

  useEffect(() => {
    const handleScroll = () => {
      const windowTop = window.scrollY || document.documentElement.scrollTop;

      if (windowTop >= headerHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      setLastScrollTop(windowTop);
    };

    const headerHeight = document.querySelector('.st-sticky-header').offsetHeight;


    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky, lastScrollTop]);

  return (
    <header className={`st-site-header st-style1 st-type2 st-color2 st-sticky-header ${isSticky ? "st-sticky-active" : ""}`}>
      <div className="st-main-header">
        <div className="container">
          <div className="st-main-header-in">
            <div className="st-main-header-left">
              <Link className="st-site-branding" to="">
                <img src={logo} alt={logo} />
              </Link>
            </div>
            <div className="st-main-header-center">
              <div className="st-nav">
                <ul className={`st-nav-list st-onepage-nav ${mobileToggle ? "d-block" : "none"}`}>
                  <li>
                    <ScrollLink to="home" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Home</ScrollLink>
                  </li>
                  <li>
                    <ScrollLink to="about" spy={true} duration={500} onClick={() => setMobileToggle(false)} >Let's Start</ScrollLink>
                  </li>
                  
                 
                </ul>
                <div className={`st-munu-toggle ${mobileToggle ? "st-toggle-active" : ""} `} onClick={handleMobileToggle}>
                  <span></span>
                </div>
              </div>
            </div>
            <div className="st-main-header-right">
              <ScrollLink
                to="appointment"
                className="st-btn st-style2 st-color3 st-size-medium"
              >
                +02 321 25 326
              </ScrollLink>
            </div>
          </div>
        </div>
      </div>
    </header>

  )
}

export default Header6
