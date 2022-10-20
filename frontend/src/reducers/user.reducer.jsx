import { DELETE_USER, GET_USER, UPLOAD_PICTURE } from '../actions/user.actions';

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };
    case DELETE_USER:
      return action.payload;
    default:
      return state;
  }
}
