import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { ChatBot as fetchChatBotResponse } from '../api/popUpApi';

const Box = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  background-color: #fcf8f3;
  border-radius: 15px;
  border: 5px solid #d32f2f;
  display: flex;
  flex-direction: column;
  padding: 15px 20px;
  overflow-y: auto;
`;

const WelcomeText = styled.h1`
  font-family: 'Freesentation-9Black', sans-serif;
  font-size: 20px;
  text-align: left;
  color: #d32f2f;
`;

const ResponseContainer = styled.div`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 12px;
  white-space: pre-wrap;
  margin-bottom: 10px;
  text-align: left;
  margin: 10px 0;
  background-color: #dddddd;
  padding: 20px;
  border-radius: 15px;
`;

const TextArea = styled.textarea`
  font-family: 'Freesentation-6SemiBold', sans-serif;
  font-size: 16px;
  padding: 10px;
  border-radius: 10px;
  text-align: left
  border: 1px solid #d32f2f;
  margin: 10px 0;
  resize: none;
  height: 100px;
  overflow-y: auto;
  min-height: 100px;
`;

const ChatBot = () => {
  const [userInput, setUserInput] = useState('');
  const [responses, setResponses] = useState([]);
  const boxRef = useRef(null);

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleKeyPress = async (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (userInput.trim() !== '') {
        const newResponse = await fetchChatBotResponse(userInput.trim());
        setResponses((prevResponses) => [
          ...prevResponses,
          { type: 'user', text: userInput },
          { type: 'bot', text: newResponse.response },
        ]);
        setUserInput('');
      }
    }
  };

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [responses]);

  return (
    <Box ref={boxRef}>
      <WelcomeText>제 이름은 빠삐입니다!</WelcomeText>
      <WelcomeText>무엇을 도와드릴까요?</WelcomeText>
      {responses.map((response, index) => (
        <ResponseContainer key={index}>
          {response.type === 'bot' ? (
            <ReactMarkdown>{response.text}</ReactMarkdown>
          ) : (
            response.text
          )}
        </ResponseContainer>
      ))}
      <TextArea
        value={userInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="무엇이든 물어보세요"
      />
    </Box>
  );
};

export default ChatBot;
