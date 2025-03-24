import { IToDo } from './TodoItem';
import TodoItem from './TodoItem';
import { useSelector } from '@uif-js/core';

export default function TodoList() {
  // const todos: IToDo[] = [
  //   { title: "Create placeholder components", completed: true,  id: '1' },
  //   { title: "Implement state management",    completed: false, id: '2' }
  // ]
  const todos = useSelector((state: { todos: IToDo[] }) => state.todos);

  const todoItems = todos.map((item) => {
    return <TodoItem {...item} />
  });

  return <div>{todoItems}</div>
}