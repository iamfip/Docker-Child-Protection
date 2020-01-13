import { fromJS } from "immutable";

import { USERS_SUCCESS } from "./actions";
import NAMESPACE from "./namespace";

const DEFAULT_STATE = fromJS({});

const reducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case USERS_SUCCESS:
      return state
        .set("data", fromJS(payload.data))
        .set("metadata", fromJS(payload.metadata));
    default:
      return state;
  }
};

export const reducers = { [NAMESPACE]: reducer };