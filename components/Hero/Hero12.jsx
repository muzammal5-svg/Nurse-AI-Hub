"use client";
import { React } from 'react';
import HeroSlider from '../Slider/HeroSlider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// import TextTransition, { presets } from 'react-text-transition';


const Hero12 = ({ data }) => {
  const sliderImages = data.sliderImages;
  const title = data.title;
  const router = useRouter();
  return (
    <>
      <div className='st-height-b45 st-height-lg-b45' id='home' ></div>
      <div className="st-hero-wrap overflow-hidden st-gradient" id='home'>
        <div className="st-wave-animation st-white" />
        <div className="st-hero st-style1">
          <div className="container">
            <div className="st-hero-text st-white">
              <div className="st-height-b40 st-height-lg-b40" />
              <h1 className="st-hero-title cd-headline slide">
                Elevate your skills 
                with <br /> excellent
               <b>  Guidance</b> 
              </h1>
              <div className="st-hero-subtitle">
              Access expert resources and personalized tips to enhance <br /> your skills and achieve your goals.
              </div>
              <div className="st-hero-btn-group">
                  <Link
                  href={{
                    pathname: "/login",
                    query: { callbackUrl: "http://localhost:3000/" },
                  }}
                 onClick={() => setMobileToggle(false)}
                   className="st-btn st-style1 st-color5 st-smooth-move"
                  >
                     Let's Start
                  </Link>
             
              </div>
            </div>
          </div>
        </div>
        <HeroSlider data={sliderImages} />
      </div>
    </>
  );
};

export default Hero12;
