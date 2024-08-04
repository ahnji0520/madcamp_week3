import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import KakaoLogin from 'react-kakao-login';
import backgroundImage from '../images/login_background.png';
import { IoClose } from 'react-icons/io5';
import kakaoLoginImage from '../images/kakao_login.png';
import { loginUser, loginKakaoUser } from '../redux/actions/authActions';

const wave = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Container = styled.div`
  height: 100vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-y: hidden;
`;

const SubContainer = styled.div`
  width: 1024px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h1`
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 48px;
  padding-top: 90px;
`;

const Title2 = styled.h1`
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 90px;
  animation: ${wave} 2s ease-out infinite;
`;

const CloseIcon = styled(IoClose)`
  font-size: 48px;
  color: black;
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

const Box = styled.div`
  width: 400px;
  height: 320px;
  margin: 40px auto;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px 40px;
`;

const Input = styled.input`
  padding: 10px 20px;
  margin: 5px 0;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-family: 'Freesentation-6SemiBold', sans-serif;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 10px;
  border-radius: 10px;
  border: none;
  background-color: #ff4c4c;
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  font-family: 'Freesentation-6SemiBold', sans-serif;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const RegisterText = styled.h1`
  text-align: right;
  @font-face {
    font-family: 'Freesentation-6SemiBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-6SemiBold.woff2')
      format('woff2');
    font-weight: 600;
    font-style: normal;
  }
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  padding-right: 40px;
  margin-top: -10px;
  text-decoration: underline;

  &:hover {
    cursor: pointer;
    color: #ff4c4c;
  }
`;

const KakaoLoginImage = styled.img`
  cursor: pointer;
  width: 320px;
  margin-top: 20px;
`;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(id, password));
      navigate('/'); // 로그인 성공 후 대시보드로 이동
    } catch (error) {
      console.error(error);
      setError('로그인 중 오류가 발생했습니다.'); // 로그인 오류 메시지 설정
    }
  };

  const handleRegisterClick = () => {
    navigate('/register'); // 회원가입 페이지로 이동
  };

  const handleSuccess = async (response) => {
    try {
      console.log('Kakao response:', response);

      const u_id = response.profile.id;
      const u_nickname = response.profile.properties.nickname;

      console.log('User ID:', u_id);
      console.log('Nickname:', u_nickname);

      await dispatch(loginKakaoUser(u_id, u_nickname));
      navigate('/');
    } catch (error) {
      console.error(error);
      setError('카카오 로그인 중 오류가 발생했습니다.'); // 로그인 오류 메시지 설정
    }
  };

  const handleFailure = (error) => {
    console.error(error);
    setError('카카오 로그인에 실패했습니다.'); // 카카오 로그인 실패 메시지 설정
  };

  return (
    <>
      <Container>
        <SubContainer>
          <Title>WELCOME TO</Title>
          <Title2>POPITUP</Title2>
          <CloseIcon onClick={handleClose} />
          <Box>
            <Form onSubmit={handleSubmit}>
              <Input
                type="text"
                placeholder="아이디"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <Input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit">로그인</Button>
            </Form>
            {error && (
              <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
            )}
            <RegisterText onClick={handleRegisterClick}>회원가입</RegisterText>
            <KakaoLogin
              jsKey="f7a06e0849e85a16a1f6476972176f1a"
              onSuccess={handleSuccess}
              onFailure={handleFailure}
              getProfile={true}
              render={(props) => (
                <KakaoLoginImage
                  src={kakaoLoginImage}
                  onClick={props.onClick}
                  alt="카카오 로그인"
                />
              )}
            />
          </Box>
        </SubContainer>
      </Container>
    </>
  );
};

export default Login;
