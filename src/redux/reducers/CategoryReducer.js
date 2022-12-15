const initState = {
  categoryData: [],
  categoryDetailsData: [],
  defaultCategoryDetailsData: [],
  courseSearchDetailsData: [],
  couponData: [],
  recommendationData: [],
  recommendationDetailData: [],
  error: null,
};
const CategoryReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "CATEGORY_Data_REQUESTED":
      return {
        ...state,
      };
    case "CATEGORY_DATA_RESPONSE":
      return {
        ...state,
        categoryData: data,
      };
    case "CATEGORY_DETAILS_DATA_RESPONSE":
      return {
        ...state,
        categoryDetailsData: data,
      };
    case "DEFAULT_CATEGORY_DETAILS_DATA_RESPONSE":
      return {
        ...state,
        defaultCategoryDetailsData: data,
      };
    case "COURSE_SEARCH_DETAILS_DATA_RESPONSE":
      return {
        ...state,
        courseSearchDetailsData: data,
      };
    case "COUPON_Data_REQUESTED":
      return {
        ...state,
      };
    case "COUPON_DATA_RESPONSE":
      return {
        ...state,
        couponData: data,
      };
    case "RECOMMENDATION_REQUEST":
      return {
        ...state,
      };
    case "RECOMMENDATION_DATA_RESPONSE":
      return {
        ...state,
        recommendationData: data,
      };

    case "RECOMMDETAIL_DATA_RESPONSE":
      return {
        ...state,
        recommendationDetailData: data,
      };

    case "CATEGORY_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default CategoryReducer;
