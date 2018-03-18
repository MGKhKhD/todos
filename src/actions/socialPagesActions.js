import axios from "axios";

import {
  SEARCH_FOR_RELATED_SOCIAL_POSTS_TO_ARTICLE,
  RECEIVED_SOCIAL_POSTS_RELATED_TO_ARTICLE,
  FAILURE_SOCIAL_POSTS_RELATED_TO_ARTICLE,
  redditSortOptions,
  socialOutlets
} from "../types";

export function requestForRelatedSocialPosts(id, newsTitle, sort, outlet) {
  return {
    type: SEARCH_FOR_RELATED_SOCIAL_POSTS_TO_ARTICLE,
    id,
    newsTitle,
    outlet,
    sort
  };
}

export function receivedRelatedSocialPosts(
  id,
  newsTitle,
  articles,
  sort,
  outlet
) {
  return {
    type: RECEIVED_SOCIAL_POSTS_RELATED_TO_ARTICLE,
    id,
    newsTitle,
    articles,
    sort,
    outlet
  };
}

export function failureRelatedSocialPosts(id, newsTitle, sort, outlet) {
  return {
    type: FAILURE_SOCIAL_POSTS_RELATED_TO_ARTICLE,
    id,
    newsTitle,
    sort,
    outlet
  };
}

let searchId = 0;

function redditAxios(newsTitle, sort, dispatch, query) {
  let id = searchId++;
  dispatch(requestForRelatedSocialPosts(id, newsTitle, sort, socialOutlets[0]));
  return {
    fn: axios.get(
      `https://www.${
        socialOutlets[0]
      }.com/search.json?q=${query}&sort=${sort}&limit=20`
    ),
    id
  };
}

export const searchForRelatedSocialPostsToThisArticle = (
  article,
  query
) => dispatch => {
  let newsTitle = article.title;

  let promise = [];
  let index = [];
  // redditSortOptions = ["top", "new", "hot", "relevance"];
  redditSortOptions.forEach(sort => {
    let fnCall = redditAxios(newsTitle, sort, dispatch, query);
    promise.push(fnCall.fn);
    index.push(fnCall.id);
  });

  let receivedPosts = {};
  axios.all(promise).then(
    axios.spread(function(topOpt, newOpt, hotOpt, relevanceOpt) {
      receivedPosts[`${redditSortOptions[0]}`] = topOpt.data.data.children.map(
        child => child.data
      );
      receivedPosts[`${redditSortOptions[1]}`] = newOpt.data.data.children.map(
        child => child.data
      );
      receivedPosts[`${redditSortOptions[2]}`] = hotOpt.data.data.children.map(
        child => child.data
      );
      receivedPosts[
        `${redditSortOptions[3]}`
      ] = relevanceOpt.data.data.children.map(child => child.data);

      let j = 0;
      for (let key in receivedPosts) {
        if (receivedPosts[key].length > 0) {
          dispatch(
            receivedRelatedSocialPosts(
              index[j],
              newsTitle,
              receivedPosts[key],
              redditSortOptions[j],
              socialOutlets[0]
            )
          );
        } else {
          dispatch(
            failureRelatedSocialPosts(
              index[j],
              newsTitle,
              redditSortOptions[j],
              socialOutlets[0]
            )
          );
        }
        j++;
      }
    })
  );
};
