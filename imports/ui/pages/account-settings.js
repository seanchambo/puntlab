import React from 'react';
import { Panel, Grid, Row, Col } from 'react-bootstrap';
import Settings from '../containers/settings/settings';
import ChangePasswordModal from '../containers/settings/change-password-modal';

export const AccountSettings = () => (
  <div>
    <Row className='puntlab-page-header'>
      <Col xs={ 12 } sm={ 4 }>
        <p className="page-title">Settings</p>
      </Col>
    </Row>
    <Row className='puntlab-page-subheader'>
      <Settings />
    </Row>
    <ChangePasswordModal />
  </div>
);
