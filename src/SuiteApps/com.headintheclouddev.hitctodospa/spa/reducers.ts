import { ActionType } from './actions';
import { IToDo } from './TodoItem';

// Reducers take a state, apply an action, and return a new state

export default function appReducer(state: { todos: IToDo[], filter: string }, action: any) {
  return {
    todos: todosReducer(state.todos, action),
    filter: filterReducer(state.filter, action)
  }
}

function filterReducer(state: string, action: { type: Symbol, filter: string }) { // Here, state is the current filter and action.filter is the new filter
  if (action.type == ActionType.FILTER_TODO) {
    return action.filter;
  } else {
    return state;
  }
}

function todosReducer(state: IToDo[], action: { type: Symbol, title?: string, id?: string, todos?: IToDo[] }) {
  switch (action.type) {
    case ActionType.FETCH_TODOS:
      return action.todos;
    case ActionType.ADD_TODO: // The task has already been created in NetSuite; here we're just adding it to the app state
      const newTodo = { id: action.id, title: action.title, completed: false };
      return [newTodo, ...state];
    case ActionType.TOGGLE_TODO:
      return state.map(t => { // Iterate through all the todos in the list and just reverse the completed status on the one selected
        if (t.id == action.id)
          return { ...t, completed: !t.completed };
        return t;
      }, []);
    case ActionType.REMOVE_TODO:
      return state.filter(t => { // Return all the todos except for the one we're removing
        return t.id != action.id;
      });
    default:
      return state;
  }
}
