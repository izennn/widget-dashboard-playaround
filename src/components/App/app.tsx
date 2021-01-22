import React, { FC } from 'react';
import './App.css';
// components
import WidgetView from '../widgetview';

const dashboardStyle = {
  height: '100vh',
  width: '100vw',
  background: '#F8F8F8',
  display: 'flex',
  flexDirection: 'column' as 'column',
  // border: '1px solid red'
}

const App: FC<any> = () => {
  return (
    <div className="App" style={dashboardStyle}>
      <WidgetView />
    </div>
  );
}

export default App;
