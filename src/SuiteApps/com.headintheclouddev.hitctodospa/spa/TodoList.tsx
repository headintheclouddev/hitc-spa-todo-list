import { IToDo } from './TodoItem';
import TodoItem from './TodoItem';

export default function TodoList() {
  const todos: IToDo[] = [
    { title: "Create placeholder components", completed: true,  id: '1' },
    { title: "Implement state management",    completed: false, id: '2' }
  ]

  const todoItems = todos.map((item) => {
    return <TodoItem {...item} />
  });

  return <div>{todoItems}</div>
}