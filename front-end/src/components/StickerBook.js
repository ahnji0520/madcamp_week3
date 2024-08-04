import React from 'react';
import styled, { keyframes } from 'styled-components';
import acaiBowl from '../images/acai_bowl.png';
import angel from '../images/angel.png';
import balloon from '../images/balloon.png';
import band from '../images/band.png';
import baseball from '../images/baseball.png';
import be_original from '../images/be_original.png';
import bowling from '../images/bowling.png';
import cake from '../images/cake.png';
import call_me from '../images/call_me.png';
import camera from '../images/camera.png';
import car from '../images/car.png';
import cd from '../images/cd.png';
import cherry_coke from '../images/cherry_coke.png';
import cherry from '../images/cherry.png';
import chocolate from '../images/chocolate.png';
import cigar from '../images/cigar.png';
import cinema from '../images/cinema.png';
import coke from '../images/coke.png';
import diptyque from '../images/diptyque.png';
import dollar from '../images/dollar.png';
import dolphin from '../images/dolphin.png';
import flower_patch from '../images/flower_patch.png';
import flower from '../images/flower.png';
import flower2 from '../images/flower2.png';
import guitar from '../images/guitar.png';
import hat from '../images/hat.png';
import honey from '../images/honey.png';
import ice_cream from '../images/ice_cream.png';
import key from '../images/key.png';
import map from '../images/map.png';
import memo from '../images/memo.png';
import moon from '../images/moon.png';
import palette from '../images/palette.png';
import pearl from '../images/pearl.png';
import prada from '../images/prada.png';
import pretzel from '../images/pretzel.png';
import ribbon from '../images/ribbon.png';
import shell from '../images/shell.png';
import shopping from '../images/shopping.png';
import sneakers from '../images/sneakers.png';
import toy_dinosaur from '../images/toy_dinosaur.png';

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const StickerContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  background-color: #f0ebe3;
  border-left: 7px solid #b5c0d0;
  border-top: 7px solid #b5c0d0;
  border-bottom: 7px solid #b5c0d0;
  border-radius: 15px;
  padding: 10px;
  position: absolute;
  top: 100px; /* 위치 조정 필요 */
  right: 0; /* 위치 조정 필요 */
  z-index: 1000;
  width: 400px;
  height: 600px;
  overflow-y: auto;
  overflow-x: hidden;
  animation: ${slideInFromRight} 0.5s ease-out;
`;

const Title = styled.h1`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 32px;
  text-align: left;
  color: #ff4c4c;
  padding: 20px;
`;

const Sticker = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px;
  cursor: pointer;
`;

const StickerBook = ({ onSelectSticker }) => {
  const stickers = [
    acaiBowl,
    angel,
    balloon,
    band,
    baseball,
    be_original,
    bowling,
    cake,
    call_me,
    camera,
    car,
    cd,
    cherry_coke,
    cherry,
    chocolate,
    cigar,
    cinema,
    coke,
    diptyque,
    dollar,
    dolphin,
    flower_patch,
    flower,
    flower2,
    guitar,
    hat,
    honey,
    ice_cream,
    key,
    map,
    memo,
    moon,
    palette,
    pearl,
    prada,
    pretzel,
    ribbon,
    shell,
    shopping,
    sneakers,
    toy_dinosaur,
  ];

  return (
    <StickerContainer>
      <Title>STICKER BOOK</Title>
      {stickers.map((sticker, index) => (
        <Sticker
          key={index}
          src={sticker}
          alt={`sticker-${index}`}
          onClick={() => onSelectSticker(sticker)}
        />
      ))}
    </StickerContainer>
  );
};

export default StickerBook;
