import React from 'react';
import styled from 'styled-components';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

const Arrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: black;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #ccc;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px; /* 아이콘 크기 조절 */
`;

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <Arrow
      onClick={onClick}
      style={{ right: '-50px', bottom: '180px', position: 'absolute' }}
    >
      <IconWrapper>
        <FaAngleRight />
      </IconWrapper>
    </Arrow>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Arrow
      onClick={onClick}
      style={{ left: '-50px', top: '170px', position: 'absolute' }}
    >
      <IconWrapper>
        <FaAngleLeft />
      </IconWrapper>
    </Arrow>
  );
};

export { NextArrow, PrevArrow };
