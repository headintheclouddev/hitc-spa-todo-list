import {JSX, Store, useEffect, useMemo, useState} from "@uif-js/core";
import log from 'N/log';
import { Heading, StackPanel } from "@uif-js/component";
import Header from "./Header";
import appReducer from "./reducers";
import TodoList from "./TodoList";
import { Action } from './actions';
import AddTodo from "./AddTodo";

const INITIAL_STATE = { todos: [], filter: 'all' };

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
        <StackPanel.Item>
          <Header />
        </StackPanel.Item>
        <StackPanel.Item>
          <AddTodo />
        </StackPanel.Item>
        <StackPanel.Item>
          <TodoList />
        </StackPanel.Item>
        <StackPanel.Item>
          <Heading>(filter)</Heading>
        </StackPanel.Item>
      </StackPanel>
    </Store.Provider>
  );
}
