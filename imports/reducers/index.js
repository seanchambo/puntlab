import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { responsiveStateReducer } from 'redux-responsive';

import app from './app';
import bets from './bets';
import settings from './settings';
import transactions from './transactions';

const rootReducer = combineReducers({
    app,
    bets,
    settings,
    transactions,
    routing: routerReducer,
    browser: responsiveStateReducer,
});

export default rootReducer;