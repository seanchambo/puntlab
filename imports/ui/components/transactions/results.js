import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

export const TransactionResults = ({ balance, withdraw, deposit, result }) => {
  
  const resultColor = result >= 0 ? '#5cb85c' : '#d9534f';
  const withdrawColor = '#5bc0de';
  const depositColor = '#5bc0de';
  const balanceColor = '#5bc0de';
  
  return (
    <div>
      <Col xs={ 12 } sm={ 6 } lg={ 3 }>
        <Panel className='puntlab-banner'>
          <Row className='puntlab-banner-wrapper'>
            <Col xs={6}>
              <i className="material-icons puntlab-banner-icon" style={ {color: withdrawColor} }>arrow_downward</i>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-header'>${ withdraw }</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-content'>Withdrawn</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Col>
      <Col xs={ 12 } sm={ 6 } lg={ 3 }>
        <Panel className='puntlab-banner'>
          <Row className='puntlab-banner-wrapper'>
            <Col xs={6}>
              <i className="material-icons puntlab-banner-icon" style={ {color: depositColor} }>arrow_upward</i>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-header'>${ deposit }</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-content'>Deposited</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Col>
      <Col xs={ 12 } sm={ 6 } lg={ 3 }>
        <Panel className='puntlab-banner'>
          <Row className='puntlab-banner-wrapper'>
            <Col xs={6}>
              <i className="material-icons puntlab-banner-icon" style={ {color: resultColor} }>attach_money</i>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-header'>${ result }</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-content'>Profit/Loss</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Col>
      <Col xs={ 12 } sm={ 6 } lg={ 3 }>
        <Panel className='puntlab-banner'>
          <Row className='puntlab-banner-wrapper'>
            <Col xs={6}>
              <i className="material-icons puntlab-banner-icon" style={ {color: balanceColor} }>trending_up</i>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-header'>${ balance }</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-content'>Balance</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Col>
    </div>
  );
};

TransactionResults.propTypes = {
  balance: React.PropTypes.number,
  result: React.PropTypes.number,
  deposit: React.PropTypes.number,
  withdraw: React.PropTypes.number,
};
