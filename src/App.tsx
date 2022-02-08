import React from 'react';
import './App.css';
import { ABCTableProvider } from './context';
import Routes from './routes';

function App() {
  return (
    <div className='App min-h-screen min-w-full bg-pink-100 flex justify-center items-center'>
      <ABCTableProvider>
        <Routes />
      </ABCTableProvider>
    </div>
  );
}

export default App;
