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
    const newId = '0'; // TODO: Create task record in NetSuite
    return { type: ActionType.ADD_TODO, newId, title };
  },
  fetchToDo() {
    // TODO: Look up tasks from NetSuite
    const todos = [
      { title: "Create placeholder components", completed: true,  id: '1' },
      { title: "Implement state management",    completed: false, id: '2' }
    ];
    return { type: ActionType.FETCH_TODOS, todos };
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
