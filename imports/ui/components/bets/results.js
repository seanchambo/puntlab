import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';

export const BetResults = ({ count, roi, result }) => {
  
  const resultColor = result >= 0 ? '#5cb85c' : '#d9534f';
  const roiColor = roi >= 100 ? '#5cb85c' : '#d9534f';
  const betsColor = '#5bc0de';
  
  return (
    <div>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
        <Panel className='puntlab-banner'>
          <Row className='puntlab-banner-wrapper'>
            <Col xs={6}>
              <i className="material-icons puntlab-banner-icon" style={ {color: betsColor} }>assignment</i>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-header'>{ count }</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-content'>Bets</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Col>
      <Col xs={ 12 } sm={ 6 } md={ 4 }>
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
      <Col xs={ 12 } sm={ 6 } md={ 4 } smOffset={ 3 } mdOffset={ 0 }>
        <Panel className='puntlab-banner'>
          <Row className='puntlab-banner-wrapper'>
            <Col xs={6}>
              <i className="material-icons puntlab-banner-icon" style={ {color: roiColor} }>equalizer</i>
            </Col>
            <Col xs={6}>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-header'>{ roi }%</p>
                </Col>
              </Row>
              <Row>
                <Col xs={12}>
                  <p className='puntlab-banner-content'>ROI</p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Panel>
      </Col>
    </div>
  );
};

BetResults.propTypes = {
  count: React.PropTypes.number,
  roi: React.PropTypes.string,
  result: React.PropTypes.number,
};
