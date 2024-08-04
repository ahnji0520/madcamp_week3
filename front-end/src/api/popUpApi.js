import apiClient from './apiClient';
import moment from 'moment';

export const fetchPopUp = async () => {
  try {
    const response = await apiClient.get('/api/popup/get/:id');
    return response.data;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchPopUps = async () => {
  try {
    const response = await apiClient.get('/api/popup/getAll');
    return response.data;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchPopUpsByDate = async (date) => {
  try {
    const formattedDate = moment(date).format('YYYY-MM-DD'); // 날짜 형식을 지정
    const response = await apiClient.post('/api/popup/date', {
      date: formattedDate,
    });
    return response.data;
  } catch (error) {
    console.error('이벤트를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchFavoritePopUps = async (u_id) => {
  try {
    const response = await apiClient.post('/api/popup/checkFavorite', {
      u_id,
    });
    return response.data; // 관심 팝업 이벤트 ID 리스트 반환
  } catch (error) {
    console.error('즐겨찾기 팝업을 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

// 관심 팝업 토글 API 요청 추가
export const toggleFavoritePopUp = async (u_id, p_id) => {
  try {
    const response = await apiClient.post('/api/popup/toggleFavorite', {
      u_id,
      p_id,
    });
    return response.data;
  } catch (error) {
    console.error('관심 팝업을 토글하는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchPopUpsByRegion = async (p_region) => {
  try {
    const response = await apiClient.post('/api/popup/region', {
      p_region,
    });
    return response.data;
  } catch (error) {
    console.error('데이터를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchReviewsByPopUpId = async (p_id) => {
  try {
    const response = await apiClient.post('/api/popup/review', { p_id });
    return response.data;
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const submitReview = async (p_id, u_id, u_nickname, grade, review) => {
  try {
    const response = await apiClient.post('/api/popup/review/post', {
      p_id,
      u_id,
      u_nickname,
      grade,
      review,
    });
    return response.data;
  } catch (error) {
    console.error('리뷰를 제출하는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const submitPopUp = async (popupData) => {
  try {
    const formData = new FormData();
    formData.append('u_id', popupData.u_id);
    formData.append('p_name', popupData.p_name);
    formData.append('p_location', popupData.p_location);
    formData.append('p_startdate', popupData.p_startdate);
    formData.append('p_enddate', popupData.p_enddate);
    formData.append('p_intro', popupData.p_intro);
    formData.append('p_detail', popupData.p_detail);
    formData.append('p_simplelocation', popupData.p_simplelocation);
    formData.append('p_category', popupData.p_category);
    formData.append('p_hour', popupData.p_hour);
    formData.append('p_image', popupData.p_image);

    const response = await apiClient.post('/api/popup/store/post', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('팝업 데이터를 제출하는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchReviewPopUps = async (u_id) => {
  try {
    const response = await apiClient.post('/api/popup/myReview', { u_id });
    return response.data;
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchInterestPopUps = async (u_id) => {
  try {
    const response = await apiClient.post('/api/popup/myFavorite', { u_id });
    return response.data;
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const fetchMyPopUps = async (u_id) => {
  try {
    const response = await apiClient.post('/api/popup/myPopupStore', { u_id });
    return response.data;
  } catch (error) {
    console.error('리뷰를 가져오는 중 오류가 발생했습니다.', error);
    throw error;
  }
};

export const ChatBot = async (message) => {
  try {
    const response = await apiClient.post('/chatbot/chat', { message });
    return response.data;
  } catch (error) {
    console.error('챗봇에게 문제가 생겼습니다.', error);
    throw error;
  }
};
