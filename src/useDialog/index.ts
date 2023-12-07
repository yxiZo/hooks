import {useReducer, useCallback, Reducer} from 'react';

type ReducerState<T> = { visible: boolean } & T;

interface ReducerAction<T> {
    type: 'open' | 'close';
    payload?: Partial<T>;
}

/**
 * A reducer function that takes a state and an action and returns a new state.
 *
 * @param {ReducerState<T>} state - The current state.
 * @param {ReducerAction<T>} action - The action to be performed.
 * @return {ReducerState<T>} The new state after the action is performed.
 */
function reducer<T>(state: ReducerState<T>, action: ReducerAction<T>): ReducerState<T> {
    const {type, payload} = action;
    switch (type) {
        case 'open':
            return {...state, visible: true, ...payload};
        case 'close':
            return {...state, visible: false, ...payload};
        default:
            throw new Error("Unknown action type");
    }
}

/**
 * Generates a function comment for the given function body.
 *
 * @param {ReducerState<T>} initialState - the initial state for the reducer
 * @template T - the type of the state
 * @return {Array} an array containing the state, open function, and close function
 */
export default function useDialog<T>(initialState: T) {

    const [state, dispatch] = useReducer<Reducer<ReducerState<T>, ReducerAction<T>>>(reducer, {
        visible: false,
        ...initialState
    });

    const close = useCallback(
        (payload: Partial<T> = {}) => {
            dispatch({type: 'close', payload});
        },
        [dispatch]
    );


    const open = useCallback(
        (payload: Partial<T> = {}) => {
            dispatch({type: 'open', payload});
        },
        [dispatch]
    );

    return {
        state,
        open,
        close

    }




}