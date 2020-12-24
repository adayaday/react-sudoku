import { VALID_CLEAR_INPUT } from "../constants";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const getKeyChar = (keyStr) => {
  if (VALID_CLEAR_INPUT.indexOf(keyStr) > -1) {
    keyStr = "0";
  }
  return keyStr;
};
