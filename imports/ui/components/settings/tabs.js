import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import GeneralSettingsTab from '../../containers/settings/general-tab';
import BankrollTab from '../../containers/settings/bankroll-tab';

export const SettingsTabs = ({ changeSettingsTab, settingsTab }) => {
  return (
    <Tabs activeKey={ settingsTab } onSelect={ tab => changeSettingsTab(tab) } id="settings-tabs">
      <Tab eventKey={ 1 } title="General"><GeneralSettingsTab /></Tab>
      <Tab eventKey={ 2 } title="Preferences">Preferences</Tab>
      <Tab eventKey={ 3 } title="Bankroll"><BankrollTab /></Tab>
    </Tabs>
  );
};

SettingsTabs.propTypes = {
  changeSettingsTab: React.PropTypes.func,
  settingsTab: React.PropTypes.number,
};