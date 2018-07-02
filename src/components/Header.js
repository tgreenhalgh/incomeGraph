import React from 'react';
import { Button } from 'reactstrap';

const Header = props => {
  const homeClick = () => {
    props.history.push('/');
  };

  const formClick = () => {
    props.history.push('/form');
  };

  return (
    <div className="row">
      <div className="col-sm-4">
        <Button
          color="primary"
          style={{ marginLeft: '10%' }}
          onClick={homeClick}
        >
          IncomeGraph
        </Button>
      </div>
      <div className="col-sm-8">
        <Button color="info" onClick={formClick}>
          Form
        </Button>
      </div>
    </div>
  );
};

export default Header;
