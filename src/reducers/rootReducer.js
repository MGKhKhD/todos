import { combineReducers } from "redux";

import todoReducers from "./todoReducers";
import externalPagesReducers from "./externalPagesReducers";

const rootReducer = combineReducers({
  todoState: todoReducers,
  externalState: externalPagesReducers
});

export default rootReducer;
