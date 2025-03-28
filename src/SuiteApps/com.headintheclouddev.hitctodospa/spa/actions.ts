import { fetchAPITodos, apiCreateTaskRecord } from "./api";

// This is a list of possible actions.  The reducer(s) take a state, apply one of these actions, and return a new state.
export const ActionType = {
  ADD_TODO: Symbol('addToDo'),
  FETCH_TODOS: Symbol('fetchToDo'),
  TOGGLE_TODO: Symbol('toggleToDo'),
  REMOVE_TODO: Symbol('removeToDo'),
  FILTER_TODO: Symbol('filterToDo')
};

// Action creator functions handle possible side effects (such as CRUD operations), so that the reducer function can be pure.
export const Action = {
  addToDo(title: string) {
    return async (dispatch: any) => {
      const id = await apiCreateTaskRecord(title);
      dispatch({ type: ActionType.ADD_TODO, id, title });
    }
  },
  fetchToDo() {
    return async (dispatch: any) => {
      const todos = await fetchAPITodos();
      dispatch({ type: ActionType.FETCH_TODOS, todos })
    }
    // return { type: ActionType.FETCH_TODOS, todos };
  },
  toggleToDo(id: string) {
    // TODO: Update task status in NetSuite
    return { type: ActionType.TOGGLE_TODO, id };
  },
  removeToDo(id: string) {
    // TODO: Delete task record in NetSuite
    return { type: ActionType.REMOVE_TODO, id };
  },
  filterToDos(filter: string) {
    return { type: ActionType.FILTER_TODO, filter };
  }
}
