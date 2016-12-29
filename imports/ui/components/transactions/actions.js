import React from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

export const TransactionActions = ({ openTransactionModal }) => {
  return (
    <Col xs={ 12 }>
      <Button onClick={ () => { openTransactionModal('deposit'); } } bsSize='large' bsStyle='info' className='page-action-button pull-right'><Glyphicon glyph='arrow-down' className='puntlab-icon' />New Deposit</Button>
      <Button onClick={ () => { openTransactionModal('withdrawl'); } } bsSize='large' bsStyle='success' className='page-action-button pull-right'><Glyphicon glyph='arrow-up' className='puntlab-icon' />New Withdrawl</Button>
    </Col>
  );
};

TransactionActions.propTypes = {
  openTransactionModal: React.PropTypes.func,
};
