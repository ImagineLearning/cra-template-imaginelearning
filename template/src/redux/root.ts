import { PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { combineReducers, Observable } from 'redux';
import { combineEpics, StateObservable } from 'redux-observable';
import environment from './modules/environment';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const epics: Array<($action: Observable<PayloadAction<any>>, $state: StateObservable<RootStateOrAny>) => Observable<any>> = [
	// Add epics here
];

// Spread operator doesn't work here, so we have to use `apply`
export const rootEpic = combineEpics.apply(combineEpics, epics);

const rootReducer = combineReducers({
	environment
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
