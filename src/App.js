import React, { useRef, useState, useMemo, useCallback } from 'react';
// import Counter from './Counter';
// import InputSample from './InputSample';
import UserList from './UserList';
import CreateUser from './CreateUser';
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

function App() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    active: false
  });
  const {username, email, active} = inputs;

  const onChange = useCallback(e => {
    const {name, value} = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  }, [inputs]);

  const [users, setUsers] = useState([
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
  ]);
  const nextId = useRef(users.length + 1);

  const onCreate = useCallback(() => {
    const user = {
      id: nextId.current,
      username,
      email,
      active
    }
    // setUsers([...users, user]); // 배열에 항목을 추가하는 1번째 방법
    setUsers(users => users.concat(user)); // 배열에 항목을 추가하는 2번째 방법
    setInputs({
      username: '',
      email: '',
      active: false
    });
    nextId.current += 1; // nextId.current (4)
  }, [username, email, active]);
  // Component가 처음 만들어질때만 만들고 그 이후 모두 재사용 시킨다
  // useState를 함수형 update로 바꾸고 deps를 제거하였다
  const onRemove = useCallback(id => {
    setUsers(
      users =>
      users.filter(user => user.id !== id)
    )
  }, []);

  const onToggle = useCallback(id => {
    setUsers(
      users =>
      users.map(user => user.id === id ? {...user, active: !user.active} : user)
    )
  }, []);
  // countActiveUsers 함수는 users가 바뀔 때만 실행된다
  const count = useMemo(() => countActiveUsers(users), [users]);
  return (
    <div className="App">
      <>
        <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
        <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate} />
        <div>활성 사용자 수 : {count}</div>
      </>
    </div>
  );
}

export default App;
