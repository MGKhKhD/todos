import {
  SET_EXTERNAL_PAGES_LINK,
  CANCEL_EXTERNAL_PAGES_LINK,
  SET_NEWS_COUNTRY,
  SET_NEWS_CATEGORY
} from "../types";
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

function newsSetting(
  state = {
    country: "",
    category: "",
    query: ""
  },
  action
) {
  switch (action.type) {
    case SET_NEWS_COUNTRY:
      return { ...state, country: action.country };
    case SET_NEWS_CATEGORY:
      return { ...state, category: action.category };
    default:
      return state;
  }
}

const externalPagesReducers = combineReducers({
  links,
  newsSetting
});

export default externalPagesReducers;
