import React from 'react';
/* prettier-ignore */
import { Form, FormGroup, Label, Input } from 'reactstrap';
/* prettier-ignore */
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, CardImgOverlay } from 'reactstrap';
import styled from 'styled-components';
import Graph from './Graph';
import './InputForm.css';

const StyledDiv = styled.div`
  //background: red;
`;

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    //todo: maybe add age when get married
    this.state = {
      age: 25,
      retireAge: 65,
      curIncome: 45000,
      newIncome: 70000,
      curInvestment: 0,
      newInvestment: 0,
      investmentReturn: 0.1,
      married: false,
      annualRaise: 0.04,
      percentOfIncomeToInvest: 17,
      curData: [],
      newData: [],
      newDataNoInvest: [],
      labels: [],
      curMax: 0,
      newMax: 0,
      paidBack: 0,
    };
  }

  componentDidMount() {
    this.calculateData();
  }

  calculateData = () => {
    let { age, retireAge } = this.state;
    let yearsWorking = retireAge - age;

    //true means current salary
    this.makeDataArr(yearsWorking, true);
    //false means new salary
    this.makeDataArr(yearsWorking, false);
  };

  makeDataArr = (years, current) => {
    let annualSalary, maxSalary, percentOfIncomeToInvest;
    let labels = [];
    let yearStart = new Date().getFullYear() + 1;

    if (current) {
      annualSalary = this.state.curIncome;
      maxSalary = 100000;
      // percentOfIncomeToInvest = 0.0;
      percentOfIncomeToInvest = 0.17;
    } else {
      annualSalary = this.state.newIncome;
      maxSalary = 150000;
      // percentOfIncomeToInvest = 0;
      percentOfIncomeToInvest = this.state.percentOfIncomeToInvest / 100;
    }

    let dataArr = [];
    let newDataNoInvest = [];
    let owedLambda = 0;
    let investedTotal = 0;
    let salaryTotal = 0;
    let netWorth = 0;

    for (let i = 0; i <= years; i++) {
      let afterTaxesSalary =
        annualSalary - annualSalary * this.calculateTaxRate(annualSalary);
      let investedAmount = afterTaxesSalary * percentOfIncomeToInvest;
      let afterInvestedSalary = afterTaxesSalary - investedAmount;

      //pay back Lambda School
      if (!current && owedLambda < 30001 && i < 2 && annualSalary > 50000) {
        owedLambda += annualSalary * 0.17;
        if (owedLambda > 30000) investedAmount = owedLambda - 30000;
        else investedAmount = 0;
      }

      investedTotal =
        investedTotal * (1 + this.state.investmentReturn) + investedAmount;

      salaryTotal += afterInvestedSalary;
      netWorth = salaryTotal + investedTotal;
      //for no invest graph
      newDataNoInvest.push(salaryTotal);
      dataArr.push(Number(netWorth.toFixed(2)));

      //labels for graph
      labels.push(yearStart + i);

      //annual raise
      if (annualSalary < maxSalary) annualSalary *= 1 + this.state.annualRaise;
    }
    if (current) {
      this.setState({
        curData: dataArr,
        curMax: dataArr[dataArr.length - 1],
        newDataNoInvest,
        labels,
      });
    } else {
      this.setState({
        newData: dataArr,
        newMax: dataArr[dataArr.length - 1],
        newDataNoInvest,
        labels,
      });
    }
  };

  handleInputChange = e => {
    let name = e.target.name;
    let value = e.target.value;
    // if (name === 'age' && value < 18) value = 18;
    // if (name === 'retireAge' && value <= this.state.age)
    //   value = this.state.age + 1;
    if (name === 'curIncome' && value < 0) value = 0;
    if (name === 'newIncome' && value < 0) value = 0;
    this.setState({ [name]: value });
    setTimeout(() => {
      this.calculateData();
    }, 0);
  };

  handleCheckChange = e => {
    this.setState({ married: !this.state.married });
    setTimeout(() => {
      this.calculateData();
    }, 0);
  };

  calculateTaxRate = income => {
    /* 2018 tax form
      10%	Up       to   $9,525	      Up to  $19,050
      12%	$9,526   to  $38,700	 $19,051 to  $77,400
      22%	38,701   to  $82,500	 $77,401 to $165,000
      24%	$82,501  to $157,500	$165,001 to $315,000
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

  render() {
    return (
      <React.Fragment>
        <StyledDiv>
          The calculations are starting January 1, {this.state.labels[0]} and
          assuming the first two years are paying back Lambda School at 17%,
          then investing that 17% in a general S&P 500 Index fund (~10%
          historical return over long periods of time).<br />
          {this.state.newMax && this.state.curMax ? (
            <span>
              Lambda total ({this.state.newMax.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}){' - '}pre total: ({this.state.curMax.toLocaleString(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                },
              )}){':  '}
              for a difference of{' '}
              <strong>
                {(this.state.newMax - this.state.curMax).toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  },
                )}
              </strong>
            </span>
          ) : null}
        </StyledDiv>
        <hr />
        <Graph
          curData={this.state.curData}
          newData={this.state.newData}
          labels={this.state.labels}
        />
        <Form inline className="form">
          <div className="row all">
            <div className="col-sm all">
              <FormGroup>
                <Label style={{ padding: '0 5px' }}>Age</Label>
                <Input
                  style={{ width: '70px' }}
                  type="number"
                  name="age"
                  onChange={this.handleInputChange}
                  value={this.state.age}
                />
              </FormGroup>
            </div>
            <div className="col-sm-2 all">
              <FormGroup>
                <Label style={{ padding: '0 5px' }}>Retire Age</Label>
                <Input
                  style={{ width: '70px' }}
                  type="number"
                  name="retireAge"
                  onChange={this.handleInputChange}
                  value={this.state.retireAge}
                />
              </FormGroup>
            </div>
            <div className="col-sm-2 all">
              <FormGroup>
                <Label style={{ padding: '0 5px' }}>% of income invested</Label>
                <Input
                  style={{ width: '70px' }}
                  type="number"
                  name="percentOfIncomeToInvest"
                  onChange={this.handleInputChange}
                  value={this.state.percentOfIncomeToInvest}
                />
              </FormGroup>
            </div>
            <div className="col-sm all">
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
          <div className="row all">
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
            <div className="col all">
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
      </React.Fragment>
    );
  }
}

export default InputForm;
