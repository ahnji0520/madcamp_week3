import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 1024px;
  padding: 20px 0;
  text-align: center;
  position: absolute;
  bottom: 30px;
`;

const Divider = styled.hr`
  margin: 80px 0 10px 0;
  border: 0;
  border-top: 2px solid #ff4c4c;
`;

const CopyrightText = styled.p`
  font-family: 'Freesentation-3Light', sans-serif;
  font-size: 14px;
  color: #ff4c4c;
  margin-top: 20px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Divider />
      <CopyrightText>Copyright @Madcamp</CopyrightText>
    </FooterContainer>
  );
};

export default Footer;
