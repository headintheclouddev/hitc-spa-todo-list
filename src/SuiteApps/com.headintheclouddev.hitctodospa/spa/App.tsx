import {JSX, Store, useEffect, useMemo, useState} from "@uif-js/core";
import log from 'N/log';
import { StackPanel } from "@uif-js/component";
import Header from "./Header";
import appReducer from "./reducers";
import TodoList from "./TodoList";
import { Action } from './actions';
import AddTodo from "./AddTodo";
import TodoFilter from "./TodoFilter";
import {IToDo} from "./TodoItem";

const INITIAL_STATE: IAppState = { todos: [], filter: 'all' }; // Is it better to have this as a global variable, or declare it inside the component below?

export default function App(): JSX.Element {
  log.debug('App', `Initializing at ${new Date()}`);
  const [state, setState] = useState(INITIAL_STATE);
  const store = useMemo(() => {
    return Store.create({ // Page 320
      reducer: appReducer,
      state,
      onStateChanged: ({ currentState }) => setState(currentState)
    });
  });

  useEffect(() => { // Keeps the state hook in sync with the redux store state
    return store.subscribe(() => setState(store.getState()));
  }, []);

  useEffect(() => {
    console.log('useEffect - fetchToDo', new Date());
    store.dispatch(Action.fetchToDo());
  }, []);

  return (
    <Store.Provider store={store}>
      <StackPanel alignment={StackPanel.Alignment.START} orientation={StackPanel.Orientation.VERTICAL}>
        <StackPanel.Item><Header /></StackPanel.Item>
        <StackPanel.Item><AddTodo /></StackPanel.Item>
        <StackPanel.Item><TodoList /></StackPanel.Item>
        <StackPanel.Item><TodoFilter /></StackPanel.Item>
      </StackPanel>
    </Store.Provider>
  );
}

export interface IAppState {
  todos: IToDo[];
  filter: string;
}
