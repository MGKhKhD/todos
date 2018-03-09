import {
  REQUEST_ARTICLES,
  RECEIVED_ARTICLES,
  FAILURE_ARTICLES
} from "../../types";
import { fetchArticles } from "../actions/newsPagesActions";

function callNewsAPIMiddleware({ dispatch, getState }) {
  return next => action => {
    const { type, callAPI, payload = {} } = action;

    if (
      type !== REQUEST_ARTICLES ||
      type !== RECEIVED_ARTICLES ||
      type !== FAILURE_ARTICLES
    ) {
      console.log("aborting middleware");
      return next(action);
    }

    return callAPI().then(
      articles => {
        console.log(articles);

        return dispatch(fetchArticles(...payload, RECEIVED_ARTICLES, articles));
      },
      error => dispatch(fetchArticles(...payload, FAILURE_ARTICLES, error))
    );
  };
}

export default callNewsAPIMiddleware;
