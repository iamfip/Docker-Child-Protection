import { RECORD_PATH } from "../../../../config";
import { ENQUEUE_SNACKBAR, generate } from "../../../notifier";

import actions from "./actions";

export const fetchAgency = id => {
  return {
    type: actions.FETCH_AGENCY,
    api: {
      path: `${RECORD_PATH.agencies}/${id}`
    }
  };
};

export const saveAgency = ({ id, body, saveMethod, message }) => {
  return {
    type: actions.SAVE_AGENCY,
    api: {
      path:
        saveMethod === "update"
          ? `${RECORD_PATH.agencies}/${id}`
          : RECORD_PATH.agencies,
      method: saveMethod === "update" ? "PATCH" : "POST",
      body,
      successCallback: {
        action: ENQUEUE_SNACKBAR,
        payload: {
          message,
          options: {
            variant: "success",
            key: generate.messageKey()
          }
        },
        redirectWithIdFromResponse: saveMethod !== "update",
        redirect: `/admin/${RECORD_PATH.agencies}`
      }
    }
  };
};

export const clearSelectedAgency = () => {
  return {
    type: actions.CLEAR_SELECTED_AGENCY
  };
};