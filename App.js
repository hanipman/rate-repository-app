import React from 'react';
import { NativeRouter } from 'react-router-native';
import Main from './src/components/Main.jsx';

const App = () => {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
};

export default App;