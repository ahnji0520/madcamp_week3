import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';
import moment from 'moment';
import FindCard2 from './FindCard2';
import { fetchPopUps, fetchPopUpsByDate } from '../api/popUpApi';

const FindDate = () => {
  const [date, setDate] = useState(new Date());
  const [cards, setCards] = useState([]);

  const getCardsByDate = async (selectedDate) => {
    try {
      const data = await fetchPopUpsByDate(selectedDate);
      console.log(data);
      const sortedData = data.sort((a, b) => b.p_interest - a.p_interest);
      setCards(sortedData);
    } catch (error) {
      console.error('이벤트를 가져오는 중 오류가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    getCardsByDate(date); // 컴포넌트가 처음 렌더링될 때 오늘 날짜의 이벤트를 가져옴
  }, [date]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    getCardsByDate(newDate); // 날짜가 변경될 때마다 해당 날짜의 이벤트를 가져옴
  };

  return (
    <Container>
      <CalendarContainer>
        <StyledCalendarWrapper>
          <StyledCalendar
            value={date}
            onChange={handleDateChange}
            formatDay={(locale, date) => moment(date).format('D')} // 일 제거 숫자만 보이게
            formatYear={(locale, date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
            showNeighboringMonth={false} // 전달, 다음 달 날짜 숨기기
            next2Label={null} // +1년 & +10년 이동 버튼 숨기기
            prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
            minDetail="year" // 10년 단위 년도 숨기기
          />
        </StyledCalendarWrapper>
      </CalendarContainer>
      <CardContainer>
        {cards.map((card) => (
          <FindCard2
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
      </CardContainer>
    </Container>
  );
};

export default FindDate;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  width: 1024px;
`;

const CalendarContainer = styled.div`
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  overflow: hidden;
  border: 5px solid #ccc;

  .react-calendar {
    width: 100%;
    height: 100%;
    border: none;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    padding: 30px 20px;
    background-color: white;
  }

  /* 네비게이션 가운데 정렬 */
  .react-calendar__navigation {
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 30px;
    border-radius: 15px;

    span {
      font-size: 24px;
      color: black;
    }
  }

  /* 네비게이션 폰트 설정 */
  .react-calendar__navigation button {
    font-family: 'Freesentation-8ExtraBold', sans-serif;
    font-size: 24px;
    abbr {
      color: black;
    }
  }

  /* 네비게이션 비활성화 됐을때 스타일 */
  .react-calendar__navigation button:disabled {
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
    font-family: 'Freesentation-8ExtraBold', sans-serif;
    font-size: 18px;
  }

  /* 요일 밑줄 제거 */
  .react-calendar__month-view__weekdays {
    margin-bottom: 20px;
  }

  /* 일요일과 토요일에 빨간 폰트 */
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='일요일'],
  .react-calendar__month-view__weekdays__weekday--weekend abbr[title='토요일'] {
    color: red;
  }

  /* 토요일과 일요일 날짜 색상 변경 */
  .react-calendar__month-view__days__day--weekend abbr {
    color: red;
  }

  /* 토요일과 일요일 날짜 색상 변경 */
  .react-calendar__month-view__days abbr {
    font-family: 'Freesentation-6SemiBold', sans-serif;
    font-size: 16px;
  }

  /* 오늘 날짜 폰트 컬러 */
  .react-calendar__tile {
    margin-bottom: 20px;
  }

  /* 부모 요소가 flexbox로 레이아웃을 적용하는 경우 */
  .react-calendar__year-view__months {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    font-family: 'Freesentation-6SemiBold', sans-serif;
    font-size: 16px;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* 일 날짜 간격 */
  .react-calendar__tile {
    padding: 10px 10px 40px 10px;
    position: relative;
  }

  .react-calendar__tile--now {
    border-radius: 15px;
  }

  /* 네비게이션 월 스타일 적용 */
  .react-calendar__year-view__months__month {
    flex: 0 0 calc(33.3333% - 10px) !important;
    margin-inline-start: 5px !important;
    margin-inline-end: 5px !important;
    margin-block-end: 10px;
    padding: 20px 6.6667px;
    font-size: 16px;
    color: black;
  }

  /* 선택한 날짜 스타일 적용 */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background: #ccc;
    border-radius: 15px;
    abbr {
      color: white;
    }
  }
`;

const CardContainer = styled.div`
  height: 600px;
  margin-left: 20px;
  overflow-y: auto;
`;

const StyledCalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const StyledCalendar = styled(Calendar)`
  .react-calendar__tile--now {
    background: #98d6ea;
  }
`;
