import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Graph from './components/Graph';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          key: 'ABC',
          values: [
            {
              Client: 'ABC',
              sale: '202',
              year: '2000',
            },
            {
              Client: 'ABC',
              sale: '215',
              year: '2002',
            },
          ],
        },
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
        <Route exact path="/" component={Header} />
        <Route
          exact
          path="/graph"
          render={props => (
            <Graph
              {...props}
              handleUpdate={this.updateData}
              data={JSON.stringify(this.state.data)}
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
