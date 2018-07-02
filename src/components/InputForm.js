import React from 'react';
/* prettier-ignore */
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

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
      curTaxRate: 0.2,
      newTaxRate: 0.12,
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

  calculateTaxRate = () => {
    /*
10%	Up to $9,525	Up to $19,050
12%	$9,526 to $38,700	$19,051 to $77,400
22%	38,701 to $82,500	$77,401 to $165,000
24%	$82,501 to $157,500	$165,001 to $315,000
32%	$157,501 to $200,000	$315,001 to $400,000
35%	$200,001 to $500,000	$400,001 to $600,000
37%	over $500,000	over $600,000
*/
    let curTaxRate, newTaxRate;
    let curIncome = this.state.curIncome;
    let newIncome = this.state.newIncome;
    //current tax rate
    if (!this.state.married) {
      if (curIncome < 9526) curTaxRate = 0.1;
    } else if (curIncome < 38701) {
      curTaxRate = 0.12;
    } else if (curIncome < 82501) {
      curTaxRate = 0.22;
    } else if (curIncome < 157501) {
      curTaxRate = 0.24;
    } else if (curIncome < 200001) {
      curTaxRate = 0.32;
    } else if (curIncome < 500000) {
      curTaxRate = 0.35;
    } else {
      curIncome = 0.37;
    }
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
