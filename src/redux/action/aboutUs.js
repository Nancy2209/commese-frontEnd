import axios from "axios";
import { getCommonApiHeader } from "../../Utils/utils";
import { CENTERS_LIST, CENTER_SERACH } from "../constants";

export const centerListAPI = (data) => {
  return (dispatch, getState) => {
    dispatch(getAboutRequest());
    axios
      .get(CENTERS_LIST, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        dispatch(getCentersDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const centerSearchAPI = (data) => {
  return (dispatch, getState) => {
    dispatch(getAboutRequest());
    axios
      .post(CENTER_SERACH, data, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        dispatch(getCenterSearchDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const getAboutRequest = (data) => {
  return {
    type: "ABOUT_Data_REQUESTED",
  };
};

export const getCentersDataRespond = (data) => {
  return {
    type: "CENTER_DATA_RESPONSE",
    data: data,
  };
};

export const getCenterSearchDataRespond = (data) => {
  return {
    type: "CENTER_SEARCH_DATA_RESPONSE",
    data: data,
  };
};

export const handleError = (error) => {
  return {
    type: "ABOUT_ERROR",
    error,
  };
};
