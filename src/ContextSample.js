import React, { createContext, useContext, useState } from 'react';
const MyContext = createContext('defaultValue');
const Child = () => {
    const text = useContext(MyContext);
    return (
        <div>
            Hi {text}
        </div>
    )
}
const Parent = ({text}) => {
    return <Child />
}
const GrandParent = ({text}) => {
    return <Parent />
}
const ContextSample = () => {
    const [value, setValue] = useState(true);
    return (
        <MyContext.Provider value={value ? 'GOOD' : 'BAD'}>
            <GrandParent />
            <button onClick={() => setValue(!value)}>CLICK ME</button>
        </MyContext.Provider>
    )
}

export default ContextSample;
