import {Action} from "./actions";
import { JSX, useDispatch, useSelector } from "@uif-js/core";

function TodoFilterItem(props: { name: string }): JSX.Element { // This represents a single filter option (all, active, or completed)
  return <span>{props.name}</span>
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
