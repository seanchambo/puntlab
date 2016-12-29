import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import PeriodNavigation from '../containers/period-navigation';
import BetActions from '../containers/bets/actions';
import BetModal from '../containers/bets/bet-modal';
import BetResults from '../containers/bets/results';
import BetTabs from '../containers/bets/tabs';

export const Bets = () => (
  <div>
    <Row className='puntlab-page-header'>
      <Col xs={ 12 } sm={ 4 }>
        <p className="page-title">Bets</p>
      </Col>
      <Col xs={ 12 } sm={ 8 }>
        <PeriodNavigation />
      </Col>
    </Row>
    <Row className='puntlab-page-actions'>
      <BetActions />
    </Row>
    <Row className='puntlab-page-subheader'>
      <Col xs={ 12 }>
        <p className="page-subtitle">My Results</p>
      </Col>
    </Row>
    <Row className='puntlab-page-subheader'>
      <BetResults />
    </Row>
    <Row className='puntlab-page-subheader'>
      <BetTabs />
    </Row>
    <BetModal />
  </div>
);
