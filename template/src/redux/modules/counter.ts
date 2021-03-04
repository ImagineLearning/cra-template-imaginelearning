import http from '@imaginelearning/httprx';
import { createAction, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { selectCount } from './counter.selectors';
import { selectEnvironment } from './environment.selectors';

//==========
// Reducer
//==========

interface CounterState {
	value: number;
	trivia?: string;
}

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		value: 0,
	} as CounterState,
	reducers: {
		increment: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		triviaReceived: (state, action: PayloadAction<string>) => {
			state.trivia = action.payload;
		},
	},
});

export default counterSlice.reducer;

//==========
// Actions
//==========

export const { increment, decrement, incrementByAmount, triviaReceived } = counterSlice.actions;

// This action is used to trigger the `incrementAsync1Epic`. It doesn't cause any
// changes to the state, so there's no need to define it in our slice above.
export const triviaRequest = createAction<number>('counter/TRIVIA_REQUEST');

//==========
// Thunks
//==========

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync2(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched.
export function incrementAsync(amount: number) {
	return (dispatch: Dispatch, getState: () => RootStateOrAny) => {
		setTimeout(() => {
			// We can get the latest values from state from the store with the `getState` function
			const state = getState();
			console.info(
				`Environment: ${selectEnvironment(state)}, Current Count: ${selectCount(state)}`
			);
			dispatch(incrementByAmount(amount));
		}, 1000);
	};
}

//==========
// Epics
//==========

// The function below is called an epic and allows us to use RxJS to perform complex
// logic with side-effects. The Redux Observable middleware treats dispatched actions
// and current state as streams, which are passed as parameters to epics. Within an
// epic you use RxJS operators to perform side-effects, transform data, and ultimately
// return a stream (Observable) that emits new actions. It is executed by dispatching a
// regular action: `dispatch(incrementAsync1(10))`.
function incrementEpic(
	action$: ActionsObservable<PayloadAction<number>>,
	state$: StateObservable<RootStateOrAny>
) {
	return action$.pipe(
		// Use the `ofType` operator to limit your epic to specific actions
		ofType(decrement.type, increment.type, incrementByAmount.type),
		// We can add the latest values from state to our observable with the `withLatestFrom` operator
		withLatestFrom(state$),
		switchMap(([action, state]) => {
			// Now we can access the latest values from state. Epics run alongside the normal
			// Redux dispatch channel, _after_ the reducers have already received them. So our
			// count has already been updated at this point.
			const count = selectCount(state);
			// You can make HTTP requests inside your epic, but make sure to always handle errors
			return http(`http://numbersapi.com/${count}/trivia`)
				.get<string>()
				.pipe(
					// In the end, your Observable should emit a new action
					map(({ data }) => triviaReceived(data)),
					catchError((err: unknown) => {
						console.error(err);
						// Even if there's an error, emit a new action
						return of(triviaReceived(''));
					})
				);
		})
	);
}

export const COUNTER_EPICS = [incrementEpic];
