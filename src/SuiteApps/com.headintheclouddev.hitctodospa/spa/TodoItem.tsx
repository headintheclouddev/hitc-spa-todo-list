import { JSX, SystemIcon, useDispatch } from '@uif-js/core';
import { Button, CheckBox } from "@uif-js/component";
import {Action} from './actions';

export default function TodoItem(props: IToDo): JSX.Element {
  const dispatch = useDispatch();

  function handleToggle(event: { value: boolean, previousValue: boolean, reason: string }): void {
    if (event.reason != 'click') return; // This seems to fire every time the component draws!
    console.log('handleToggle - now', event.value, 'was', event.previousValue, 'at', new Date());
    dispatch(Action.toggleToDo(props.id));
  }

  function handleRemove() {
    dispatch(Action.removeToDo(props.id));
  }

  return (
    <div style={{ width: 400, height: 25 }}>
      <CheckBox value={props.completed} label={props.title} action={handleToggle} />
      <Button icon={SystemIcon.DELETE} action={handleRemove} />
    </div>
  )
}

export interface IToDo {
  title:     string;
  completed: boolean;
  id:        string;
}
