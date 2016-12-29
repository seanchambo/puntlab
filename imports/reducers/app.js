import { assign } from 'lodash';
import moment from 'moment';
import actionTypeBuilder from '../actions/actionTypeBuilder';
import { DRAWER, PERIOD, PERIOD_TYPE, PERIOD_BUTTON_TITLE } from '../actions/app';

moment.locale('en-AU');
const date = new Date();
const firstDay = moment(new Date()).startOf('month');
const lastDay = moment(new Date()).endOf('month');

export const initialState = {
    drawer: false,
    period: {
        from: firstDay,
        to: lastDay,
    },
    periodType: 'month',
    periodButtonTitle: moment(firstDay).format('MMMM, YYYY')
};

export default function(state = initialState, action) {
    const { data, type } = action;

    switch (type) {
        case actionTypeBuilder.changed(DRAWER):
            return assign({}, state, { drawer: data });
            
        case actionTypeBuilder.changed(PERIOD):
            return assign({}, state, { period: data.period });
            
        case actionTypeBuilder.changed(PERIOD_TYPE):
            return assign({}, state, { periodType: data.type, period: data.period });
            
        case actionTypeBuilder.changed(PERIOD_BUTTON_TITLE):
            return assign({}, state, {periodButtonTitle: data});
  
        default:
            return state;
    }
}
