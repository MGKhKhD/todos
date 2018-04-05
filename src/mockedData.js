import faker from "faker";

let TODO_COUNT = 2;
let COMMENT_COUNT = 4;

let todosIds = [0, 1];
let todos = [];

let commentIds = [0, 1, 2, 3];
let comments = [];

todosIds.forEach(id =>
  todos.push({
    todo: Math.random() > 0.5 ? faker.lorem.sentence() : faker.lorem.word(),
    id: id,
    completed: Math.random() > 0.8 ? true : false,
    fromWhere: "todosPage"
  })
);

commentIds.forEach(id => {
  if (id < 2) {
    comments.push({
      comment: faker.lorem.paragraph(),
      id: id,
      todoIndex: 0
    });
  } else {
    comments.push({
      comment: faker.lorem.paragraph(),
      id: id,
      todoIndex: 1
    });
  }
});

export const initialTodoState = {
  todosIds,
  todos
};

export const initialCommentState = {
  commentIds,
  comments
};
