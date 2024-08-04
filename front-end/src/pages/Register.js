import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import backgroundImage from '../images/login_background.png';
import { IoClose } from 'react-icons/io5';
import { registerUser } from '../redux/actions/authActions';

const wave = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [error, setError] = useState('');

  const handleClose = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(id, password, nickname));
      navigate('/'); // 회원가입 성공 후 홈으로 이동
    } catch (error) {
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    setPasswordMatch(password === checkPassword);
  }, [password, checkPassword]);

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
                type="id"
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
              <Input
                type="password"
                placeholder="비밀번호 확인"
                value={checkPassword}
                onChange={(e) => setCheckPassword(e.target.value)}
              />
              {checkPassword && (
                <PasswordChecking match={passwordMatch}>
                  {passwordMatch
                    ? '비밀번호가 일치합니다!'
                    : '비밀번호가 일치하지 않습니다!'}
                </PasswordChecking>
              )}
              <Input
                type="nickname"
                placeholder="닉네임"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button type="submit">회원가입</Button>
            </Form>
          </Box>
        </SubContainer>
      </Container>
    </>
  );
};

export default Register;

const Container = styled.div`
  height: 100vh;
  min-height: 300px;
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: repeat-y;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SubContainer = styled.div`
  width: 1024px;
  margin: 0 auto;
  position: relative;
`;

const Title = styled.h1`
  @font-face {
    font-family: 'Cafe24Decobox';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Decobox.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  font-family: 'Cafe24Decobox', sans-serif;
  font-size: 48px;
  padding-top: 90px;
`;

const Title2 = styled.h1`
  @font-face {
    font-family: 'Cafe24Decobox';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2405-3@1.1/Cafe24Decobox.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
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
  @font-face {
    font-family: 'Freesentation-6SemiBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-6SemiBold.woff2')
      format('woff2');
    font-weight: 600;
    font-style: normal;
  }
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

  @font-face {
    font-family: 'Freesentation-6SemiBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-6SemiBold.woff2')
      format('woff2');
    font-weight: 600;
    font-style: normal;
  }
  font-family: 'Freesentation-6SemiBold', sans-serif;

  &:hover {
    background-color: #ff1a1a;
  }
`;

const PasswordChecking = styled.div`
  @font-face {
    font-family: 'Freesentation-6SemiBold';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2404@1.0/Freesentation-6SemiBold.woff2')
      format('woff2');
    font-weight: 600;
    font-style: normal;
  }
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  margin: 10px 0;
  color: ${(props) => (props.match ? 'green' : 'red')};
`;
