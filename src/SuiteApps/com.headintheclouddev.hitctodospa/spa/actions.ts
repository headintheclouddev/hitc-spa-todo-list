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

}
