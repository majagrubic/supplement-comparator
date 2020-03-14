import React from 'react';
import Main from './features/components/Main';
import './App.css';
import '@elastic/eui/dist/eui_theme_light.css';
import { Provider } from 'react-redux';
import configureStore from './store';
import {BrowserRouter as Router} from "react-router-dom";

function App() {
  return (
    <Provider store={configureStore}>
        <Router>
            <Main />
      </Router>
    </Provider>
  );
}

export default App;
