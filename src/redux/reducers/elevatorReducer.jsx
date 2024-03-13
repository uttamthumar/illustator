import { ALL_PEOPLE, BUTTON, COUNT, SELECTED_PEOPLE } from "../action.type";

// Reducer
const initialState = {
  allPeople:null,
  selectedPeople: null,
  button: null,
  count: null,
};

const elevatorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECTED_PEOPLE:
      return { ...state, selectedPeople: action.payload };
    case ALL_PEOPLE:
      return { ...state, allPeople: action.payload };
    case BUTTON:
      return { ...state, button: action.payload };
    case COUNT:
      return { ...state, count: action.payload };
    default:
      return state;
  }
};

export default elevatorReducer;
