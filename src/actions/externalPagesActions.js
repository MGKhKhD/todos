import { SET_EXTERNAL_PAGES_LINK, CANCEL_EXTERNAL_PAGES_LINK } from "../types";

export function setExternalPageOption(link) {
  return {
    type: SET_EXTERNAL_PAGES_LINK,
    link
  };
}

export function cancelExternalPageOption() {
  return {
    type: CANCEL_EXTERNAL_PAGES_LINK
  };
}
