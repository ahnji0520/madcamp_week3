import React, { useState } from 'react';
import styled from 'styled-components';
import backgroundImage from '../images/main_background1.jpg';
import { IoClose } from 'react-icons/io5';
import DatePicker from 'react-datepicker';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { IoMdCheckmark } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { submitPopUp } from '../api/popUpApi';

const Box = styled.div`
  height: 150vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: center;
`;

const Container = styled.div`
  width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 25px;
  position: relative;
`;

const CloseIcon = styled(IoClose)`
  font-size: 48px;
  color: #ff4c4c;
  cursor: pointer;
  position: absolute;
  top: 30px;
  right: 0;
  border-radius: 50%;
  transition: background-color 0.3s;

  &:hover {
    background-color: white; /* 배경색 지정 */
  }
`;

const Title = styled.h1`
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 54px;
  padding-top: 120px;
  color: #ff4c4c;
  text-align: left;
`;

const Container2 = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const ImageRequirement = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageRequirementBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Requirement = styled.h1`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 20px;
  text-align: left;
`;

const ImageIcon = styled(MdOutlineDriveFolderUpload)`
  font-size: 50px;
  margin-left: 10px;
  border-radius: 50%;
  padding: 10px;

  &:hover {
    background-color: white;
  }
`;

const ImageExample = styled.div`
  width: 300px;
  height: 300px;
  background-color: #ccc;
  margin-top: 10px;
  border-radius: 15px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #ffffff;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 60px;
  margin-top: 15px;
`;

const SubInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 500px;
  padding: 10px 20px;
  margin-left: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-family: 'Freesentation-6SemiBold', sans-serif;
`;

const StyledDatePicker = styled(DatePicker)`
  width: 500px;
  padding: 10px 20px;
  margin-left: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-family: 'Freesentation-6SemiBold', sans-serif;
`;

const StyledReactQuill = styled(ReactQuill)`
  width: 467px;
  margin-left: 20px;
  .ql-container {
    border-radius: 10px;
  }
`;

const SubmitButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  margin-top: 50px;
  margin-left: 650px;
  border-radius: 10px;
  border: none;
  background-color: #ff4c4c;
  color: white;
  font-size: 16px;
  font-family: 'Freesentation-7Bold', sans-serif;
  cursor: pointer;

  &:hover {
    background-color: #e04343;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 20px;
  background-color: white;
  margin-top: 3px;
  border: 1px solid #ccc;
  border-radius: 15px;
  width: 200px;
  z-index: 1;
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

  &:hover {
    background-color: #e0e0e0;
  }
`;

const Divider = styled.hr`
  margin: 0;
  border: 0;
  border-top: 1px solid #ccc;
`;

const Add = () => {
  const navigate = useNavigate();
  const u_id = useSelector((state) => state.auth.u_id);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [image2, setImage2] = useState(null);
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [intro, setIntro] = useState('');
  const [detailInfo, setDetailInfo] = useState('');
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [hour, setHour] = useState('');

  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
    setImage2(file);
  };

  const handleAddressClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        // 검색된 주소 정보를 받아서 처리할 부분
        setAddress(data.address);
      },
    }).open();
  };

  const handleSubmit = async () => {
    const popupData = {
      u_id,
      p_name: title,
      p_location: `${address} ${detailAddress}`,
      p_startdate: startDate,
      p_enddate: endDate,
      p_intro: intro,
      p_detail: detailInfo,
      p_simplelocation: address,
      p_category: selectedCategory,
      p_hour: hour,
      p_image: image2,
    };

    try {
      const response = await submitPopUp(popupData);
      navigate('/');
      // 제출 성공 후 필요한 동작 추가
    } catch (error) {
      console.error('팝업 제출 중 오류 발생', error);
    }
  };

  const categories = [
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

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  return (
    <Box>
      <Container>
        <CloseIcon onClick={handleClose} />
        <Title>ADD POPUP!</Title>
        <Container2>
          <ImageRequirement>
            <ImageRequirementBox>
              <Requirement>대표사진 선택하기</Requirement>
              <label>
                <ImageIcon />
                <HiddenFileInput type="file" onChange={handleImageUpload} />
              </label>
            </ImageRequirementBox>
            <ImageExample style={{ backgroundImage: `url(${image})` }} />
          </ImageRequirement>
          <InfoContainer>
            <SubInfoContainer>
              <Requirement>제목</Requirement>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </SubInfoContainer>
            <SubInfoContainer>
              <Requirement>장소</Requirement>
              <Input value={address} readOnly onClick={handleAddressClick} />
            </SubInfoContainer>
            <SubInfoContainer>
              <Input
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="상세주소"
                style={{ marginLeft: '50px' }}
              />
            </SubInfoContainer>
            <SubInfoContainer>
              <Requirement>기간</Requirement>
              <StyledDatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="시작일자 선택"
              />
            </SubInfoContainer>
            <SubInfoContainer style={{ marginLeft: '30px' }}>
              <StyledDatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="yyyy/MM/dd"
                placeholderText="종료일자 선택"
              />
            </SubInfoContainer>
            <SubInfoContainer>
              <Requirement>운영시간</Requirement>
              <Input
                style={{ width: '467px' }}
                value={hour}
                onChange={(e) => setHour(e.target.value)}
              />
            </SubInfoContainer>
            <SubInfoContainer>
              <Requirement>카테고리</Requirement>
              <div style={{ position: 'relative', width: '467px' }}>
                <Input
                  style={{ position: 'relative', width: '467px' }}
                  value={selectedCategory}
                  readOnly
                  onClick={() => setCategoryDropdownOpen((prev) => !prev)}
                />
                {categoryDropdownOpen && (
                  <DropdownMenu>
                    {categories.map((category, index) => (
                      <React.Fragment key={category}>
                        <DropdownItem
                          onClick={() => handleCategorySelect(category)}
                        >
                          {category}{' '}
                          {selectedCategory === category && <IoMdCheckmark />}
                        </DropdownItem>
                        {index < categories.length - 1 && <Divider />}
                      </React.Fragment>
                    ))}
                  </DropdownMenu>
                )}
              </div>
            </SubInfoContainer>
            <SubInfoContainer>
              <Requirement>한줄소개</Requirement>
              <Input
                style={{ width: '467px' }}
                value={intro}
                onChange={(e) => setIntro(e.target.value)}
              />
            </SubInfoContainer>
            <SubInfoContainer>
              <Requirement>상세정보</Requirement>
              <StyledReactQuill value={detailInfo} onChange={setDetailInfo} />
            </SubInfoContainer>
          </InfoContainer>
        </Container2>
      </Container>
      <SubmitButton onClick={handleSubmit}>제출</SubmitButton>
      <Footer />
    </Box>
  );
};

export default Add;
