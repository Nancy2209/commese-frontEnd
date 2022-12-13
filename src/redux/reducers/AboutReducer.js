const initState = {
  centersData: [],
  centerSearchData: [],
  error: null,
};
const AboutReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "CENTER_DATA_RESPONSE":
      return {
        ...state,
        centersData: data,
      };

    case "CENTER_SEARCH_DATA_RESPONSE":
      return {
        ...state,
        centerSearchData: data,
      };
    case "ABOUT_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default AboutReducer;
