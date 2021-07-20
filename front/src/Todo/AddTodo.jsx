import React, {useState} from 'react';
import PropTypes from 'prop-types';

const useInputeValue = (defaulteValue = '') => {
    const [value, setValue] = useState(defaulteValue);

    return {
        bind: {
            value,
            onChange: event => setValue(event.target.value)
        },
        clear: () => setValue(''),
        value: () => value,
    }
}

const AddTodo = ({onCreate}) => {
    const input = useInputeValue('')

    const submitHandler = (event) => {
        event.preventDefault()
        if (input.value().trim()) {
            onCreate(input.value())
            input.clear()
        }
    }

    return (
        <React.Fragment>
            <form style = {{marginBottom: '1rem'}} onSubmit={submitHandler}>
                <input className = 'input'{...input.bind}/>
                <button type = 'submit' className = 'btnStates'>Add Todo</button>     
            </form>            
        </React.Fragment>
                      
    )
}

AddTodo.propTypes = {
    onCreate: PropTypes.func.isRequired
}

export default AddTodo