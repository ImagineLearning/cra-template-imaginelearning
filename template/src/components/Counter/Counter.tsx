import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment, incrementAsync1, incrementAsync2, incrementByAmount } from '../../redux/modules/counter';
import { selectCount } from '../../redux/modules/counter.selectors';
import styles from './Counter.module.css';

export function Counter() {
	const count = useSelector(selectCount);
	const dispatch = useDispatch();
	const [incrementAmount, setIncrementAmount] = useState('2');

	return (
		<div>
			<div className={styles.row}>
				<button className={styles.button} aria-label="Increment value" onClick={() => dispatch(increment())}>
					+
				</button>
				<span className={styles.value}>{count}</span>
				<button className={styles.button} aria-label="Decrement value" onClick={() => dispatch(decrement())}>
					-
				</button>
			</div>
			<div className={styles.row}>
				<input
					className={styles.textbox}
					aria-label="Set increment amount"
					value={incrementAmount}
					onChange={e => setIncrementAmount(e.target.value)}
				/>
				<button className={styles.button} onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
					Add Amount
				</button>
				<button className={styles.asyncButton} onClick={() => dispatch(incrementAsync1(Number(incrementAmount) || 0))}>
					Add Async 1
				</button>
				<button className={styles.asyncButton} onClick={() => dispatch(incrementAsync2(Number(incrementAmount) || 0))}>
					Add Async 2
				</button>
			</div>
		</div>
	);
}
