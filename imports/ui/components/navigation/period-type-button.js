import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

export const PeriodTypeButton = ({ title, changePeriodType }) => {
  
  const periodTypeSelect = (eventKey, event) => {
    console.log("here");
    
    let type;
    
    switch(eventKey) {
      case 1:
        type = 'month';
        break;
      case 2:
        type = '30days';
        break;
      case 3:
        type = '3months';
        break;
      case 4:
        type = '6months';
        break;
      case 5:
        type = 'year';
        break;
      case 6:
        type = 'custom';
        break;
    }
    
    changePeriodType(type);
  };
  
  return (
    <DropdownButton title={ title } id="bg-nested-dropdown" bsSize="large" onSelect={ periodTypeSelect.bind(changePeriodType) }>
      <MenuItem eventKey={ 1 }>This Month</MenuItem>
      <MenuItem eventKey={ 2 }>Last 30 Days</MenuItem>
      <MenuItem eventKey={ 3 }>Last 3 Months</MenuItem>
      <MenuItem eventKey={ 4 }>Last 6 Months</MenuItem>
      <MenuItem eventKey={ 5 }>Last Year</MenuItem>
      <MenuItem eventKey={ 6 }>Custom</MenuItem>
    </DropdownButton>
  );
};

PeriodTypeButton.propTypes = {
  title: React.PropTypes.string,
  changePeriodType: React.PropTypes.func,
};
