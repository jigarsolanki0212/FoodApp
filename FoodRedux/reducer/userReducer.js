import types from '../actions/types';

const initialState = {
  data: [],
  categories:[],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.API_CALL_FINISH: {
      return {
        ...state,
        data: action.payload.data,
        categories: action.payload.categories
      };
    }
    case types.API_CALL_START: {
      return {
        ...state,
      };
    }
   
    default: {
      return state;
    }
  }
};
