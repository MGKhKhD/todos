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

function subredditAxios(newsTitle, sort, dispatch, query) {
  let id = searchId++;
  switch (sort) {
    case redditSortOptions[0]: {
      dispatch(requestForRelatedSocialPosts(id, newsTitle, sort, sort));
      return {
        fn: axios.get(
          `https://www.reddit.com/search.json?q=${query}&sort=${sort}&limit=20`
        ),
        id
      };
    }
    case redditSortOptions[1]: {
      dispatch(requestForRelatedSocialPosts(id, newsTitle, sort, sort));
      return {
        fn: axios.get(
          `https://www.reddit.com/search.json?q=${query}&sort=${sort}&limit=20`
        ),
        id
      };
    }
    case redditSortOptions[2]: {
      dispatch(requestForRelatedSocialPosts(id, newsTitle, sort, sort));
      return {
        fn: axios.get(
          `https://www.reddit.com/search.json?q=${query}&sort=${sort}&limit=20`
        ),
        id
      };
    }
    default: {
      dispatch(
        requestForRelatedSocialPosts(id, newsTitle, sort, redditSortOptions[3])
      );
      return {
        fn: axios.get(
          `https://www.reddit.com/search.json?q=${query}&sort=${
            redditSortOptions[3]
          }&limit=20`
        ),
        id
      };
    }
  }
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
    let fnCall = subredditAxios(newsTitle, sort, dispatch, query);
    promise.push(fnCall.fn);
    index.push(fnCall.id);
  });

  axios.all(promise).then(
    axios.spread(function(topOpt, newOpt, hotOpt, relevanceOpt) {
      let topData = topOpt.data.data.children.map(child => child.data);
      let newData = newOpt.data.data.children.map(child => child.data);
      let hotData = hotOpt.data.data.children.map(child => child.data);
      let relevanceData = relevanceOpt.data.data.children.map(
        child => child.data
      );

      if (topData.length > 0) {
        return dispatch(
          receivedRelatedSocialPosts(
            index[0],
            newsTitle,
            topData,
            redditSortOptions[0],
            socialOutlets[0]
          )
        );
      } else {
        return dispatch(
          failureRelatedSocialPosts(
            index[0],
            newsTitle,
            redditSortOptions[0],
            socialOutlets[0]
          )
        );
      }

      if (newData.length > 0) {
        return dispatch(
          receivedRelatedSocialPosts(
            index[1],
            newsTitle,
            newData,
            redditSortOptions[1],
            socialOutlets[0]
          )
        );
      } else {
        return dispatch(
          failureRelatedSocialPosts(
            index[1],
            newsTitle,
            redditSortOptions[1],
            socialOutlets[0]
          )
        );
      }

      if (hotData.length > 0) {
        return dispatch(
          receivedRelatedSocialPosts(
            index[2],
            newsTitle,
            hotData,
            redditSortOptions[2],
            socialOutlets[0]
          )
        );
      } else {
        return dispatch(
          failureRelatedSocialPosts(
            index[2],
            newsTitle,
            redditSortOptions[2],
            socialOutlets[0]
          )
        );
      }

      if (relevanceData.length > 0) {
        return dispatch(
          receivedRelatedSocialPosts(
            index[3],
            newsTitle,
            relevanceData,
            redditSortOptions[3],
            socialOutlets[0]
          )
        );
      } else {
        return dispatch(
          failureRelatedSocialPosts(
            index[3],
            newsTitle,
            redditSortOptions[3],
            socialOutlets[0]
          )
        );
      }
    })
  );
};
