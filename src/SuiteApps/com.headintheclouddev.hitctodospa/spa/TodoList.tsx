import { IToDo } from './TodoItem';
import TodoItem from './TodoItem';
import { JSX, useMemo, useSelector } from "@uif-js/core"; // Page 339

export default function TodoList(): JSX.Element {
  const filter = useSelector((state: { filter: string }) => state.filter);
  const todos = useSelector((state: { todos: IToDo[] }) => state.todos); // Page 339

  const filteredTodos = useMemo(() => {
    console.log('TodoList - filteredTodos', filter, todos);
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed === true);
      default:
      case 'all':
        return todos;
    }
  }, [filter, todos]);

  const todoItems = filteredTodos.map((item) => {
    return <TodoItem {...item} />
  });

  return <div>{todoItems}</div>
}
