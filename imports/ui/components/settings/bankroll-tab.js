import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, FormControl, FormGroup, ControlLabel, InputGroup, Button, Glyphicon } from 'react-bootstrap';
import DateTimeField from "react-bootstrap-datetimepicker";
import moment from 'moment';

export class BankrollTab extends React.Component {
  
  componentWillMount() {
    if (this.props.transaction)
      this.props.changeBankrollDate(this.props.transaction.date);
    else
      this.props.changeBankrollDate(Number(new Date()));
  }
  
  render() {
    
    const {
      user,
      transaction,
      changeBankrollDate,
    } = this.props;
    
    return (
      <Row style={ {margin: '0px'} }>
        <Row>
          <Col xs={6}>
            <FormGroup controlId="name">
              <ControlLabel>Name</ControlLabel>
              <InputGroup style={ {width: '100%'} }>
              <InputGroup.Addon>F</InputGroup.Addon>
                <FormControl type="text" ref='name' defaultValue={ user.profile.bankroll.name ? user.profile.bankroll.name : ''} />
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormGroup controlId="initial">
              <ControlLabel>Initial Balance</ControlLabel>
              <InputGroup style={ {width: '100%'} }>
                <InputGroup.Addon><Glyphicon glyph='usd' /></InputGroup.Addon>
                <FormControl type="number" ref='initial' defaultValue={ transaction ? transaction.amount : '' }/>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormGroup controlId="date">
              <ControlLabel>Date</ControlLabel>
                <DateTimeField
                  defaultText={ user ? moment(user.profile.bankroll.date).format('DD/MM/YY') : "Date initial balance was added..." }
                  mode='date'
                  inputFormat='DD/MM/YY'
                  ref='date'
                  showToday={ true }
                  onChange={ selected => changeBankrollDate(selected) } />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12} style={ {textAlign: 'right'} }>
            <hr />
            <Button bsStyle='success' onClick={ () => { this._handleSave(); } }>Save</Button>
          </Col>
        </Row>
      </Row>
    ); 
  }
  
  _handleSave() {
    const name = ReactDOM.findDOMNode(this.refs.name).value;
    const initial = ReactDOM.findDOMNode(this.refs.initial).value;
    
    this.props.saveBankrollSettings(name, initial);
  }
}

BankrollTab.propTypes = {
  user: React.PropTypes.object,
  transaction: React.PropTypes.object,
  saveBankrollSettings: React.PropTypes.func,
  changeBankrollDate: React.PropTypes.func,
};