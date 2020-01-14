import React, { useRef, useState, useMemo, useCallback, useReducer } from 'react';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';
import './App.css';

const countActiveUsers = (users) => {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'ggybbo',
      email: 'ggybbo@example.com',
      active: true
    },
    {
        id: 2,
        username: 'ggybbo2',
        email: 'ggybbo2@example.com',
        active: false
    }
  ]
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.name]: action.value
        }
      }
    case 'CREATE_USER':
      return {
        inputs: initialState.inputs,
        users: state.users.concat(action.user)
      }
    case 'TOGGLE_USER':
      return {
        ...state,
        users: state.users.map(user => user.id === action.id ? {...user, active: !user.active} : user)
      }
    case 'REMOVE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.id)
      }
    default:
      throw new Error('Unhandled Action');
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const { username, email, active } = state.inputs;
  // onChange 함수는 useCallback(f, [])을 통해서 처음 렌더링시에만 함수를 만들고 그 이후는 재사용
  const onChange = useCallback(e => {
    const {name, value} = e.target;
    dispatch({
      type: 'CHANGE_INPUT',
      name,
      value
    });
  }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id: nextId.current,
        username,
        email,
        active
      }
    });
    nextId.current++;
  }, [username, email, active]);

  const onToggle = useCallback(id => {
    dispatch({
      type: 'TOGGLE_USER',
      id
    })
  }, []);

  const onRemove = useCallback(id=> {
    dispatch({
      type: 'REMOVE_USER',
      id
    })
  }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <div className="App">
      <>
        <CreateUser username={username} email={email} active={active} onChange={onChange} onCreate={onCreate} />
        <UserList users={users} onToggle={onToggle} onRemove={onRemove} />
        <div>활성 사용자 수 : {count}</div>
      </>
    </div>
  );
}

export default App;
