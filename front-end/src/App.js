import './App.css';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import React, { useEffect } from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import Find from './pages/Find';
import Login from './pages/Login';
import Register from './pages/Register';
import MyPage from './pages/MyPage';
import PopUpDetail from './pages/PopUpDetail';
import Add from './pages/Add';

function App() {
  useEffect(() => {
    const jsKey = 'f7a06e0849e85a16a1f6476972176f1a';

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
      console.log(window.Kakao.isInitialized());
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/find" element={<Find />} />
            <Route path="/mypage" element={<MyPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/popupdetail" element={<PopUpDetail />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
