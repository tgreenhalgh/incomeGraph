import React from 'react';
/* prettier-ignore */
import { Form, FormGroup, Label, Input } from 'reactstrap';
import Graph from './Graph';

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
      curTaxRate: 0.22,
      newTaxRate: 0.22,
      investmentReturn: 0.11,
      married: false,
      annualRaise: 0.04,
      percentInvested: 0.17,
      curData: [],
      newData: [],
      labels: [],
    };
  }

  componentDidMount() {
    this.calculateData();
  }

  calculateData = () => {
    let curData = [];
    let newData = [];
    let labels = [];
    for (let i = 0; i < 40; i++) {
      curData.push(25000 + i * 1000);
      newData.push(55000 + i * 1000);
      labels.push(2018 + i);
    }

    this.setState({ curData, newData, labels });

    /* prettier-ignore */
    let {age, retireAge, curIncome, newIncome, curTaxRate, newTaxRate, investmentReturn, married, annualRaise, percentInvested} = this.state;
    // how long 'til retire
    let yearsWorking = retireAge - age;
  };

  handleInputChange = e => {
    let name = e.target.name;
    this.setState({ [name]: e.target.value });
    if (name === 'curIncome' || name === 'newIncome') this.setTaxRate();
    this.calculateData();
  };

  handleCheckChange = e => {
    this.setState({ married: !this.state.married });
    this.setTaxRate();
  };

  calculateTaxRate = income => {
    /* 2018 tax form
  10%	Up to $9,525	        Up to $19,050
  12%	$9,526 to $38,700	    $19,051 to $77,400
  22%	38,701 to $82,500	    $77,401 to $165,000
  24%	$82,501 to $157,500	  $165,001 to $315,000
  32%	$157,501 to $200,000	$315,001 to $400,000
  35%	$200,001 to $500,000	$400,001 to $600,000
  37%	over $500,000	        over  $600,000
*/
    let double = 1;
    if (this.state.married) double = 2;

    if (income < 9525 * double + 1) {
      return 0.1;
    } else if (income < 38700 * double + 1) {
      return 0.12;
    } else if (income < 82500 * double + 1) {
      return 0.22;
    } else if (income < 157500 * double + 1) {
      return 0.24;
    } else if (income < 200000 * double + 1) {
      return 0.32;
    } else if (
      (income < 500001 && !this.state.married) ||
      (income < 600001 && this.state.married)
    ) {
      return 0.35;
    } else {
      return 0.37;
    }
  };

  setTaxRate = () => {
    let curTaxRate = this.calculateTaxRate(this.state.curIncome);
    let newTaxRate = this.calculateTaxRate(this.state.newIncome);
    this.setState({ curTaxRate, newTaxRate });
  };

  render() {
    return (
      <React.Fragment>
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
        <hr />
        <Graph
          curData={this.state.curData}
          newData={this.state.newData}
          labels={this.state.labels}
        />
      </React.Fragment>
    );
  }
}

export default InputForm;
