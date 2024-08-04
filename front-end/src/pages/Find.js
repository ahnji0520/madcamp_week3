import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/main_background1.jpg';
import PopUpDetail from './PopUpDetail';

import FindAll from '../components/FindAll';
import FindLocation from '../components/FindLocation';
import FindDate from '../components/FindDate';

import Footer from '../components/Footer';

const Container = styled.div`
  height: 330vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: repeat;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Title = styled.h1`
  @font-face {
    font-family: 'Cafe24Decobox';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Decobox.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 54px;
  padding-top: 120px;
  color: #ff5580;
`;

const CategoryContainer = styled.div`
  width: 1024px;
  margin: 0 auto;
  padding: 30px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const CategoryButton = styled.div`
  width: ${(props) => (props.isEmpty ? '90px' : '140px')};
  height: ${(props) => (props.isEmpty ? '90px' : '140px')};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 15px;
  @font-face {
    font-family: 'Cafe24Decobox';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Decobox.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 24px;
  color: white;
  background-color: ${(props) => props.bgColor};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 8px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, background-color 0.2s;

  &:hover {
    transform: scale(1.1);
  }

  &.inactive {
    background-color: #ccc;
  }
`;

const HorizontalLine = styled.div`
  position: absolute;
  width: 970px;
  height: 2px;
  top: 75px;
  background-color: #ff4c4c;
  z-index: 0;
`;

const Find = () => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const buttons = [
    { label: '', bgColor: '#F3D1F4', component: <></> },
    { label: 'ALL', bgColor: '#FDDE55', component: <FindAll /> },
    { label: 'LOCATION', bgColor: '#BAE5E5', component: <FindLocation /> },
    { label: 'DATE', bgColor: '#98D6EA', component: <FindDate /> },
    { label: '', bgColor: '#FFB4B4', component: <></> },
  ];

  const handleButtonClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <Container>
      <Title>FIND YOUR POPUP</Title>
      <CategoryContainer>
        {buttons.map((button, index) => (
          <CategoryButton
            key={index}
            bgColor={button.bgColor}
            isEmpty={button.label === ''}
            className={
              clickedIndex !== null && clickedIndex !== index ? 'inactive' : ''
            }
            onClick={() => handleButtonClick(index)}
          >
            {button.label}
          </CategoryButton>
        ))}
      </CategoryContainer>
      {/* <button onClick={openModal}>Open Modal</button> */}
      <PopUpDetail isOpen={modalIsOpen} onRequestClose={closeModal} />
      {clickedIndex !== null && buttons[clickedIndex].component}
      <Footer />
    </Container>
  );
};

export default Find;
