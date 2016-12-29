import React from 'react';
import { ButtonGroup, ButtonToolbar, Button, Glyphicon } from 'react-bootstrap';
import { PeriodTypeButton } from './period-type-button';

export const PeriodNavigation = ({ nextPeriod, previousPeriod, changePeriodType, period, periodType, buttonTitle }) => (
  <ButtonToolbar className='period-toolbar'>
    <ButtonGroup bsSize="large" className='period-navigation'>
      <Button onClick={ () => { previousPeriod(); } }><Glyphicon glyph='chevron-left' /></Button>
      <PeriodTypeButton title={ buttonTitle } changePeriodType={ changePeriodType } />
      <Button onClick={ () => { nextPeriod(); } }><Glyphicon glyph='chevron-right' /></Button>
    </ButtonGroup>
  </ButtonToolbar>
);

PeriodNavigation.propTypes = {
  nextPeriod: React.PropTypes.func,
  previousPeriod: React.PropTypes.func,
  changePeriodType: React.PropTypes.func,
  period: React.PropTypes.object,
  periodType: React.PropTypes.string,
  buttonTitle: React.PropTypes.string,
};
