import React, { useState, useRef }  from 'react';

function InputSimple() {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    })
    const nameInput = useRef();
    const {name, nickname} = inputs;
    const onChange = e => { // 현재 이벤트가 발생한 DOM 요소의 Attribute e.target.attrubute에 들어있다
        // e.target.name
        const {name, value} = e.target;
        // React에서 객체 update시 객체를 복사해서 새로운 객체를 반환한다 ***
        // (불변성을 지켜준다, 그래야 React Component에서 상태가 변경됨을 감지할 수 있다)
        // 객체 내부의 변경은 감지할 수 없다
        setInputs({
            ...inputs,
            [name]: value, // name이 onClick에 의해서 동적으로 넘어오며 이를 expression하여 key값으로 사용한다
        });
    }
    const onReset = () => {
        setInputs({
            name: '',
            nickname: ''
        });
        nameInput.current.focus(); // nameInput.current (DOM을 가져온다)
    }
    return (
        <div>
            <input name="name" onChange={onChange} value={name} placeholder="이름" ref={nameInput} />
            <input name="nickname" onChange={onChange} value={nickname} placeholder="닉네임" />
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값: </b>
                {name} ({nickname})
            </div>
        </div>
    )
}

export default InputSimple;