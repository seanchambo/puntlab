import React from 'react';
import { Row, Col, FormGroup, ControlLabel, FormControl, InputGroup } from 'react-bootstrap';
import DateTimeField from "react-bootstrap-datetimepicker";

export class TransactionForm extends React.Component {
  
  render() {
    return (
      <form>
        <Row>
          <Col xs={12}>
            <FormGroup controlId="date">
              <ControlLabel>Date</ControlLabel>
                <DateTimeField
                  mode='date'
                  inputFormat='DD/MM/YY'
                  ref='date'
                  defaultText={ '' }
                  showToday={ true }
                  onChange={ selected => this.props.changeTransactionFormDate(selected) } />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup controlId="amount">
              <ControlLabel>Amount</ControlLabel>
              <InputGroup>
                <InputGroup.Addon>$</InputGroup.Addon>
                <FormControl type="number" ref='amount' />
                <InputGroup.Addon>.00</InputGroup.Addon>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <FormGroup controlId="notes">
              <ControlLabel>Notes</ControlLabel>
              <FormControl componentClass="textarea" placeholder="Justification, details etc..." ref='notes' />
            </FormGroup>
          </Col>
        </Row>
      </form>
    );
  }
}

TransactionForm.propTypes = {
  changeBetFormDate: React.PropTypes.func,
};

