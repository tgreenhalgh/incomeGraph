import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Graph from './components/Graph';
import './App.css';

class App extends Component {
  constructor() {
    super();
    /* prettier-ignore */
    this.state = {
      data: [20000,21000,22000,24000,25000,26000,27000,28000,29000,30000,31000,32000,33000,34000,35000
      ],
      userInfo: {},
    };
  }

  updateData = data => {
    this.setState({ data });
  };

  updateUserInfo = data => {
    this.setState({ data });
  };

  render() {
    return (
      <div className="App">
        <Route path="/" component={Header} />
        <Route
          exact
          path="/graph"
          render={props => (
            <Graph
              {...props}
              handleUpdate={this.updateData}
              data={this.state.data}
            />
          )}
        />
        <Route
          exact
          path="/form"
          render={props => (
            <InputForm
              {...props}
              handleUpdate={this.updateUserInfo}
              data={JSON.stringify(this.state.userInfo)}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
