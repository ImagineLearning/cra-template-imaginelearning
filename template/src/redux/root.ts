import { PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { combineReducers } from 'redux';
import { ActionsObservable, combineEpics, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import counter, { COUNTER_EPICS } from './modules/counter';
import environment from './modules/environment';

/* eslint-disable @typescript-eslint/no-explicit-any */
const epics: Array<
	(
		$action: ActionsObservable<PayloadAction<any>>,
		$state: StateObservable<RootStateOrAny>
	) => Observable<PayloadAction<any>>
> = [
	...COUNTER_EPICS,
	// Add additional epics here
];
/* eslint-enable */

// Spread operator doesn't work here, so we have to use `apply`
export const rootEpic = combineEpics.apply(combineEpics, epics);

const rootReducer = combineReducers({
	counter,
	environment,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
