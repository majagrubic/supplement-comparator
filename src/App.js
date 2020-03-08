import React from 'react';
import Main from './features/components/Main';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';
import { Provider } from 'react-redux';
import configureStore from './store';

function App() {
  return (
    <Provider store={configureStore}>
      <Main />
    </Provider>
  );
}

export default App;
