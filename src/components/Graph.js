import React from 'react';
import { Line } from 'react-chartjs-2';

class Graph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: '',
            fill: false,
            lineTension: 0,
            backgroundColor: '',
            borderColor: '',
            borderCapStyle: '',
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: '',
            pointBorderColor: '',
            pointBackgroundColor: '',
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            pointHoverBackgroundColor: '',
            pointHoverBorderColor: '',
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            pointHitRadius: 0,
            data: [],
          },
          {
            label: '',
            fill: false,
            lineTension: 0,
            backgroundColor: '',
            borderColor: '',
            borderCapStyle: '',
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: '',
            pointBorderColor: '',
            pointBackgroundColor: '',
            pointBorderWidth: 0,
            pointHoverRadius: 0,
            pointHoverBackgroundColor: '',
            pointHoverBorderColor: '',
            pointHoverBorderWidth: 0,
            pointRadius: 0,
            pointHitRadius: 0,
            data: [],
          }
        ]
      }
    }
  }

  componentDidUpdate(prevProps) {
    console.log(this.props);
    if(this.props !== prevProps) 
    {this.setState({
      chartData: {
        labels: this.props.labels,
        datasets: [
          {
            label: 'Current Income',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.props.curData,
          },
          {
            label: 'New Income',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.props.newData,
          }
        ]
      }
    })}
  }

  render() {
    return (
      <div className="chart">
        <Line data={this.state.chartData}
        options={{
          title: {
            display: true,
            text: 'Current and New Income Projections',
            fontSize: 25,
          }
        }} 
        datasetKeyProvider={() => Math.random()}
        />
      </div>
    )
  }

}

export default Graph;




