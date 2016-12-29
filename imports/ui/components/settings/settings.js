import React from 'react';
import { Row, Col, Panel } from 'react-bootstrap';
import SettingsTabs from '../../containers/settings/tabs';

export const AccountSettings = ({ user, openChangePasswordModal }) => {
  return (
    <Panel>
      <Row className='puntlab-page-header'>
        <Col xs={12}>
          <h1 className='settings-name'>{ user.profile.name.first  + ' ' + user.profile.name.last }</h1>
          <h4 className='settings-password'><a onClick={ () => { openChangePasswordModal(); } }>Update Password</a></h4>
        </Col>
      </Row>
      <Row className='puntlab-page-subheader'>
        <Col xs={12}>
          <SettingsTabs />
        </Col>
      </Row>
    </Panel>
  );
};

AccountSettings.propTypes = {
  user: React.PropTypes.object,
  openChangePasswordModal: React.PropTypes.func,
};