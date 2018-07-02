import React from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import InputForm from './components/InputForm';
import './App.css';

const App = () => (
  <div className="App">
    <Route path="/" component={Header} />
    <Route exact path="/form" render={props => <InputForm {...props} />} />
  </div>
);

export default App;
