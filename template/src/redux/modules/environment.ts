import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Environments } from '../../constants/environments';

//==========
// Reducer
//==========

export interface EnvironmentState {
	environment: string;
	initialized: boolean;
}

const environmentSlice = createSlice({
	initialState: {
		environment: Environments.Production,
		initialized: false,
	} as EnvironmentState,
	name: 'environment',
	reducers: {
		initEnvironment: (state, { payload }: PayloadAction<Environments | string>) => {
			const environment = Object.keys(Environments).find((env) => env.toLowerCase() === payload)
				? payload
				: Environments.Development;
			return { ...state, environment, initialized: true };
		},
	},
});

export default environmentSlice.reducer;

//==========
// Actions
//==========

export const { initEnvironment } = environmentSlice.actions;
