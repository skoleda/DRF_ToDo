import React, {useContext} from 'react';
import PropTypes from 'prop-types'
import Context from '../context';

const styles = {
     input: {
        marginRight: '1rem'
    }
};

const TodoItem = ({ index, todo, onChange}) => {
    const { removeTodo } = useContext(Context);
    const classes = [];
    if (todo.completed) {
        classes.push('done');           
    }   

    return (
        <li className = 'listyles'>
           <span className = {classes.join(' ')}> 
            <input type = 'checkbox'
                    checked = {todo.status}
                    style = {styles.input} 
                    onChange = {() => onChange(todo.id)} />  
                <strong>{++index}</strong>
                &nbsp;
                {todo.text}
            </span>
            <button id = 'rmbtn' className = 'rm' onClick = {() => removeTodo(todo.id)}>&times;</button>
        </li>
    )    
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index:PropTypes.number,
    onChange:PropTypes.func.isRequired,
}

export default TodoItem