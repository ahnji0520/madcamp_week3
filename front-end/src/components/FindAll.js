import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import FindCard from './FindCard';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoMdCheckmark } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';
import { fetchPopUps } from '../api/popUpApi';

// 초성 변환 함수
const convertToChosung = (str) => {
  const cho = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const ga = 44032;
  let result = '';

  for (let i = 0; i < str.length; i++) {
    const uni = str.charCodeAt(i);
    if (uni >= ga && uni <= 55203) {
      result += cho[Math.floor((uni - ga) / 588)];
    } else {
      result += str.charAt(i);
    }
  }
  return result;
};

const FindAll = () => {
  const [cards, setCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState('관심순');
  const [selectedCategory, setSelectedCategory] = useState('카테고리');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isActive, setIsActive] = useState(false);

  const cardsPerPage = 12;

  useEffect(() => {
    const getCards = async () => {
      try {
        const data = await fetchPopUps();
        setCards(data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    getCards();
  }, []);

  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      const statusMatch = isActive ? card.p_status === '진행중' : true;
      const categoryMatch =
        selectedCategory === '전체' || selectedCategory === '카테고리'
          ? true
          : card.p_category === selectedCategory;
      const searchMatch = searchQuery
        ? convertToChosung(card.p_name).includes(convertToChosung(searchQuery))
        : true;
      return statusMatch && categoryMatch && searchMatch;
    });
  }, [cards, isActive, selectedCategory, searchQuery]);

  const sortedAndFilteredCards = useMemo(() => {
    const sortedCards = [...filteredCards];
    if (sortOption === '관심순') {
      sortedCards.sort((a, b) => b.p_interest - a.p_interest);
    } else if (sortOption === '마감임박순') {
      sortedCards.sort((a, b) => new Date(a.p_enddate) - new Date(b.p_enddate));
    }
    return sortedCards;
  }, [filteredCards, sortOption]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = sortedAndFilteredCards.slice(
    indexOfFirstCard,
    indexOfLastCard
  );

  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(sortedAndFilteredCards.length / cardsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleCategoryDropdown = () => {
    setCategoryDropdownOpen((prev) => !prev);
  };

  const handleOptionSelect = (option) => {
    setSortOption(option);
    setDropdownOpen(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(searchTerm);
      setCurrentPage(1);
    }
  };

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  const categories = [
    '전체',
    '패션',
    '뷰티',
    'IT/전자제품',
    '식음료',
    '라이프스타일',
    '엔터테인먼트',
    '스포츠/아웃도어',
    '아동/유아',
    '자동차',
    '여행/관광',
    '문화/예술',
  ];

  return (
    <Box>
      <SearchContainer>
        <IoSearch style={{ marginRight: '10px' }} />
        <SearchInput
          type="text"
          placeholder="검색"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyPress={handleSearchKeyPress}
        />
        <EnterText>enter</EnterText>
      </SearchContainer>
      <OptionContainer>
        <StatusContainer active={isActive} onClick={handleClick}>
          <StatusText>현재 진행중인 팝업만 보기</StatusText>
          <StatusIcon />
        </StatusContainer>
        <StatusContainer onClick={toggleDropdown}>
          <StatusText>{sortOption}</StatusText>
          {dropdownOpen ? <UpIcon /> : <BottomIcon />}
          {dropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={() => handleOptionSelect('관심순')}>
                관심순 {sortOption === '관심순' && <CheckIcon />}
              </DropdownItem>
              <Divider />
              <DropdownItem onClick={() => handleOptionSelect('마감임박순')}>
                마감임박순 {sortOption === '마감임박순' && <CheckIcon />}
              </DropdownItem>
            </DropdownMenu>
          )}
        </StatusContainer>
        <StatusContainer onClick={toggleCategoryDropdown}>
          <StatusText>{selectedCategory}</StatusText>
          {categoryDropdownOpen ? <UpIcon /> : <BottomIcon />}
          {categoryDropdownOpen && (
            <DropdownMenu>
              {categories.map((category, index) => (
                <React.Fragment key={category}>
                  <DropdownItem onClick={() => handleCategorySelect(category)}>
                    {category} {selectedCategory === category && <CheckIcon />}
                  </DropdownItem>
                  {index < categories.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </DropdownMenu>
          )}
        </StatusContainer>
      </OptionContainer>
      <Container>
        <CardGrid>
          {currentCards.map((card) => (
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
        </CardGrid>
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
    </Box>
  );
};

export default FindAll;

const Box = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
`;

const SearchContainer = styled.div`
  display: flex;
  width: 500px;
  align-items: center;
  border-radius: 30px;
  border: 2px solid #ff4c4c;
  margin: 20px auto;
  background-color: white;
  padding: 10px 15px;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 18px;
  flex: 1;
  background: transparent;
`;

const EnterText = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  color: #ff4c4c;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 20px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1024px;
  position: relative;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
  max-width: 1200px;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 80px;
  position: relative;
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

const StatusContainer = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border-radius: 15px;
  padding: 7px 10px;
  font-size: 32px;
  color: #373a40;
  margin: 10px 10px 10px 0;
  position: relative;
  cursor: pointer;

  background-color: ${(props) => (props.active ? '#e0e0e0' : 'transparent')};
  border: ${(props) => (props.active ? '1px solid #399918' : '1px solid #ccc')};

  &:hover {
    background-color: #e0e0e0;
  }
`;

const StatusText = styled.h1`
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 14px;
`;

const StatusIcon = styled.div`
  width: 12px;
  height: 12px;
  background-color: #399918;
  border-radius: 50%;
  margin-left: 5px;
  margin-top: 2px;
  border: 1px solid white;
`;

const BottomIcon = styled(IoIosArrowDown)`
  font-size: 16px;
  margin-left: 5px;
`;

const UpIcon = styled(IoIosArrowUp)`
  font-size: 16px;
  margin-left: 5px;
`;

const CheckIcon = styled(IoMdCheckmark)`
  font-size: 16px;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  margin-top: 3px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 120px;
  z-index: 1200;
`;

const DropdownItem = styled.div`
  padding: 10px;
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  text-align: left;
  font-size: 14px;
  cursor: pointer;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
`;

const Divider = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid #ccc;
`;
