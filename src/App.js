import React, { useRef, useState, useMemo, useCallback, useReducer, createContext } from 'react';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './useInputs';
import produce from 'immer';

import './App.css';
// import ContextSample from './ContextSample';

window.produce = produce;

const countActiveUsers = (users) => {
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
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
    case 'CREATE_USER':
      // return {
      //   users: state.users.concat(action.user)
      // }
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    case 'TOGGLE_USER':
      // return {
      //   ...state,
      //   users: state.users.map(user => user.id === action.id ? {...user, active: !user.active} : user)
      // }
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id);
        user.active = !user.active;
      });
    case 'REMOVE_USER':
      // return {
      //   ...state,
      //   users: state.users.filter(user => user.id !== action.id)
      // }
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id);
        draft.users.splice(index, 1);
      });
    default:
      throw new Error('Unhandled Action');
  }
}

export const UserDispatch = createContext(null);
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);
  const { users } = state;
  const [form, onChange, reset] = useInputs({
    username: '',
    email: '',
    active: false
  });
  const {username, email, active} = form;
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
    reset();
  }, [username, email, active, reset]);

  // const onToggle = useCallback(id => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id
  //   })
  // }, []);

  // const onRemove = useCallback(id=> {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id
  //   })
  // }, []);

  const count = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser username={username} email={email} active={active} onChange={onChange} onCreate={onCreate} />
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;
