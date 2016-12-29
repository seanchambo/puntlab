import React from 'react';
import ReactDOM from 'react-dom';
import lodash from 'lodash';
import { Modal, Button } from 'react-bootstrap';
import TransactionForm from '../../containers/transactions/transaction-form';

export class TransactionModal extends React.Component {
  
  render() {
    
    const {
      open,
      closeTransactionModal,
      type,
      saveTransaction,
    } = this.props;
    
    return (
      <Modal show={ open } onHide={ () => { closeTransactionModal(); } }>
        <Modal.Header closeButton>
          <Modal.Title>{ 'New ' + lodash.capitalize(type) }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm ref='transactionform' />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={ () => { this._handleSaveBet(); } }>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  _handleSaveBet() {
    const transactionform = this.refs.transactionform.refs.wrappedInstance.refs.wrappedInstance;
    const amount = ReactDOM.findDOMNode(transactionform.refs.amount).value;
    const notes = ReactDOM.findDOMNode(transactionform.refs.notes).value;
  
    this.props.saveTransaction(amount, this.props.type, notes); 
  }
}

TransactionModal.propTypes = {
  open: React.PropTypes.bool,
  closeTransactionModal: React.PropTypes.func,
  type: React.PropTypes.string,
  saveTransaction: React.PropTypes.func,
};
