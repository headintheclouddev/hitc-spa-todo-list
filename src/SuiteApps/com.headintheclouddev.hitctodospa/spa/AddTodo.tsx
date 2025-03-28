import { JSX, VDom, useState, useDispatch } from '@uif-js/core';
import {Button, TextBox} from "@uif-js/component";
import { Action } from './actions';

export default function AddTodo(): JSX.Element {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  function handleInput(evt: TextBox.TextChangedArgs): void {
    setInput(evt.text);
  }

  function handleAdd(): void {
    if (input) {
      dispatch(Action.addToDo(input));
      setInput('');
    }
  }

  return (
    <VDom.Fragment>
      <div width="300px">
        <TextBox type={TextBox.Type.TEXT} placeholder="Enter new task..." onTextChanged={handleInput} text={input} />
        <Button label="Add" action={handleAdd} />
      </div>
    </VDom.Fragment>
  )
}
