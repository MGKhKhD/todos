import { withBranch } from "../HOC";

import SubTodoDescriptionInput from "./SubTodoDescriptionInput";
import SubTodoDescriptionH from "./SubTodoDescriptionP";

const SubTodoDescription = withBranch(
  SubTodoDescriptionInput,
  SubTodoDescriptionP
);

export default SubTodoDescription;
