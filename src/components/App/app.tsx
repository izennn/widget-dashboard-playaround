import React, { FC } from 'react';
import './App.css';
// semantic ui react
import { Header } from 'semantic-ui-react';
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

const TopBar = () => {
  const topBarStyle = {
    height: '5%',
    minHeight: '100px',
    width: '100%',
    padding: '1em 1.5em 1em 1.5em',
    background: '#F8F8F8',
    display: 'flex',
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  const getDate = () => {
    let d = new Date();
    let dString = d.toString().split(' ');

    let Day = dString[0];
    let Month = dString[1];
    let date = dString[2];
    let Year = dString[3]

    // date.toString() returns as 'Day, Month Date Year ...'
    return `${date} ${Month} ${Year}, ${Day}`
  }

  return (
    <div style={topBarStyle}>
      <div
        className='headerDiv'
        style={{height: '100%'}}
      >
        <Header
          as='h2'
          textAlign='left'
          content='Welcome back, Alex'
          subheader={getDate()}
        />
      </div>
    </div>
  )
}

const App: FC<any> = () => {
  return (
    <div className="App" style={dashboardStyle}>
      <TopBar />
      <WidgetView />
    </div>
  );
}

export default App;
