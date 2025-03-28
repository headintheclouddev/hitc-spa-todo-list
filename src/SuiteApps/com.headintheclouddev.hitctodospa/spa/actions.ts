import { fetchAPITodos, apiCreateTaskRecord, apiToggleTaskCompleted, apiDeleteTask } from "./api";

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
    // return { type: ActionType.TOGGLE_TODO, id };
    return async (dispatch: any) => {
      apiToggleTaskCompleted(id).then(() => {
        dispatch({ type: ActionType.TOGGLE_TODO, id });
      });
    }
  },
  removeToDo(id: string) {
    apiDeleteTask(id); // Here we don't wait for the task to be deleted; we kind of assume there isn't any problem there (probably not the best idea for real life, but a good experiment here)
    return { type: ActionType.REMOVE_TODO, id }; // If you do want to wait, do something like this:
    // return async (dispatch: any) => {
    //   apiDeleteTask(id);
    //   dispatch({ type: ActionType.REMOVE_TODO, id });
    // }
  },
  filterToDos(filter: string) {
    return { type: ActionType.FILTER_TODO, filter };
  }
}
