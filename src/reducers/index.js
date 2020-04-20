import {combineReducers} from 'redux';

const INITIAL_STATE = {
  authorize: false,
  user: {},
  useFinger: false,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INIT_SESSION':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLOSE_SESSION':
      return {
        ...state,
        ...action.payload,
      };
    case 'DESTROY_SESSION':
      return INITIAL_STATE;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
