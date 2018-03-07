import { SET_EXTERNAL_PAGES_LINK, CANCEL_EXTERNAL_PAGES_LINK } from "../types";
import { combineReducers } from "redux";

function links(state = "", action) {
  switch (action.type) {
    case SET_EXTERNAL_PAGES_LINK:
      return action.link;
    case CANCEL_EXTERNAL_PAGES_LINK:
      return "";
    default:
      return state;
  }
}

const externalPagesReducers = combineReducers({
  links
});

export default externalPagesReducers;
