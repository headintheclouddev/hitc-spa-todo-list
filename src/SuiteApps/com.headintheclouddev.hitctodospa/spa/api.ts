import {IToDo} from "./TodoItem";
import query from 'N/query';
import record from 'N/record';
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

export async function apiCreateTaskRecord(title: string) {
  const taskRecord = await record.create.promise({ type: 'task' });
  taskRecord.setValue('title', title);
  taskRecord.setValue('assigned', runtime.getCurrentUser().id);
  const taskId = await taskRecord.save.promise();
  return String(taskId);
}

export async function apiToggleTaskCompleted(taskId: string) {
  const taskQuery = await query.runSuiteQL.promise({ query: `SELECT status FROM task WHERE id = ${taskId}` });
  const results: { status: 'NOTSTART'|'PROGRESS'|'COMPLETE' }[] = taskQuery.asMappedResults() as any;
  record.submitFields.promise({
    type: 'task',
    id: taskId,
    values: { status: results[0].status == 'COMPLETE' ? 'PROGRESS' : 'COMPLETE' }
  }).then((id) => {
    console.log('apiUpdateTaskCompleted - task updated', id, new Date());
  }).catch((err) => {
    alert(err); // Is there a UIF alert?
  });
}

export function apiDeleteTask(taskId: string) {
  record.delete.promise({ type: 'task', id: taskId }).then(() => {
    console.log('apiDeleteTask - task deleted successfully', taskId, new Date());
  });
}
