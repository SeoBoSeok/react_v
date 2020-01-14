import {useState, useCallback} from 'react';

const useInputs = initialForm => {
    const [form, setform] = useState(initialForm);
    const onChange = useCallback(e => {
        const {name, value} = e.target;
        setform(form => ({
            ...form,
            [name]: value
        }))
    })
    const reset = useCallback(() => setform(initialForm), [initialForm]);
    return [form, onChange, reset];
}

export default useInputs;
