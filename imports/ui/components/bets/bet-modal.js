import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { Modal, Button } from 'react-bootstrap';
import BetForm from '../../containers/bets/bet-form';

export class BetModal extends React.Component {
  
  render() {
    
    const {
      open,
      closeBetModal,
      type,
    } = this.props;
    
    return (
      <Modal show={ open } onHide={ () => { closeBetModal(); } } bsSize='large'>
        <Modal.Header closeButton>
          <Modal.Title>{ lodash.capitalize(type) + ' Bet' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BetForm ref='betform' type={ type } />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={ () => { this._handleSaveBet(); } }>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  _handleSaveBet() {
    const betform = this.refs.betform.refs.wrappedInstance.refs.wrappedInstance;
    const odds = ReactDOM.findDOMNode(betform.refs.odds).value;
    const stake = ReactDOM.findDOMNode(betform.refs.stake).value;
    const nReturn = ReactDOM.findDOMNode(betform.refs.return).value;
    const notes = ReactDOM.findDOMNode(betform.refs.notes).value;
    
    if (this.props.type === 'new') {
      this.props.saveBet(stake, odds, nReturn, notes); 
    } else {
      this.props.editBet(stake, odds, nReturn, notes);
    }
  }
}

BetModal.propTypes = {
  open: React.PropTypes.bool,
  closeBetModal: React.PropTypes.func,
  saveBet: React.PropTypes.func,
  updateBet: React.PropTypes.func,
  type: React.PropTypes.string,
};

