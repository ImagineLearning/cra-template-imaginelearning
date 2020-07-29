import { createAction, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import { delay, map, tap, withLatestFrom } from 'rxjs/operators';
import { selectCount } from './counter.selectors';
import { selectEnvironment } from './environment.selectors';

//==========
// Reducer
//==========

type CounterState = {
	value: number;
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState: {
		value: 0
	} as CounterState,
	reducers: {
		increment: state => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.value += 1;
		},
		decrement: state => {
			state.value -= 1;
		},
		// Use the PayloadAction type to declare the contents of `action.payload`
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		}
	}
});

export default counterSlice.reducer;

//==========
// Actions
//==========

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// This action is used to trigger the `incrementAsync1Epic`. It doesn't cause any
// changes to the state, so there's no need to define it in our slice above.
export const incrementAsync1 = createAction<number>('counter/INCREMENT_ASYNC_1');

//==========
// Thunks
//==========

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync2(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched.
export function incrementAsync2(amount: number) {
	return (dispatch: Dispatch) => {
		setTimeout(() => {
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
function incrementAsync1Epic(action$: ActionsObservable<PayloadAction<number>>, state$: StateObservable<RootStateOrAny>) {
	return action$.pipe(
		// Use the `ofType` operator to limit your epic to specific actions
		ofType(incrementAsync1.type),
		delay(1000),
		// We can add the latest values from state to our observable with the `withLatestFrom` operator
		withLatestFrom(state$),
		tap(([action, state]) => {
			console.log(`Environment: ${selectEnvironment(state)}, Current Count: ${selectCount(state)}`);
		}),
		// In the end, your Observable should emit a new action
		map(([action, state]) => incrementByAmount(action.payload))
	);
}

export const COUNTER_EPICS = [incrementAsync1Epic];
