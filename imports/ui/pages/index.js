import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import PeriodNavigation from '../containers/period-navigation';

export const Index = () => (
  <div>
    <Row className='puntlab-page-header'>
      <Col xs={ 12 } sm={ 4 }>
        <p className="page-title">Dashboard</p>
      </Col>
      <Col xs={ 12 } sm={ 8 }>
        <PeriodNavigation />
      </Col>
    </Row>
  </div>
);
