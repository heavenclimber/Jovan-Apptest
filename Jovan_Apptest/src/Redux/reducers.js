import {
  SET_CONTACT_ID,
  SET_CONTACT_FNAME,
  SET_CONTACT_LNAME,
  SET_CONTACT_AGE,
  SET_CONTACT_PHOTO,
} from './actions';

const initialState = {
  id: '',
  fname: '',
  lname: '',
  age: 0,
  photo: '',
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CONTACT_ID:
      return {
        ...state,
        id: action.payload,
      };

    case SET_CONTACT_FNAME:
      return {
        ...state,
        fname: action.payload,
      };

    case SET_CONTACT_LNAME:
      return {
        ...state,
        lname: action.payload,
      };

    case SET_CONTACT_AGE:
      return {
        ...state,
        age: action.payload,
      };

    case SET_CONTACT_PHOTO:
      return {
        ...state,
        photo: action.payload,
      };

    default:
      return state;
  }
}


export default userReducer;