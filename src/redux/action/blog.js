import axios from "axios";
import { getCommonApiHeader } from "../../Utils/utils";
import { BLOG_CATEGORY, BLOG_DETAIL, DEFAULT_BLOG } from "../constants";

export const blogListApi = (data) => {
  return (dispatch, getState) => {
    dispatch(getBlogDataRequest());
    axios
      .get(BLOG_CATEGORY, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response) {
          dispatch(getBLOGDataRespond(response?.data));
        }
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const defaultBlogListApi = (data) => {
  return (dispatch, getState) => {
    dispatch(getBlogDataRequest());
    axios
      .get(DEFAULT_BLOG, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response) {
          dispatch(getDEFAULTBLOGDataRespond(response?.data));
        }
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const blogDetailApi = (data) => {
  return (dispatch, getState) => {
    dispatch(getBlogDataRequest());
    axios
      .get(BLOG_DETAIL + "" + data, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response) {
          dispatch(getBlogDetailataRespond(response?.data));
        }
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const getBlogDataRequest = (data) => {
  return {
    type: "BLOG_Data_REQUESTED",
  };
};

export const getBlogDetailataRespond = (data) => {
  return {
    type: "BLOG_DETAIL_DATA_RESPONSE",
    data: data,
  };
};

export const getBLOGDataRespond = (data) => {
  return {
    type: "BLOG_DATA_RESPONSE",
    data: data,
  };
};

export const getDEFAULTBLOGDataRespond = (data) => {
  return {
    type: "DEFAULT_BLOG_DATA_RESPONSE",
    data: data,
  };
};

export const handleSuccess = (data) => {
  return {
    type: "SHOW_TOAST",
    data,
    toastType: "success",
  };
};
export const handleError = (error) => {
  return {
    type: "BLOG_ERROR",
    error,
  };
};
