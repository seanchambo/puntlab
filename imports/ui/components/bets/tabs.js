import React from 'react';
import { Col, Tabs, Tab, Panel } from 'react-bootstrap';
import { BetTable } from './table';

export const BetTabs = ({ changeBetTab, betTab, bets, resultedBets, pendingBets, deleteBet, loadBet }) => {
  return (
    <Col xs={12}>
      <Panel>
        <Tabs activeKey={ betTab } onSelect={ tab => changeBetTab(tab) } id="bet-tabs">
          <Tab eventKey={1} title="All Bets"><BetTable bets={ bets } deleteBet={ deleteBet } loadBet={ loadBet } type="all" /></Tab>
          <Tab eventKey={2} title="Resulted Bets"><BetTable bets={ resultedBets } deleteBet={ deleteBet } loadBet={ loadBet } type="resulted" /></Tab>
          <Tab eventKey={3} title="Pending Bets"><BetTable bets={ pendingBets } deleteBet={ deleteBet } loadBet={ loadBet } type="pending" /></Tab>
        </Tabs>
      </Panel>
    </Col>
  );
};

BetTabs.propTypes = {
  changeBetTab: React.PropTypes.func,
  betTab: React.PropTypes.number,
  bets: React.PropTypes.array,
  resultedBets: React.PropTypes.array,
  pendingBets: React.PropTypes.array,
  deleteBet: React.PropTypes.func,
  loadBet: React.PropTypes.func,
};