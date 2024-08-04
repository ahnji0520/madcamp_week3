import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from './CustomArrows';
import FindCard from './FindCard';
import { fetchPopUps } from '../api/popUpApi';

const StyledSlider = styled(Slider)`
  .slick-list {
    padding: 0 1px; /* 슬라이더 양쪽에 패딩 추가 */
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const MultipleItemSlider2 = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const getCards = async () => {
      try {
        const data = await fetchPopUps();
        const filteredData = data.filter((card) => card.p_status !== '종료'); // p_status가 '종료'가 아닌 항목만 남김
        const sortedData = filteredData
          .sort((a, b) => new Date(a.p_enddate) - new Date(b.p_enddate)) // p_enddate 순으로 정렬
          .slice(0, 9); // 상위 9개만 추출
        setCards(sortedData);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    getCards();
  }, []);

  return (
    <StyledSlider {...settings}>
      {cards.map((card) => (
        <FindCard
          id={card.p_id}
          title={card.p_name}
          location={card.p_location}
          region={card.p_region}
          latitude={card.p_latitude}
          longtitude={card.p_longtitude}
          start_date={card.p_startdate}
          end_date={card.p_enddate}
          status={card.p_status}
          intro={card.p_intro}
          detail={card.p_detail}
          interest_cnt={card.p_interest}
          imageUrl={card.p_imageurl}
          simplelocation={card.p_simplelocation}
          category={card.p_category}
          hour={card.p_hour}
        />
      ))}
    </StyledSlider>
  );
};

export default MultipleItemSlider2;
