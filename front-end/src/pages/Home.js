import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import backgroundImage from '../images/main_background1.jpg';
import MultipleItemSlider from '../components/MultipleItemSlider';
import MultipleItemSlider2 from '../components/MultipleItemSlider2';
import Footer from '../components/Footer';
import { FaRobot } from 'react-icons/fa6';
import ChatBot from '../components/ChatBot';
import star from '../images/star.png';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const popUp = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
  100% {
    transform: scale(1);
  }
`;

const Container1 = styled.div`
  height: 65vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Container2 = styled.div`
  display: flex;
  height: 70vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  flex-direction: column;
  position: relative;
  padding: 20px;
`;

const Container3 = styled.div`
  display: flex;
  height: 90vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  flex-direction: column;
  position: relative;
  padding: 20px;
  position: relative;
  align-items: center;
`;

const PopUpContainer = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 0 20px;
`;

const BannerContainer = styled.div`
  height: 15vh;
  background-color: #ff4c4c;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`;

const MarqueeText = styled.h1`
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 48px;
  color: #fff8db;
  white-space: nowrap;
  display: inline-block;
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: 970px;
  height: 1px;
  background-color: #ff4c4c;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const Logo1 = styled.h1`
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 120px;
  margin-top: 125px;
  color: #000;
  animation: ${popUp} 1s ease-out;
  z-index: 1;
`;

const Logo2 = styled.h1`
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 200px;
  color: #000;
  animation: ${popUp} 1.5s ease-out;
  z-index: 1;
`;

const SubTitle = styled.h1`
  font-size: 20px;
  text-align: left;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  color: #ff4c4c;
  width: fit-content;
  padding: 5px 10px;
  border-radius: 15px;
`;

const FloatingRobot = styled(FaRobot)`
  position: fixed;
  bottom: 30px;
  right: 30px;
  font-size: 60px;
  color: #ff4c4c;
  cursor: pointer;
  transition: transform 0.3s, color 0.3s;

  &:hover {
    transform: scale(1.1);
    color: #d32f2f;
  }
`;

const ChatBotContainer = styled.div`
  position: fixed;
  bottom: 320px;
  right: 410px;
  z-index: 1000;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const StarImage = styled.img`
  position: absolute;
  bottom: 300px;
  right: 800px;
  width: 400px;
  height: 400px;
`;

const TEXT = 'TELL THE WORLD WHAT YOU INTEND TO DO, BUT FIRST SHOW IT';

const Home = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isChatBotVisible, setIsChatBotVisible] = useState(false);
  const [isStarVisible, setIsStarVisible] = useState(false);
  const container2Ref = useRef(null);

  useLayoutEffect(() => {
    const timeline = gsap.timeline({ repeat: -1, paused: isPaused });
    timeline
      .to('#marquee-text', { duration: 60, xPercent: -100, ease: 'none' })
      .set('#marquee-text', { xPercent: 0 });

    return () => {
      timeline.kill();
    };
  }, [isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    gsap.globalTimeline.pause();
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    gsap.globalTimeline.resume();
  };

  const handleRobotClick = () => {
    setIsChatBotVisible(!isChatBotVisible);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStarVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (container2Ref.current) {
      observer.observe(container2Ref.current);
    }

    return () => {
      if (container2Ref.current) {
        observer.unobserve(container2Ref.current);
      }
    };
  }, []);

  return (
    <>
      <Container1>
        <HorizontalLine />
        <Logo1>POPIT</Logo1>
        <Logo2>UP!</Logo2>
      </Container1>
      <BannerContainer
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          id="marquee-container"
          style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
          <MarqueeText id="marquee-text">
            {TEXT} {TEXT} {TEXT} {TEXT}
          </MarqueeText>
        </div>
      </BannerContainer>
      <Container2>
        <PopUpContainer>
          <SubTitle>추천수 최다! 인기 팝업</SubTitle>
          <MultipleItemSlider />
        </PopUpContainer>
      </Container2>
      <Container3>
        <PopUpContainer>
          <SubTitle>서두르세요! 종료임박 팝업</SubTitle>
          <MultipleItemSlider2 />
        </PopUpContainer>
        <Footer />
      </Container3>
      <FloatingRobot onClick={handleRobotClick} />
      {isChatBotVisible && (
        <ChatBotContainer>
          <ChatBot />
        </ChatBotContainer>
      )}
    </>
  );
};

export default Home;
