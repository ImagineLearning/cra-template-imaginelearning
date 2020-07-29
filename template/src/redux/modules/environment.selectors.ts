import { RootStateOrAny } from 'react-redux';
import { Environments } from '../../constants/environments';

export function selectEnvironment(state: RootStateOrAny) {
	return state.environment.environment as Environments;
}
