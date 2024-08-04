import {
  SET_FAVORITE_POPUPS,
  ADD_FAVORITE_POPUP,
  REMOVE_FAVORITE_POPUP,
  SET_POPUP_INTEREST_COUNT,
} from '../types/favoriteTypes';

export const setFavoritePopups = (favoritePopups) => ({
  type: SET_FAVORITE_POPUPS,
  payload: favoritePopups,
});

export const addFavoritePopup = (popupId) => ({
  type: ADD_FAVORITE_POPUP,
  payload: popupId,
});

export const removeFavoritePopup = (popupId) => ({
  type: REMOVE_FAVORITE_POPUP,
  payload: popupId,
});

export const setPopupInterestCount = (popupId, count) => ({
  type: SET_POPUP_INTEREST_COUNT,
  payload: { popupId, count },
});
