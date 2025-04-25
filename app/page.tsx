"use client"
import Preloader from "../components/Preloader/Preloader";
import "../styles/sass/custom.scss";
import "../styles/sass/style.scss";
import Link from 'next/link';
import Contact from '../Components/Contact/Contact';
import Department from '../Components/Department/Department';
import About from '../Components/About/About';
import Iconbox from '../Components/Iconbox/Iconbox';
import TestimonialSlider from '../Components/Slider/TestimonialSlider';
import Accordion from '../Components/Accordion/Accordion';
import Hero12 from '../Components/Hero/Hero12';
import Footer from "../components/Footer/Footer";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Social from "../components/Social/Social";
import { Icon } from '@iconify/react';
const headerData = {
  logo: '/images/Nurse-ai-hub-(2).svg',
};

const footerData = {
  logo: '/images/logo-design.png',
  bgImg: '/images/footer-bg.png',
  subTitle:
    ' Revolutionizing learning and health with AI-powered solutions for your success.',
};

const heroData = {
  bgImg: 'images/hero-bg.jpg',
  bgShape: 'shape/hero-shape.png',
  sliderImages: [
    {
      img: 'images/hero-img.png',
    },
    {
      img: 'images/img22.png',
    },
   
  ],
  title: ['Crutches', 'Laboratory', 'Cardiology', 'Dentist', 'Neurology'],
};

const iconboxData = [
  {
    bg: 'purple',
    icon: 'icons/icon1.svg',
    title: 'Master Nursing Skills',
    subTitle:
      'Advance guidance to perfect your expertise.',
  },
  {
    bg: 'green',
    icon: 'icons/icon-3.jpeg',
    title: 'Exam Prep Made Easy',
    subTitle:
      'AI-driven tools for confident success.',
  },
  {
    bg: 'red',
    icon: 'icons/icon2.svg',
    title: '24/7 Smart Support',
    subTitle:
      'Guidance from AI and a 3D avatar nurse.',
  },
];

const aboutData = {
  title:
    'AI-Powered Platform to Accelerate Your Learning and Skill Development',
  subTitle:
    '  Our platform harnesses the power of AI to deliver tailored guidance and learning resources.With personalized insights and adaptive tools, we help you improve your skills and achieve success efficiently. Experience a smarter, more effective way to learn and grow with AI at the core of your journey.',

  avater: {
    img: 'images/avatar1.png',
    name: 'David',
    designation: 'Founder & Director',
  },
  timeTable: [
    {
      day: 'Provide AI-driven personalized guidence',
    },
    {
      day: 'Deliver real-time feedback and insights',
    },
    {
      day: 'Support efficient goal achievement',
    },
    {
      day: 'Offer a seamless learning experience',
    },
    
  ],
  contact: 'Nurse AI Hub',
};


const testimonialData = [
  {
    img: 'images/avatar2.png',
    name: 'Dr. Alex Carter',
    designation: 'Medical Consultant',
    subTitle:
      "AI is revolutionizing medical exam preparation, offering precise, customized support to help students succeed and improve patient care.",
  },
  {
    img: 'images/avatar3.png',
    name: 'Sarah Mitchell',
    designation: 'Clinical Training Specialist',
    subTitle:
      "AI is reshaping the way we prepare for medical exams, offering tailored learning paths that maximize understanding and boost exam success.",
  },
  {
    img: 'images/avatar4.png',
    name: 'John Davis',
    designation: 'Educational Technology Specialist',
    subTitle:
      "With AI-powered tools, we can provide a smarter approach to learning, enabling individuals to efficiently prepare for exams and enhance their professional skills.",
  },
 
];
const faqData = {
  title: 'Just Answer the Questions',
  img: 'images/faq-img.png',
  bgImg: 'shape/faq-bg.svg',
  faqItems: [
    {
      title: 'What is AI-powered health analysis?',
      content: `AI-powered health analysis uses advanced algorithms to process and interpret test results, providing more personalized, accurate, and efficient insights to help detect health conditions early and suggest preventive measures.`,
    },
    {
      title: 'How does AI improve medical test results?',
      content: `AI improves medical test results by analyzing large datasets with high accuracy and identifying patterns that might be missed by humans.`,
    },
    {
      title: 'Is AI safe to use for medical testing?',
      content: 'AI is safe for medical testing when implemented with strict regulatory compliance and ethical guidelines.',
    },
    {
      title: 'Can AI help with personalized health recommendations?',
      content: `AI assists in providing personalized health recommendations by analyzing individual health data and tailoring solutions accordingly.`,
    },
    {
      title: 'Can AI help with personalized health recommendations?',
      content: `AI assists in providing personalized health recommendations by analyzing individual health data and tailoring solutions accordingly.`,
    },
  ],
};





const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);
  return (
    <>
     {isLoading ? (
        <Preloader varient={3} />
      ) : (
        <>
          <div>
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
              <img src={headerData.logo} alt={headerData.logo} />
            </Link>
            <div className="st-main-header-left">
              <div className="st-nav">
                <ul
                  className={`st-nav-list st-onepage-nav ${mobileToggle ? 'd-block' : 'd-none'}`}
                >
                  <li>
                    <Link href="/" onClick={() => setMobileToggle(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                  <Link
                  href={{
                    pathname: "/login",
                    query: { callbackUrl: "http://localhost:3000/" },
                  }}
                 onClick={() => setMobileToggle(false)}
                  >
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
          {/* <Outlet /> */}
          <Hero12 data={heroData} />
          <Iconbox varient={3} data={iconboxData} />
          <About data={aboutData} />
          <Department />
          <hr />
          <TestimonialSlider data={testimonialData} />
         
          <Accordion data={faqData} />
          <Contact />
          <footer className={`st-site-footer  st-dynamic-bg flex items-center justify-center`}
              style={{ backgroundImage: `url(${footerData.bgImg})` }}>
        <div className="st-main-footer">
        <div className="container">
          <div className="row">
          
            
            <div className="col-lg-4">
              <div className="st-footer-widget">
              
              </div>
            </div>
            <div className="col-lg-4">
              <div className="st-footer-widget w-full flex items-center justify-center">
                <div className="st-text-field">
                  <img src={footerData.logo} alt={footerData.logo} className="h-[10rem]-" />
                  <div className="st-height-b25 st-height-lg-b25" />
                  <div className="st-footer-text">{footerData.subTitle}</div>
                  <div className="st-height-b25 st-height-lg-b25" />
                  <Social/>
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
          </div>
        </>
       )} 
      
    </>
  );
};

export default Home;
