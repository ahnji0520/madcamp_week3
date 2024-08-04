import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendarDay } from 'react-icons/fa';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import PopUpDetail from '../pages/PopUpDetail';
import { toggleFavoritePopUp } from '../api/popUpApi';
import {
  addFavoritePopup,
  removeFavoritePopup,
  setPopupInterestCount,
} from '../redux/actions/favoriteActions';

const FindCard = ({
  id,
  title,
  location,
  region,
  latitude,
  longtitude,
  start_date,
  end_date,
  status,
  intro,
  detail,
  interest_cnt,
  imageUrl,
  simplelocation,
  category,
  hour,
}) => {
  const u_id = useSelector((state) => state.auth.u_id);
  const favoritePopups = useSelector(
    (state) => state.favoritePopups.favoritePopups
  );
  const popupInterestCounts = useSelector(
    (state) => state.favoritePopups.popupInterestCounts
  );
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(interest_cnt);

  useEffect(() => {
    if (favoritePopups && id) {
      setIsFavorite(favoritePopups.includes(id));
    }
  }, [favoritePopups, id]);

  const handleFavoriteClick = async (event) => {
    event.stopPropagation(); // 부모 요소로의 클릭 이벤트 전파 방지
    try {
      const response = await toggleFavoritePopUp(u_id, id);
      if (response.u_interest) {
        dispatch(addFavoritePopup(id));
        dispatch(setPopupInterestCount(id, favoriteCount + 1));
      } else {
        dispatch(removeFavoritePopup(id));
        dispatch(setPopupInterestCount(id, favoriteCount - 1));
      }
      setFavoriteCount(response.count);
    } catch (error) {
      console.error('즐겨찾기 상태를 변경하는 중 오류가 발생했습니다.', error);
    }
  };

  const handleCardClick = () => {
    setIsModalOpen(true); // 카드 클릭 시 모달 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR')
      .replace(/\./g, '/')
      .replace(/ /g, '')
      .replace(/\/$/, '');
  };

  return (
    <>
      <CardContainer onClick={handleCardClick}>
        <Status status={status} />
        <CardImage src={imageUrl} />
        <TopContainer>
          <CardTitle>{title}</CardTitle>
          <FavoriteContainer onClick={handleFavoriteClick}>
            {isFavorite ? <FavoriteIconFilled /> : <FavoriteIcon />}
            <FavoriteCount>{popupInterestCounts[id] || 0}</FavoriteCount>
          </FavoriteContainer>
        </TopContainer>
        <TextContainer>
          <LocationIcon />
          <CardText>{simplelocation}</CardText>
        </TextContainer>
        <TextContainer>
          <DateIcon />
          <CardText>
            {formatDateString(start_date)} - {formatDateString(end_date)}
          </CardText>
        </TextContainer>
      </CardContainer>

      <PopUpDetail
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        id={id}
        title={title}
        location={location}
        region={region}
        latitude={latitude}
        longtitude={longtitude}
        start_date={start_date}
        end_date={end_date}
        status={status}
        intro={intro}
        detail={detail}
        interest_cnt={interest_cnt}
        imageUrl={imageUrl}
        simplelocation={simplelocation}
        category={category}
        hour={hour}
      />
    </>
  );
};

export default FindCard;

const CardContainer = styled.div`
  width: 300px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  padding-bottom: 10px;
  position: relative;
  border-radius: 15px;
  z-index: 800;

  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: 5px;
  border-radius: 15px 15px 0 0;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const CardTitle = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 18px;
  text-align: left;
  margin: 5px 10px;
`;

const FavoriteContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 12px;
`;

const FavoriteIcon = styled(MdFavoriteBorder)`
  color: #ff4c4c;
  font-size: 16px;
`;

const FavoriteCount = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 14px;
  color: #373a40;
  margin-left: 2px;
`;

const FavoriteIconFilled = styled(MdFavorite)`
  color: #ff4c4c;
  font-size: 16px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 5px;
`;

const LocationIcon = styled(FaLocationDot)`
  font-size: 12px;
  margin-left: 10px;
  color: #373a40;
`;

const DateIcon = styled(FaCalendarDay)`
  font-size: 12px;
  margin-left: 10px;
  color: #373a40;
`;

const CardText = styled.h1`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  text-align: left;
  margin-left: 3px;
`;

const Status = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: 20px;
  left: 20px;
  border-radius: 50%;
  background-color: #399918;
  border: 0.5px solid white;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => {
    switch (props.status) {
      case '예정':
        return '#F4CE14';
      case '진행중':
        return '#399918';
      case '종료':
        return '#C80036';
      default:
        return '#ffffff';
    }
  }};
`;
