import React from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

export const BetActions = ({ openBetModal }) => {
  return (
    <Col xs={ 12 }>
      <Button bsSize='large' bsStyle='info' className='page-action-button pull-right'><Glyphicon glyph='list' className='puntlab-icon' />New Multi</Button>
      <Button onClick={ () => { openBetModal('new'); } } bsSize='large' bsStyle='success' className='page-action-button pull-right'><Glyphicon glyph='plus' className='puntlab-icon' />New Bet</Button>
    </Col>
  );
};

BetActions.propTypes = {
  openBetModal: React.PropTypes.func,
};
