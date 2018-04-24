import { withBranch } from "../HOC";

import SubTodoTitleInput from "./SubTodoTitleInput";
import SubTodoTitleH from "./SubTodoTitleH";

const SubTodoTitle = withBranch(SubTodoTitleInput, SubTodoTitleH);

export default SubTodoTitle;
