import React from 'react';
/* prettier-ignore */
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    //todo: maybe add age when get married
    this.state = {
      name: '',
      age: 25,
      retireAge: 65,
      curIncome: 45000,
      newIncome: 70000,
      curTaxes: 0.2,
      newTaxes: 0.12,
      investments: 0.11,
      married: false,
      annualRaise: 0.04,
    };
  }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCheckChange = e => {
    this.setState({ married: !this.state.married });
  };

  render() {
    return (
      <Form inline>
        <div className="row">
          <div className="col-sm-4">
            <FormGroup>
              <Label>Name</Label>
              <Input
                name="name"
                onChange={this.handleInputChange}
                placeholder="Enter your name"
                value={this.state.name}
              />
            </FormGroup>
          </div>
          <div className="col-sm">
            <FormGroup>
              <Label style={{ padding: '0 5px' }}>Age</Label>
              <Input
                style={{ width: '35%' }}
                type="number"
                name="age"
                onChange={this.handleInputChange}
                value={this.state.age}
              />
            </FormGroup>
          </div>
          <div className="col-sm">
            <FormGroup>
              <Label style={{ padding: '0 5px' }}>Retire Age</Label>
              <Input
                style={{ width: '36%' }}
                type="number"
                name="retireAge"
                onChange={this.handleInputChange}
                value={this.state.retireAge}
              />
            </FormGroup>
          </div>
          <div className="col-sm">
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="married"
                  onChange={this.handleCheckChange}
                  value={this.state.married}
                />
                Married
              </Label>
            </FormGroup>
            <Button>Submit</Button>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <FormGroup>
              <Label style={{ padding: '0 5px' }}>Current Salary</Label>
              <Input
                style={{ width: '50%' }}
                type="number"
                name="curIncome"
                onChange={this.handleInputChange}
                value={this.state.curIncome}
              />
            </FormGroup>
          </div>
          <div className="col">
            <FormGroup>
              <Label style={{ padding: '0 5px' }}>New Salary</Label>
              <Input
                style={{ width: '50%' }}
                type="number"
                name="newIncome"
                onChange={this.handleInputChange}
                value={this.state.newIncome}
              />
            </FormGroup>
          </div>
        </div>
      </Form>
    );
  }
}

export default InputForm;
