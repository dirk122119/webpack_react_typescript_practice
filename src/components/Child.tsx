import * as React from 'react';
import ThemeContext from './ThemeContext';

function Child() {
  // 使用 useContext Hook 获取 Context 的值
  const theme = React.useContext(ThemeContext);

  return (
    <div>
      <p>The current theme is: {theme}</p>
    </div>
  );
}

export default Child;