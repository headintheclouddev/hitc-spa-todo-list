import { JSX, SystemIcon } from '@uif-js/core';
import { Button, CheckBox } from "@uif-js/component";

export default function TodoItem(props: IToDo): JSX.Element {
  function handleToggle(event: { value: boolean, previousValue: boolean, reason: string }): void {
    console.log('handleToggle - now', event.value, 'was', event.previousValue, 'at', new Date());
  }

  function handleRemove() {
    console.log('TODO: Implement task deletion');
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
