import { JSX, VDom } from '@uif-js/core';
import {Button, TextBox} from "@uif-js/component";

export default function AddTodo(): JSX.Element {
  return (
    <VDom.Fragment>
      <div width="300px">
        <TextBox type={TextBox.Type.TEXT} placeholder="Enter new task..." />
        <Button label="Add" />
      </div>
    </VDom.Fragment>
  )
}
