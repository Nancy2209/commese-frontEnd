import axios from "axios";
import { getCommonApiHeader } from "../../Utils/utils";
import { RESULT_CATEGORY, RESULT_DETAILS, DEFAULT_RESULT } from "../constants";

export const resultListApi = (data) => {
  return (dispatch, getState) => {
    dispatch(getResultDataRequest());
    axios
      .get(RESULT_CATEGORY, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response) {
          dispatch(getRESULTDataRespond(response?.data));
        }
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const defaultResultListApi = (data) => {
  return (dispatch, getState) => {
    dispatch(getResultDataRequest());
    axios
      .get(DEFAULT_RESULT, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response) {
          dispatch(getDEFAULTRESULTDataRespond(response?.data));
        }
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const resultDetailApi = (data) => {
  return (dispatch, getState) => {
    dispatch(getResultDataRequest());
    axios
      .get(RESULT_DETAILS + "" + data, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        if (response) {
          dispatch(getResultDetailataRespond(response?.data));
        }
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};

export const getResultDataRequest = (data) => {
  return {
    type: "RESULT_Data_REQUESTED",
  };
};

export const getResultDetailataRespond = (data) => {
  return {
    type: "RESULT_DETAIL_DATA_RESPONSE",
    data: data,
  };
};

export const getRESULTDataRespond = (data) => {
  return {
    type: "RESULT_DATA_RESPONSE",
    data: data,
  };
};

export const getDEFAULTRESULTDataRespond = (data) => {
  return {
    type: "DEFAULT_RESULT_DATA_RESPONSE",
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
