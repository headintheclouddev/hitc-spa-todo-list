import {Action} from "./actions";
import { JSX, useDispatch, useSelector } from "@uif-js/core";
import {IAppState} from "./App";

function TodoFilterItem(props: { name: string }): JSX.Element { // This represents a single filter option (all, active, or completed)
  const dispatch = useDispatch();
  const filter = useSelector((state: IAppState) => state.filter); // This is the currently set filter

  function handleFilter(): void {
    console.log('handleFilter', props.name);
    dispatch(Action.filterToDos(props.name));
  }

  const style = { color: 'blue', cursor: 'pointer', fontWeight: filter == props.name ? 'bold' : 'normal' };

  return <span style={style} onClick={handleFilter}>{props.name}</span>
}

export default function TodoFilter(): JSX.Element { // Show three filter options, separated by a slash: /
  return (
    <div>
      <span>Filter: </span>
      <TodoFilterItem name="all" />{' / '}
      <TodoFilterItem name="active" />{' / '}
      <TodoFilterItem name="completed" />
    </div>
  )
}
