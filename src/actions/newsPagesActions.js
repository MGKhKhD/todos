import { SET_NEWS_COUNTRY, SET_NEWS_CATEGORY } from "../types";

export function setNewsCountry(country) {
  return {
    type: SET_NEWS_COUNTRY,
    country
  };
}

export function setNewsCategory(category) {
  return {
    type: SET_NEWS_CATEGORY,
    category
  };
}
