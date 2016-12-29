import React from 'react';
import ReactDOM from 'react-dom';
import { Col, Row, FormControl, FormGroup, ControlLabel, InputGroup, Button, Glyphicon } from 'react-bootstrap';

export class GeneralSettingsTab extends React.Component {
  
  render() {
    
    const {
      user,
    } = this.props;
    
    return (
      <Row style={ {margin: '0px'} }>
        <Row>
          <Col xs={6}>
            <FormGroup controlId="first">
              <ControlLabel>First Name</ControlLabel>
              <InputGroup style={ {width: '100%'} }>
              <InputGroup.Addon>F</InputGroup.Addon>
                <FormControl type="text" ref='first' defaultValue={ user.profile.name.first } />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup controlId="username">
              <ControlLabel>Username</ControlLabel>
              <InputGroup style={ {width: '100%'} }>
                <InputGroup.Addon><Glyphicon glyph='user' /></InputGroup.Addon>
                <FormControl type="text" ref='username' defaultValue={ user.username || '' }/>
              </InputGroup>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={6}>
            <FormGroup controlId="last">
              <ControlLabel>Last Name</ControlLabel>
              <InputGroup style={ {width: '100%'} }>
                <InputGroup.Addon>L</InputGroup.Addon>
                <FormControl type="text" ref='last' defaultValue={ user.profile.name.last } />
              </InputGroup>
            </FormGroup>
          </Col>
          <Col xs={6}>
            <FormGroup controlId="email">
              <ControlLabel>Email</ControlLabel>
              <InputGroup style={ {width: '100%'} }>
                <InputGroup.Addon><Glyphicon glyph='envelope' /></InputGroup.Addon>
                <FormControl type="email" ref='email' defaultValue={ user.emails[0].address }/>
              </InputGroup>
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
    const first = ReactDOM.findDOMNode(this.refs.first).value;
    const last = ReactDOM.findDOMNode(this.refs.last).value;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const username = ReactDOM.findDOMNode(this.refs.username).value;
    
    this.props.saveGeneralSettings(first, last, email, username);
  }
}

GeneralSettingsTab.propTypes = {
  user: React.PropTypes.object,
  saveGeneralSettings: React.PropTypes.func,
};