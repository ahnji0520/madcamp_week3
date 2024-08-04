import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import backgroundImage from '../images/main_background1.jpg';
import { logoutUser } from '../redux/actions/authActions';
import { TbStarFilled } from 'react-icons/tb';
import Footer from '../components/Footer';
import StickerBook from '../components/StickerBook';
import FindCard from '../components/FindCard';
import { Rnd } from 'react-rnd';
import {
  fetchInterestPopUps,
  fetchMyPopUps,
  fetchReviewPopUps,
} from '../api/popUpApi';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

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

const Box = styled.div`
  height: 330vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

const VerticalLine = styled.div`
  position: absolute;
  top: 125px;
  bottom: 200px;
  left: 18%; /* 원하는 위치에 맞게 조정하세요 */
  width: 5px;
  height: 15%;
  background-color: #b5c0d0;
  z-index: 10;
`;

const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 25px;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StickerBookButton = styled(TbStarFilled)`
  font-size: 80px;
  color: #478ccf;
  z-index: 20;
  margin-top: 105px;
  margin-left: 20px;
  border-radius: 50%;
  padding: 10px;

  &:hover {
    background: white;
  }
`;

const LogoutButton = styled.h1`
  border-radius: 15px;
  border: 1px solid #ccc;
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 18px;
  padding: 5px 10px;
  margin: 130px 0 0 0;
  cursor: pointer;
  z-index: 20;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Title = styled.h1`
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 54px;
  padding-top: 120px;
  color: #478ccf;
  text-align: left;
  margin-left: 30px;
`;

const WelcomeText = styled.h1`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 24px;
  text-align: left;
  color: #373a40;
  margin-top: 10px;
  margin-left: 30px;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: -10px;
`;

const Option = styled.h1`
  border-radius: 15px;
  border: 1px solid #ccc;
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  padding: 5px 10px;
  cursor: pointer;
  margin-right: 15px;
  z-index: 20;
  background-color: ${(props) => (props.selected ? '#e0e0e0' : 'transparent')};

  &:hover {
    background-color: #e0e0e0;
  }
`;

const StickerArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
`;

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 1000px;
  justify-content: center;
  margin-top: 20px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Freesentation-6SemiBold', sans-serif;

  &:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
`;

const MyPage = () => {
  const nickname = useSelector((state) => state.auth.u_nickname);
  const u_id = useSelector((state) => state.auth.u_id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stickers, setStickers] = useState([]);
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showStickerBook, setShowStickerBook] = useState(false);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [selectedOption, setSelectedOption] = useState('내 관심 팝업');

  const cardsPerPage = 12;

  useEffect(() => {
    fetchInterests();
  }, [u_id]);

  const fetchInterests = async () => {
    try {
      const data = await fetchInterestPopUps(u_id);
      setCards(data);
    } catch (error) {
      console.error('Error fetching interests:', error);
    }
  };

  const fetchReviews = async () => {
    try {
      const data = await fetchReviewPopUps(u_id);
      setCards(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const fetchMys = async () => {
    try {
      const data = await fetchMyPopUps(u_id);
      setCards(data);
    } catch (error) {
      console.error('Error fetching my popups:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/'); // Navigate to home page after logout
  };

  const handleSelectSticker = (sticker) => {
    const newSticker = {
      id: uuidv4(),
      name: sticker,
      top: 0,
      left: 0,
      width: 100,
      height: 100,
      angle: 0,
    };
    setStickers([...stickers, newSticker]);
    setShowStickerBook(false);
  };

  const handleOptionClick = (option) => {
    setCards([]);
    setCurrentPage(1);
    if (option === 'interestPopUps') {
      setSelectedOption('내 관심 팝업');
      fetchInterests();
    } else if (option === 'reviewedPopUps') {
      setSelectedOption('내가 참여한 팝업');
      fetchReviews();
    } else if (option === 'myPopUps') {
      setSelectedOption('나의 팝업');
      fetchMys();
    }
  };

  const handleDoubleClick = (id) => {
    setStickers(stickers.filter((sticker) => sticker.id !== id));
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(cards.length / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box>
      <VerticalLine />
      <StickerArea>
        {stickers.map((sticker) => (
          <Rnd
            key={sticker.id}
            default={{
              x: sticker.left,
              y: sticker.top,
              width: sticker.width,
              height: sticker.height,
            }}
            onDragStop={(e, d) => {
              const newStickers = stickers.map((s) => {
                if (s.id === sticker.id) {
                  return { ...s, left: d.x, top: d.y };
                }
                return s;
              });
              setStickers(newStickers);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              const newStickers = stickers.map((s) => {
                if (s.id === sticker.id) {
                  return {
                    ...s,
                    width: ref.style.width,
                    height: ref.style.height,
                    ...position,
                  };
                }
                return s;
              });
              setStickers(newStickers);
            }}
            onClick={() =>
              setSelectedSticker(
                selectedSticker === sticker.id ? null : sticker.id
              )
            }
            onDoubleClick={() => handleDoubleClick(sticker.id)}
            style={{
              border:
                sticker.id === selectedSticker ? '2px dashed #478ccf' : 'none',
            }}
          >
            <img
              src={sticker.name}
              alt={`sticker-${sticker.id}`}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </Rnd>
        ))}
      </StickerArea>
      <Container>
        <TopContainer>
          <TitleContainer>
            <Title>MY PAGE</Title>
            <StickerBookButton
              onClick={() => setShowStickerBook(!showStickerBook)}
            />
          </TitleContainer>
          <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
        </TopContainer>
        <WelcomeText>{nickname}님, 안녕하세요!</WelcomeText>
        <OptionContainer>
          <Option
            selected={selectedOption === '내 관심 팝업'}
            onClick={() => handleOptionClick('interestPopUps')}
          >
            내 관심 팝업
          </Option>
          <Option
            selected={selectedOption === '내가 참여한 팝업'}
            onClick={() => handleOptionClick('reviewedPopUps')}
          >
            내가 참여한 팝업
          </Option>
          <Option
            selected={selectedOption === '나의 팝업'}
            onClick={() => handleOptionClick('myPopUps')}
          >
            나의 팝업
          </Option>
        </OptionContainer>
        {showStickerBook && (
          <StickerBook onSelectSticker={handleSelectSticker} />
        )}
        <CardsContainer>
          {currentCards.map((card, index) => (
            <FindCard
              key={index}
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
        </CardsContainer>
        <Pagination>
          <PageButton
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            이전
          </PageButton>
          {pageNumbers.map((number) => (
            <PageButton
              key={number}
              onClick={() => setCurrentPage(number)}
              disabled={currentPage === number}
            >
              {number}
            </PageButton>
          ))}
          <PageButton
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            다음
          </PageButton>
        </Pagination>
      </Container>
      <Footer />
    </Box>
  );
};

export default MyPage;
