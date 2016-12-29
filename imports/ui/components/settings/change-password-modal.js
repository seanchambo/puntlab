import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Row, Col, FormGroup, ControlLabel, InputGroup, FormControl } from 'react-bootstrap';

export class ChangePasswordModal extends React.Component {
  
  render() {
    
    const {
      open,
      closeChangePasswordModal,
    } = this.props;
    
    return (
      <Modal show={ open } onHide={ () => { closeChangePasswordModal(); } }>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <Row>
              <Col xs={12}>
                <FormGroup controlId="sport">
                  <ControlLabel>Current Password</ControlLabel>
                  <InputGroup style={ {width: '100%'} }>
                    <FormControl type="password" ref='current' />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup controlId="sport">
                  <ControlLabel>New Password</ControlLabel>
                  <InputGroup style={ {width: '100%'} }>
                    <FormControl type="password" ref='newPassword' />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <FormGroup controlId="sport">
                  <ControlLabel>Confirm New Password</ControlLabel>
                  <InputGroup style={ {width: '100%'} }>
                    <FormControl type="password" ref='confirmNewPassword' />
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={ () => { this._handleChangePassword(); } }>Save</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  _handleChangePassword() {
    const current = ReactDOM.findDOMNode(this.refs.current).value;
    const newPassword = ReactDOM.findDOMNode(this.refs.newPassword).value;
    const confirmNewPassword = ReactDOM.findDOMNode(this.refs.confirmNewPassword).value;
    
    this.props.changePassword(current, newPassword, confirmNewPassword);
  }
}

ChangePasswordModal.propTypes = {
  changePassword: React.PropTypes.func,
  closeChangePasswordModal: React.PropTypes.func,
  open: React.PropTypes.bool,
};

