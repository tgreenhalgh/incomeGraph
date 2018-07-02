import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import InputForm from './components/InputForm';
import './App.css';

class App extends Component {
  constructor() {
    super();
    /* prettier-ignore */
    this.state = {
      userInfo: {},
    };
  }

  updateData = data => {
    this.setState({ data });
  };

  updateUserInfo = userInfo => {
    this.setState({ userInfo });
  };

  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <Route
          exact
          path="/form"
          render={props => (
            <InputForm
              {...props}
              handleUserUpdate={this.updateUserInfo}
              data={JSON.stringify(this.state.userInfo)}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
