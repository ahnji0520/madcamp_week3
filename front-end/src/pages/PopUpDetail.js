import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCalendarDay } from 'react-icons/fa';
import { IoTime } from 'react-icons/io5';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { RiPencilFill } from 'react-icons/ri';
import { TiStarFullOutline } from 'react-icons/ti';
import {
  toggleFavoritePopUp,
  fetchReviewsByPopUpId,
  submitReview,
} from '../api/popUpApi';
import {
  addFavoritePopup,
  removeFavoritePopup,
  setPopupInterestCount,
} from '../redux/actions/favoriteActions';
import { htmlToText } from 'html-to-text';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '1000px',
    height: '500px',
    backgroundColor: '#f0f0f0',
    borderRadius: '20px',
    zIndex: 2000,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1500,
  },
};

// 접근성 설정
Modal.setAppElement('#root');

const PopUpDetail = ({
  isOpen,
  onRequestClose,
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
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const u_id = useSelector((state) => state.auth.u_id);
  const u_nickname = useSelector((state) => state.auth.u_nickname);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(interest_cnt);
  const [reviews, setReviews] = useState([]);
  const [overallRating, setOverallRating] = useState('0.0/5');
  const favoritePopups = useSelector(
    (state) => state.favoritePopups.favoritePopups
  );
  const popupInterestCounts = useSelector(
    (state) => state.favoritePopups.popupInterestCounts
  );
  const dispatch = useDispatch();

  const handleReviewClick = async () => {
    setIsReviewVisible(true);
    try {
      const reviewsData = await fetchReviewsByPopUpId(id);
      setReviews(reviewsData);
      if (reviewsData.length > 0) {
        const ratingSum = reviewsData.reduce(
          (sum, review) => sum + review.grade,
          0
        );
        const averageRating = (ratingSum / reviewsData.length).toFixed(1);
        setOverallRating(`${averageRating}/5`);
      } else {
        setOverallRating('0.0/5'); // 리뷰가 없는 경우 0.0으로 설정
      }
    } catch (error) {
      console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

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

  const handleBackClick = () => {
    setIsReviewVisible(false);
  };

  const handlePencilClick = () => {
    setIsEditing(true);
  };

  const handleEditSubmit = async () => {
    try {
      await submitReview(id, u_id, u_nickname, rating, reviewText);
      setIsEditing(false);
      setRating(0);
      setReviewText('');
      // 리뷰를 다시 불러옵니다.
      const reviewsData = await fetchReviewsByPopUpId(id);
      setReviews(reviewsData);
      if (reviewsData.length > 0) {
        const ratingSum = reviewsData.reduce(
          (sum, review) => sum + review.grade,
          0
        );
        const averageRating = (ratingSum / reviewsData.length).toFixed(1);
        setOverallRating(`${averageRating}/5`);
      } else {
        setOverallRating('0.0/5'); // 리뷰가 없는 경우 0.0으로 설정
      }
    } catch (error) {
      console.error('리뷰를 제출하는 중 오류가 발생했습니다.', error);
    }
  };

  const formatDateString = (dateString) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR')
      .replace(/\./g, '/')
      .replace(/ /g, '')
      .replace(/\/$/, '');
  };

  const parseDetail = (detailString) => {
    if (!detailString) {
      return null;
    }

    // HTML 태그 제거하고 텍스트만 추출
    const plainText = htmlToText(detailString, {
      wordwrap: 130,
      // 줄바꿈을 위해 preserveNewlines 옵션을 설정
      preserveNewlines: true,
    });

    // 텍스트를 줄바꿈으로 분할
    const details = plainText.split(/\r?\n/);

    return details.reduce((acc, text, index) => {
      if (index > 0) {
        acc.push(<br key={`br-${index}`} />);
      }
      acc.push(<span key={index}>{text}</span>);
      return acc;
    }, []);
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <ModalContent>
        <CloseIcon onClick={onRequestClose} />
        {isReviewVisible ? (
          <>
            <TopContainer>
              <Title>{title}</Title>
              {isFavorite ? (
                <FavoriteIconFilled onClick={handleFavoriteClick} />
              ) : (
                <FavoriteIcon onClick={handleFavoriteClick} />
              )}
              <FavoriteCount>{popupInterestCounts[id] || 0}</FavoriteCount>
              <ReviewButton onClick={handleBackClick}>
                상세페이지로
              </ReviewButton>
            </TopContainer>
            <OverallRating>{overallRating}</OverallRating>
            {isEditing && (
              <EditReviewContainer>
                <StarsContainer>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      active={star <= rating}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </StarsContainer>
                <EditReviewText
                  placeholder="리뷰를 입력하세요..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <SubmitButton onClick={handleEditSubmit}>
                  리뷰 제출
                </SubmitButton>
              </EditReviewContainer>
            )}
            <ReviewContainer>
              {reviews.map((review, index) => (
                <ReviewItem key={index}>
                  <ReviewLeft>
                    <ReviewNickname>{review.u_nickname}</ReviewNickname>
                    <ReviewText>{review.review}</ReviewText>
                  </ReviewLeft>
                  <ReviewRight>
                    <ReviewRating>{review.grade}</ReviewRating>
                  </ReviewRight>
                </ReviewItem>
              ))}
            </ReviewContainer>
            {!isEditing && <PencilIcon onClick={handlePencilClick} />}
          </>
        ) : (
          <>
            <TopContainer>
              <Title>{title}</Title>
              {isFavorite ? (
                <FavoriteIconFilled onClick={handleFavoriteClick} />
              ) : (
                <FavoriteIcon onClick={handleFavoriteClick} />
              )}
              <FavoriteCount>{popupInterestCounts[id] || 0}</FavoriteCount>
              <ReviewButton onClick={handleReviewClick}>리뷰보기</ReviewButton>
            </TopContainer>
            <SubContainer>
              <Photo src={imageUrl} />
              <InfoContainer>
                <SubTitle>{intro}</SubTitle>
                <KeywordContainer>
                  <StatusContainer>
                    <StatusText>{status}</StatusText>
                    <StatusIcon status={status} />
                  </StatusContainer>
                  <Keyword>{category}</Keyword>
                </KeywordContainer>
                <IconTextContainer>
                  <FaLocationDot />
                  <LocationDate>위치</LocationDate>
                  <LocationDate2>{location}</LocationDate2>
                </IconTextContainer>
                <IconTextContainer>
                  <FaCalendarDay />
                  <LocationDate>운영기간</LocationDate>
                  <LocationDate2>
                    {formatDateString(start_date)} -{' '}
                    {formatDateString(end_date)}
                  </LocationDate2>
                </IconTextContainer>
                <IconTextContainer>
                  <IoTime />
                  <LocationDate>운영시간</LocationDate>
                  <LocationDate2>{hour}</LocationDate2>
                </IconTextContainer>
                <DetailInfoContainer>
                  <DetailInfo>{parseDetail(detail)}</DetailInfo>
                </DetailInfoContainer>
              </InfoContainer>
            </SubContainer>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PopUpDetail;

const CloseIcon = styled(IoClose)`
  font-size: 48px;
  color: black;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: white;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 10px 15px;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Title = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 42px;
`;

const FavoriteIcon = styled(MdFavoriteBorder)`
  color: #ff4c4c;
  font-size: 28px;
  margin: 16px 0 0 20px;
`;

const FavoriteIconFilled = styled(MdFavorite)`
  color: #ff4c4c;
  font-size: 28px;
  margin: 16px 0 0 20px;
`;

const FavoriteCount = styled.h1`
  font-family: 'Freesentation-7Bold', sans-serif;
  font-size: 24px;
  margin: 16px 0 0 5px;
  color: #373a40;
`;

const Photo = styled.img`
  cursor: pointer;
  width: 350px;
  height: 350px;
  margin-top: 20px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 20px;
  padding: 16px 20px 0 20px;
`;

const SubTitle = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 24px;
  cursor: pointer; /* 클릭 가능한 커서 추가 */
`;

const StatusContainer = styled.div`
  border-radius: 15px;
  border: 1px solid #000000;
  margin-right: 10px;
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 5px 10px;
`;

const StatusText = styled.h1`
  font-family: 'Freesentation-7Bold', sans-serif;
  font-size: 16px;
`;

const StatusIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 5px;
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

const KeywordContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
`;

const Keyword = styled.div`
  font-family: 'Freesentation-7Bold', sans-serif;
  font-color: white;
  background-color: #ccc;
  padding: 5px 10px;
  border-radius: 15px;
  margin-right: 10px;
  font-size: 16px;
`;

const IconTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

const LocationDate = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 16px;
  margin-left: 10px;
  margin-top: -2px;
`;

const LocationDate2 = styled.h1`
  font-family: 'Freesentation-1Thin', sans-serif;
  font-size: 16px;
  margin-left: 10px;
  margin-top: -2px;
`;

const DetailInfoContainer = styled.div`
  width: 515px;
  flex-grow: 1;
  background-color: #ccc;
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid #ffffff;
`;

const DetailInfo = styled.div`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 16px;
  margin: 10px;
`;

const ReviewButton = styled.div`
  font-family: 'Freesentation-7Bold', sans-serif;
  font-color: black;
  padding: 5px 10px;
  border-radius: 15px;
  border: 1px solid #ccc;
  margin: 15px 0 5px 15px;
  font-size: 16px;
  cursor: pointer;
`;

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

const ReviewLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
`;

const ReviewNickname = styled.h1`
  font-family: 'Freesentation-7Bold', sans-serif;
  font-size: 16px;
`;

const ReviewText = styled.p`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 14px;
`;

const ReviewRating = styled.h1`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 16px;
`;

const OverallRating = styled.div`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 40px;
  margin: 10px 0;
  color: #222831;
`;

const PencilIcon = styled(RiPencilFill)`
  background-color: #ff4c4c;
  color: white;
  padding: 10px;
  border-radius: 50%;
  font-size: 48px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 380px;
  left: 860px;
  z-index: 1;
`;

const EditReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 40px;
  margin-bottom: 20px;
`;

const EditReviewText = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 10px;
  resize: none;
`;

const SubmitButton = styled.button`
  font-family: 'Freesentation-7Bold', sans-serif;
  font-size: 16px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #ccc;
  color: black;
  cursor: pointer;
  margin-top: 10px;
`;

const StarsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px; /* 별점과 텍스트 입력 필드 사이의 간격 */
`;

const Star = styled(TiStarFullOutline)`
  cursor: pointer;
  color: ${(props) => (props.active ? '#FFDE4D' : '#686D76')};
  font-size: 24px;
`;
