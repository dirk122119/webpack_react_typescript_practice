import * as React from 'react';
import { render } from 'react-dom';
import {Hello} from "./components/Hello";
import ThemeContext from './components/ThemeContext';
import Child from "./components/Child"
import {Test} from "./components/TestComponent"
import { createRoot } from 'react-dom/client';

const APP = () => {
  const [theme, setTheme] = React.useState('light');

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }
  
  return (
    <ThemeContext.Provider value={theme}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Child />
    </ThemeContext.Provider>
  );
}

const HelloAPP = ()=>(<Test></Test>)

const root = createRoot(document.getElementById('root'));
const hello = createRoot(document.getElementById('hello'));
root.render(<APP/>);
hello.render(<HelloAPP/>);