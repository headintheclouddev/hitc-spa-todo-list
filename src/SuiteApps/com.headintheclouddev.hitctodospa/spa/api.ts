import {IToDo} from "./TodoItem";
import query from 'N/query';
import runtime from 'N/runtime';

export async function fetchAPITodos(): Promise<IToDo[]> {
  const todos: IToDo[] = [];

  const taskQuery = await query.runSuiteQL.promise({ query: `SELECT id, title, status FROM task WHERE assigned = ${runtime.getCurrentUser().id}` });
  const results: { id: number, title: string, status: string }[] = taskQuery.asMappedResults() as any;
  for (const result of results) {
    todos.push({ id: String(result.id), title: result.title, completed: result.status == 'COMPLETE' });
  }

  return todos;
}
