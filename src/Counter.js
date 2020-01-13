import React, { useReducer } from 'react';

const reducer = (state, action) => {
    switch(action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            throw new Error('Unhandled action');
    }
}

function Counter() {

    const [number, dispatch] = useReducer(reducer, 0);

    const onIncrease = () => {
        dispatch({
            type: 'INCREMENT'
        })
        // setNumber(number + 1);
        // setNumber(prevNumber => prevNumber + 1); // 함수형 update를 쓰는 것이 React Component를 최적화 할 수 있다
    }
    const onDecrease = () => {
        dispatch({
            type: 'DECREMENT'
        })
        // setNumber(number - 1);
        // setNumber(prevNumber => prevNumber - 1);
    }

    return (
        <div>
        <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button> {/** 함수 이름을 넣어야 함 */}
            <button onClick={onDecrease}>+1</button> {/** 함수를 호출하면 Component 렌더링시에 함수가 불린다 */}
        </div>
    )
}

export default Counter;
