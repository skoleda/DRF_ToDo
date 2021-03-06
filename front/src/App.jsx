import React, { useEffect, useState } from "react";
import TodoList from "./Todo/TodoList";
import Context from "./context";
import AddTodo from "./Todo/AddTodo";

const App = () => {
  const publicUrl = 'http://127.0.0.1:8000/api/v1/todos/todos/';
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setTodosFromDB();
  }, [filter])

  const toggleTodo = (id) => {
      const todo = todos.find(item => item.id === id)
      todo.status = !todo.status;
      workWithDB(`${publicUrl}${todo.id}/`, 'PUT', todo)
      .then((data) => {
        if (data && !data.detail) { 
          setTodosFromDB()
        } else {
          console.error(`Error: ${data.detail}`)
        }
      });
  }

  const checkFilter = (data, todoFilter) => {
      switch (todoFilter) {
        case 'all':  
          return data;       
        case 'work': 
          return data.filter(todo => !todo.status);
        case 'compl':
          return data.filter(todo => todo.status);
        default:
          break; 
      }
  }

  const removeTodo = (id) => {     
    workWithDB(`${publicUrl}${id}/`, 'DELETE', {id});
    setTodos(todos.filter(todo => todo.id !== id));  
  }

  const clearAll = () => {             
    todos.forEach(e => {
      removeTodo(e.id)        
    })
    setTodos([]);
    setFilter('all');
  }

  const showWork = () => {  
    setFilter('work');  
  }

  const showCompleted = () => {
    setFilter('compl');   
  }

  const showAll = () => {     
    setFilter('all');      
  }

  const addTodo = (text) => {
    console.log(filter)
    return new  Promise ((resolve, reject) => {
    workWithDB(`${publicUrl}`, 'POST', {text})
    .then((data) => {
      setTodos(todos.concat([{              
        id:data.id,
        text,
        status: false,
      }]));
      resolve();
    });
  })      
  }

  async function workWithDB(url, meth, data ) {
    const response = await fetch(url, {
    method: meth,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',      
    },
    body: JSON.stringify(data),
    dataType: 'json',
    });
    if (meth !== 'DELETE' )
      return await response.json();
  }

  function setTodosFromDB () {  
    return new  Promise ((resolve, reject) => {
    workWithDB(`${publicUrl}`,'GET')
      .then((data) => {
        setTodos(checkFilter(data, filter))
        resolve();
      })
    })
  }

  return (    
    <>   
      <Context.Provider value = {{removeTodo}}>
      <div>        
          <div className = 'wrapper'>
            <h1>ToDo List</h1>
            <AddTodo onCreate = {addTodo}/>
            {todos.length ? <TodoList todos = {todos} onToggle = {toggleTodo}/> : <p>no Todo</p>}    
          </div>          
        <div id ='btnPress'> 
          <button  type='submit' onClick = {clearAll} className = 'btnStates'>remove all</button>           
          <button id = 'btnShowAll' type='submit' onClick = {showAll} className = {`btnStates ${filter === 'all' ? 'gradient-button' : ''}`}>show all</button> 
          <button id = 'btnShowWork' type='submit' onClick = {showWork} className = {`btnStates ${filter === 'work' ? 'gradient-button' : ''}`}>show in worke</button>
          <button id = 'btnShowComp' type='submit' onClick = {showCompleted} className = {`btnStates ${filter === 'compl' ? 'gradient-button' : ''}`}>show complited</button>
        </div> 
      </div>
      </Context.Provider>
    </>
  );

}

export default App;