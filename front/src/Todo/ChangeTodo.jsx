import React from 'react'
import PropTypes from 'prop-types';          
            
            
const ChangeTodo = () => {  
    
    return (
        <form style = {{marginBottom: '1rem' }}>
            <button type = 'submit'>remove all</button>
            <button type = 'submit'>showe complited</button>
            <button type = 'submit'>showe in worke</button>
            <button type = 'submit'>showe all</button> 
        </form>
    )
}

ChangeTodo.propTypes = {
    onRemove: PropTypes.func.isRequired
}

export default RemoveTodo