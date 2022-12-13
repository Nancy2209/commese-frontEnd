const initState = {
  linkData: [],
  error: null,
};
const LinkReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "LINK_Data_REQUESTED":
      return {
        ...state,
      };
    case "LINK_DATA_RESPONSE":
      return {
        ...state,
        linkData: data,
      };
    case "LINK_ERROR":
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
export default LinkReducer;
