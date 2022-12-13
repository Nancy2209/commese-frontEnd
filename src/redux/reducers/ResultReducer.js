const initState = {
  resultListData: [],
  resultDetailData: [],
  defaultResultDetailData: [],
  error: null,
};
const ResultReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "RESULT_Data_REQUESTED":
      return {
        ...state,
      };
    case "RESULT_DATA_RESPONSE":
      return {
        ...state,
        resultListData: data,
      };
    case "RESULT_DETAIL_DATA_RESPONSE":
      return {
        ...state,
        resultDetailData: data,
      };
    case "DEFAULT_RESULT_DATA_RESPONSE":
      return {
        ...state,
        defaultResultDetailData: data,
      };
    case "RESULT_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default ResultReducer;
