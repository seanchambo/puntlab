import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { Row, Col, FormGroup, ControlLabel, FormControl, Button, Panel, InputGroup, Glyphicon } from 'react-bootstrap';

export class Login extends React.Component {
  
  handleLogin() {
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    
    this.props.login(email, password);
  }
  
  render() {
    const me = this;
    
    const {
      login 
    } = this.props;
    
    return (
      <Row className='login-wrapper'>
        <Col xs={ 12 } sm={ 6 } md={ 4 } style={ {maxWidth: '450px'} }>
          <Panel className='login-panel'>
            <div className='logo'>
              <img className='logo-image' src="/logo.png" />
              <span className='logo-text'>PuntLab</span>
            </div>
            <form ref="login" className="login">
              <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <InputGroup>
                  <InputGroup.Addon><Glyphicon glyph='envelope' /></InputGroup.Addon>
                  <FormControl
                    type="email"
                    ref="email"
                    name="email"
                    placeholder="Email Address" />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <ControlLabel>
                  <span className="pull-left">Password</span>
                  <Link className="pull-right" to="/recover-password" style={ {color: '#f0ad4e'} }>Forgot Password?</Link>
                </ControlLabel>
                <InputGroup>
                  <InputGroup.Addon><Glyphicon glyph='lock' /></InputGroup.Addon>
                  <FormControl
                    type="password"
                    ref="password"
                    name="password"
                    placeholder="Password" />
                </InputGroup>
              </FormGroup>
              <Button bsStyle="success" onClick={ () => { me.handleLogin(); } } block style={ {marginTop: '20px', lineHeight: '2.13'} }>Login</Button>
            </form>
          </Panel>
        </Col>
      </Row> 
    );
  }
}

Login.propTypes = {
  login: React.PropTypes.func,
};