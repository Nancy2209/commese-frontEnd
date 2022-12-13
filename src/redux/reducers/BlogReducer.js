const initState = {
  blogListData: [],
  blogDetailData: [],
  defaultBlogDetailData: [],
  error: null,
};
const BlogReducer = (state = initState, action) => {
  const data = action?.data;
  switch (action?.type) {
    case "BLOG_Data_REQUESTED":
      return {
        ...state,
      };
    case "BLOG_DATA_RESPONSE":
      return {
        ...state,
        blogListData: data,
      };
    case "BLOG_DETAIL_DATA_RESPONSE":
      return {
        ...state,
        blogDetailData: data,
      };
    case "DEFAULT_BLOG_DATA_RESPONSE":
      return {
        ...state,
        defaultBlogDetailData: data,
      };
    case "BLOG_ERROR":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};
export default BlogReducer;
