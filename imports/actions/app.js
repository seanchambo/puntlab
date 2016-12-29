import moment from 'moment';
import actionTypeBuilder from './actionTypeBuilder';

export const DRAWER = actionTypeBuilder.type('DRAWER');
export const PERIOD = actionTypeBuilder.type('PERIOD');
export const PERIOD_TYPE = actionTypeBuilder.type('PERIOD_TYPE');
export const PERIOD_BUTTON_TITLE = actionTypeBuilder.type('PERIOD_BUTTON_TITLE');

export function toggleDrawer() {
  return (dispatch, getState) => {
    dispatch({
      type: actionTypeBuilder.changed(DRAWER),
      data: !getState().app.drawer,
    });
  };
}

export function nextPeriod(direction) {
  return (dispatch, getState) => {
        
    let to;
    let from;
    let diff;
        
    const currTo = getState().app.period.to;
    const currFrom = getState().app.period.from;
        
    switch(getState().app.periodType) {
      case 'month':
        to = moment(currTo).add(1, 'months').endOf('month');
        from = moment(currFrom).add(1, 'months').startOf('month');
        break;
      case '30days':
        to = moment(currTo).add(30, 'days');
        from = moment(currFrom).add(30, 'days');
        break;
      case '3months':
        to = moment(currTo).add(3, 'months');
        from = moment(currFrom).add(3, 'months');
        break;
      case '6months':
        to = moment(currTo).add(6, 'months');
        from = moment(currFrom).add(6, 'months');
        break;
      case 'year':
        to = moment(currTo).add(1, 'years');
        from = moment(currFrom).add(1, 'years');
        break;
      case 'custom':
        diff = currTo.diff(currFrom, 'days');
        to = moment(currTo).add(diff, 'days');
        from = moment(currFrom).add(diff, 'days');
        break;
    }
        
    dispatch({
      type: actionTypeBuilder.changed(PERIOD),
      data: {
        period: {
          from,
          to
        },
      }
    });
    
    dispatch(determinePeriodButtonTitle());
  };
}

export function previousPeriod(direction) {
    return (dispatch, getState) => {
        
    let to;
    let from;
    let diff;

    const currTo = getState().app.period.to;
    const currFrom = getState().app.period.from;
        
    switch(getState().app.periodType) {
      case 'month':
        to = moment(currTo).subtract(1, 'months').endOf('month');
        from = moment(currFrom).subtract(1, 'months').startOf('month');
        break;
      case '30days':
        to = moment(currTo).subtract(30, 'days');
        from = moment(currFrom).subtract(30, 'days');
        break;
      case '3months':
        to = moment(currTo).subtract(3, 'months');
        from = moment(currFrom).subtract(3, 'months');
        break;
      case '6months':
        to = moment(currTo).subtract(6, 'months');
        from = moment(currFrom).subtract(6, 'months');
        break;
      case 'year':
        to = moment(currTo).subtract(1, 'years');
        from = moment(currFrom).subtract(1, 'years');
        break;
      case 'custom':
        diff = currTo.diff(currFrom, 'days');
        to = moment(currTo).subtract(diff, 'days');
        from = moment(currFrom).subtract(diff, 'days');
        break;
    }
        
    dispatch({
      type: actionTypeBuilder.changed(PERIOD),
      data: {
        period: {
          from,
          to
        },
      }
    });
    
    dispatch(determinePeriodButtonTitle());
  };
}

export function determinePeriodButtonTitle() {
  return (dispatch, getState) => {
    let buttonTitle;
    
    if(getState().app.periodType === 'month'){
      buttonTitle = moment(getState().app.period.from).format('MMMM, YYYY');
    } else {
      buttonTitle = moment(getState().app.period.from).format('DD/MM/YYYY') + ' - ' + moment(getState().app.period.to).format('DD/MM/YYYY');
    }
    
    dispatch({
      type: actionTypeBuilder.changed(PERIOD_BUTTON_TITLE),
      data: buttonTitle,
    });
  };
}

export function changePeriodType(type) {
  return (dispatch, getState) => {
    
    let from;
    let to;
    
    switch(type) {
      case 'month':
        to = moment().endOf('month');
        from = moment().startOf('month');
        break;
      case '30days':
        to = moment();
        from = moment().subtract(30, 'days');
        break;
      case '3months':
        to = moment();
        from = moment().subtract(3, 'months');
        break;
      case '6months':
        to = moment();
        from = moment().subtract(6, 'months');
        break;
      case 'year':
        to = moment();
        from = moment().subtract(1, 'years');
        break;
    }
    
    
    dispatch({
      type: actionTypeBuilder.changed(PERIOD_TYPE),
      data: {
        period: {
          from,
          to,
        },
        type
      }
    });
    
    dispatch(determinePeriodButtonTitle());
  };
}