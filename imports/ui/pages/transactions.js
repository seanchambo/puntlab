import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import PeriodNavigation from '../containers/period-navigation';
import TransactionActions from '../containers/transactions/actions';
import TransactionResults from '../containers/transactions/results';
import TransactionModal from '../containers/transactions/transaction-modal';
import TransactionTable from '../containers/transactions/table';

export const Transactions = () => (
  <div>
    <Row className='puntlab-page-header'>
      <Col xs={ 12 } sm={ 4 }>
        <p className="page-title">Transactions</p>
      </Col>
      <Col xs={ 12 } sm={ 8 }>
        <PeriodNavigation />
      </Col>
    </Row>
    <Row className='puntlab-page-actions'>
      <TransactionActions />
    </Row>
    <Row className='puntlab-page-subheader'>
      <Col xs={ 12 }>
        <p className="page-subtitle">My Results</p>
      </Col>
    </Row>
    <Row className='puntlab-page-subheader'>
      <TransactionResults />
    </Row>
    <Row className='puntlab-page-subheader'>
      <TransactionTable />
    </Row>
    <TransactionModal />
  </div>
);
