import React, { useEffect, useContext } from 'react';
import {UserDispatch} from './App';

const User = React.memo(({user}) => {
    const {username, email, id, active} = user;
    const dispatch = useContext(UserDispatch);
    // useEffect(() => {
    //     // UI가 화면에 렌더링 된 후 콜백 호출된다
    //     console.log('Component가 화면에 나타납니다');
    //     // 1. props로 받은 값을 state로 설정
    //     // 2. REST API 방식으로 값을 가져와서 초기화 할때
    //     // 3. 라이브러리(D3.js, Video.js)등 외부 라이브러리 로드
    //     // 4. setInterval, setTimeout등 비동기 작업 처리
    //     return () => {
    //         // UI가 화면에서 제거될 때 호출된다
    //         console.log('Component가 화면에서 사라짐');
    //         // 1. 라이브러리 인스턴스 제거
    //         // 2. clearInterval, clearTimeout
    //     }
    // }, []); // deps

    // useEffect(() => {
    //     console.log(user);
    //     console.log('user 값이 설정됨');
    //     return () => {
    //         console.log('user 값이 바뀌기 전');
    //         console.log(user);
    //     }
    // }, [user]);


    return (
        <div> {/** key가 반듯이 있어야 update시 최적화 가능, 오류가 없어진다 */}
            <b
                style={{
                    color: active ? 'green' : 'black',
                    cursor: 'pointer'
                }}
                onClick={() => dispatch({
                    type: 'TOGGLE_USER',
                    id
                })}
            >{username}</b> <span>{email}</span>
            <button onClick={() => dispatch({
                    type: 'REMOVE_USER',
                    id
                })}>삭제</button>
        </div>
    )
});

const UserList = ({users}) => {
    return (
        <div>
            {
                users.map((user) => (
                    <User user={user} key={user.id} />
                ))
            }
        </div>
    )
}

export default React.memo(UserList);
