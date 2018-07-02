import React from 'react';
import { Button } from 'reactstrap';

const Header = () => (
  <div className="row">
    <div className="col-sm-4">
      <Button color="primary" style={{ marginLeft: '10%' }}>
        IncomeGraph
      </Button>
    </div>
    <div className="col-sm-8">
      <Button color="info">Form</Button>
      <Button color="info">Graph</Button>
    </div>
  </div>
);

export default Header;
