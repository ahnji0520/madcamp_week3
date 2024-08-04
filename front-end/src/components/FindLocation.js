import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaLocationDot } from 'react-icons/fa6';
import { renderToStaticMarkup } from 'react-dom/server';
import { fetchPopUps, fetchPopUpsByRegion } from '../api/popUpApi';
import PopUpDetail from '../pages/PopUpDetail';

import FindCard2 from './FindCard2';

const locations = {
  서울특별시: {
    bounds: new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(37.42829747265696, 126.76620481493878), // SW corner
      new window.kakao.maps.LatLng(37.70195080091423, 127.18379467204169) // NE corner
    ),
  },
  경기도: {
    bounds: new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(36.69222592951187, 126.2671031791603), // SW corner
      new window.kakao.maps.LatLng(38.30508123401615, 127.63828420749539) // NE corner
    ),
  },
  인천광역시: {
    bounds: new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(37.37530111808893, 126.33106655617493), // SW corner
      new window.kakao.maps.LatLng(37.59256040555129, 126.7357264686264) // NE corner
    ),
  },
  강원도: {
    bounds: new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(37.04189811746995, 127.98959949165723), // SW corner
      new window.kakao.maps.LatLng(38.61812652020266, 129.5843004267528) // NE corner
    ),
  },
  부산광역시: {
    bounds: new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(35.03818175328893, 128.76259869178315), // SW corner
      new window.kakao.maps.LatLng(35.39438966682436, 129.29804527955243) // NE corner
    ),
  },
  대전광역시: {
    bounds: new window.kakao.maps.LatLngBounds(
      new window.kakao.maps.LatLng(36.18050063403538, 127.25907377610636), // SW corner
      new window.kakao.maps.LatLng(36.49423339637817, 127.55080219346847) // NE corner
    ),
  },
};

const FindLocation = () => {
  const [map, setMap] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 정보를 저장할 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=f7a06e0849e85a16a1f6476972176f1a&autoload=false`;
    document.head.appendChild(script);

    script.onload = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLatLng = new window.kakao.maps.LatLng(
            latitude,
            longitude
          );
          setCurrentPosition(currentLatLng);

          window.kakao.maps.load(() => {
            const container = document.getElementById('map'); // 지도를 표시할 div
            const options = {
              center: currentLatLng, // 사용자 위치를 초기 지도 중심좌표로 설정
              level: 3, // 지도의 확대 레벨
            };
            const mapInstance = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
            setMap(mapInstance);

            // 전체 마커 추가
            cards.forEach((card) => {
              const markerPosition = new window.kakao.maps.LatLng(
                card.p_latitude,
                card.p_longitude
              );

              const iconMarkup = renderToStaticMarkup(
                <FaLocationDot size={40} color="#176B87" />
              );
              const svgData = `data:image/svg+xml;base64,${btoa(iconMarkup)}`;

              const imageSize = new window.kakao.maps.Size(40, 40); // 마커 이미지의 크기
              const imageOption = {
                offset: new window.kakao.maps.Point(20, 40),
              }; // 마커 이미지의 옵션 (마커의 좌표와 일치시킬 위치)

              const markerImage = new window.kakao.maps.MarkerImage(
                svgData,
                imageSize,
                imageOption
              );

              const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                image: markerImage,
              });

              // 마커 클릭 이벤트 핸들러 추가
              window.kakao.maps.event.addListener(marker, 'click', () => {
                setSelectedCard(card);
                setIsModalOpen(true);
              });

              marker.setMap(mapInstance);
              setIsLoading(false);
            });
          });
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    };

    return () => script.remove();
  }, [cards]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition(new window.kakao.maps.LatLng(latitude, longitude));
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (map && currentPosition) {
      // FaLocationDot 아이콘을 빨간색으로 변환
      const iconMarkup = renderToStaticMarkup(
        <FaLocationDot size={40} color="red" />
      );
      const svgData = `data:image/svg+xml;base64,${btoa(iconMarkup)}`;

      // 마커 이미지를 생성합니다
      const imageSize = new window.kakao.maps.Size(40, 40); // 마커 이미지의 크기
      const imageOption = { offset: new window.kakao.maps.Point(20, 40) }; // 마커 이미지의 옵션 (마커의 좌표와 일치시킬 위치)

      const markerImage = new window.kakao.maps.MarkerImage(
        svgData,
        imageSize,
        imageOption
      );

      const marker = new window.kakao.maps.Marker({
        position: currentPosition,
        image: markerImage,
      });

      marker.setMap(map);
      map.setCenter(currentPosition);
    }
  }, [map, currentPosition]);

  useEffect(() => {
    if (currentPosition) {
      handleLocationClick('내 근처 팝업 보기');
    }
  }, [currentPosition]);

  const handleLocationClick = async (location) => {
    // 상태를 초기화하여 중첩을 방지합니다.
    setFilteredCards([]);
    setSelectedOption(location);

    if (location === '내 근처 팝업 보기' && map && currentPosition) {
      const circle = new window.kakao.maps.Circle({
        center: currentPosition,
        radius: 8000, // 반경 8km
        strokeWeight: 1,
        strokeColor: 'red',
        strokeOpacity: 0,
        strokeStyle: 'solid',
        fillColor: 'red',
        fillOpacity: 0.1,
      });
      circle.setMap(map);
      map.setBounds(circle.getBounds());
      try {
        const data = await fetchPopUpsByRegion('대전광역시');
        setFilteredCards(data);
      } catch (error) {
        console.error(
          '지역별 데이터를 가져오는 중 오류가 발생했습니다.',
          error
        );
      }
    } else if (locations[location] && map) {
      try {
        const data = await fetchPopUpsByRegion(location);
        setFilteredCards(data);

        const { bounds } = locations[location];
        map.setBounds(bounds);
      } catch (error) {
        console.error(
          '지역별 데이터를 가져오는 중 오류가 발생했습니다.',
          error
        );
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box>
      <OptionContainer>
        <MyLocation
          selected={selectedOption === '내 근처 팝업 보기'}
          onClick={() => handleLocationClick('내 근처 팝업 보기')}
        >
          내 근처 팝업 보기
        </MyLocation>
        <Option
          selected={selectedOption === '서울특별시'}
          onClick={() => handleLocationClick('서울특별시')}
        >
          서울특별시
        </Option>
        <Option
          selected={selectedOption === '경기도'}
          onClick={() => handleLocationClick('경기도')}
        >
          경기도
        </Option>
        <Option
          selected={selectedOption === '인천광역시'}
          onClick={() => handleLocationClick('인천광역시')}
        >
          인천광역시
        </Option>
        <Option
          selected={selectedOption === '강원도'}
          onClick={() => handleLocationClick('강원도')}
        >
          강원도
        </Option>
        <Option
          selected={selectedOption === '부산광역시'}
          onClick={() => handleLocationClick('부산광역시')}
        >
          부산광역시
        </Option>
        <Option
          selected={selectedOption === '대전광역시'}
          onClick={() => handleLocationClick('대전광역시')}
        >
          대전광역시
        </Option>
      </OptionContainer>
      <Container>
        <MapContainer id="map">
          <LoadingSpinner />
        </MapContainer>
        <CardContainer>
          {filteredCards.map((card, index) => (
            <FindCard2
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
        </CardContainer>
      </Container>
      {selectedCard && (
        <PopUpDetail
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          title={selectedCard.p_name}
          location={selectedCard.p_location}
          region={selectedCard.p_region}
          latitude={selectedCard.p_latitude}
          longtitude={selectedCard.p_longtitude}
          start_date={selectedCard.p_startdate}
          end_date={selectedCard.p_enddate}
          status={selectedCard.p_status}
          intro={selectedCard.p_intro}
          detail={selectedCard.p_detail}
          interest_cnt={selectedCard.p_interest}
          imageUrl={selectedCard.p_imageurl}
          simplelocation={selectedCard.p_simplelocation}
          category={selectedCard.p_category}
          hour={selectedCard.p_hour}
        />
      )}
    </Box>
  );
};

export default FindLocation;

const Box = styled.div`
  width: 1024px;
  display: flex;
  flex-direction: column;
`;

const OptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: 20px;
  margin-top: 10px;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  width: 1024px;
`;

const MapContainer = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 15px;
  overflow: hidden;
  border: 5px solid #ccc;
`;

const CardContainer = styled.div`
  height: 600px;
  margin-left: 20px;
  overflow-y: auto;
`;

const MyLocation = styled.div`
  width: fit-content;
  border-radius: 15px;
  border: 2px solid #ff4c4c;
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 14px;
  color: #373a40;
  cursor: pointer;
  padding: 8px 10px 7px 10px;
  margin-right: 10px;
  background-color: ${(props) => (props.selected ? '#e0e0e0' : 'transparent')};

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Option = styled.div`
  width: fit-content;
  border-radius: 15px;
  border: 1px solid #ccc;
  font-family: 'Freesentation-8ExtraBold', sans-serif;
  font-size: 14px;
  color: #373a40;
  cursor: pointer;
  padding: 7px 10px;
  margin-right: 10px;
  background-color: ${(props) => (props.selected ? '#e0e0e0' : 'transparent')};

  &:hover {
    background-color: #e0e0e0;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #3498db;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: ${spin} 2s linear infinite;
  position: absolute;
  margin-top: 280px;
  margin-left: 280px;
  transform: translate(-50%, -50%);
`;
