import {
  SET_FAVORITE_POPUPS,
  ADD_FAVORITE_POPUP,
  REMOVE_FAVORITE_POPUP,
  SET_POPUP_INTEREST_COUNT,
} from '../types/favoriteTypes';

const initialState = {
  favoritePopups: [],
  popupInterestCounts: {},
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FAVORITE_POPUPS:
      return {
        ...state,
        favoritePopups: action.payload.p_ids,
        popupInterestCounts: action.payload.popupstore.reduce((acc, popup) => {
          acc[popup.p_id] = popup.p_interest;
          return acc;
        }, {}),
      };
    case ADD_FAVORITE_POPUP:
      return {
        ...state,
        favoritePopups: [...state.favoritePopups, action.payload],
        popupInterestCounts: {
          ...state.popupInterestCounts,
          [action.payload]:
            (state.popupInterestCounts[action.payload] || 0) + 1,
        },
      };
    case REMOVE_FAVORITE_POPUP:
      return {
        ...state,
        favoritePopups: state.favoritePopups.filter(
          (id) => id !== action.payload
        ),
        popupInterestCounts: {
          ...state.popupInterestCounts,
          [action.payload]:
            (state.popupInterestCounts[action.payload] || 1) - 1,
        },
      };
    case SET_POPUP_INTEREST_COUNT:
      return {
        ...state,
        popupInterestCounts: {
          ...state.popupInterestCounts,
          [action.payload.popupId]: action.payload.count,
        },
      };
    default:
      return state;
  }
};

export default favoriteReducer;
