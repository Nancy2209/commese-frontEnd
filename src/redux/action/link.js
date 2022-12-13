import axios from "axios";
import { getCommonApiHeader } from "../../Utils/utils";
import { IMP_LINK_LIST } from "../constants";

export const impListAPI = (data) => {
  return (dispatch, getState) => {
    dispatch(getLinkRequest());
    axios
      .get(IMP_LINK_LIST, {
        headers: {
          ...getCommonApiHeader(),
        },
      })
      .then((response) => {
        dispatch(getLinkDataRespond(response?.data));
      })
      .catch((err) => {
        dispatch(handleError(err));
      });
  };
};
export const getLinkRequest = (data) => {
  return {
    type: "LINK_Data_REQUESTED",
  };
};

export const getLinkDataRespond = (data) => {
  return {
    type: "LINK_DATA_RESPONSE",
    data: data,
  };
};

export const handleError = (error) => {
  return {
    type: "LINK_ERROR",
    error,
  };
};
