import App from './App';
import {JSX} from '@uif-js/core';

export function run(context: { baseUrl: string, setLayout(name: string): void, setContent(app: JSX.Element): void }) {
  console.log('SpaClient version 250328a - run', context);
  context.setLayout('application'); // Make the application fill the entire viewport
  context.setContent(<App />);
}
