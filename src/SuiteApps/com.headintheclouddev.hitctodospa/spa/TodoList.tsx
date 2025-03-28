import { IToDo } from './TodoItem';
import TodoItem from './TodoItem';
import { JSX, useSelector } from '@uif-js/core';

export default function TodoList(): JSX.Element {
  const todos = useSelector((state: { todos: IToDo[] }) => state.todos);

  const todoItems = todos.map((item) => {
    return <TodoItem {...item} />
  });

  return <div>{todoItems}</div>
}
