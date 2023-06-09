import React, { useState, useEffect } from 'react';

import './App.css';
import NewTodoForm from './components/NewTodoForm';
import Todo from './components/Todo';
import DoneTodos from './components/DoneTodosList';
import DeleteDialog from './components/DeleteDialog';

function App() {
  // useState() on App level to contain the Todos state
  const[todos, setTodos] = useState(
    // Checks if any todos are in local storage
    !localStorage.getItem("todos-list") 
    ? []
    : JSON.parse(localStorage.getItem("todos-list"))
  );

  const[doneTodos, setDoneTodos] = useState(
    // Checks if any todos are in local storage
    !localStorage.getItem("done-todos") 
    ? []
    : JSON.parse(localStorage.getItem("done-todos"))
  );

  useEffect(() => {
    localStorage.setItem("todos-list", JSON.stringify(todos));
    localStorage.setItem("done-todos", JSON.stringify(doneTodos))
  }, [todos, doneTodos]);

  function addTodo(newItem) {
    setTodos([newItem, ...todos]);
  }

  function markComplete(index) {
    todos[index].isDone = !todos[index].isDone;

    // Modifying one member of the array, so need to update array via useState/set
    setTodos([...todos]);

    // Move it to completed
    moveOneCompleted(index);
  }

  function deleteOneTodo(index){
    // Start at given index & only delete one item
    todos.splice(index, 1);

    setTodos([...todos]);
  }

  function deleteOneDone(index){
    // Start at given index & only delete one item
    doneTodos.splice(index, 1);

    setDoneTodos([...doneTodos]);
  }

  function moveOneCompleted(index){
    doneTodos.push(todos[index]);
    setDoneTodos(doneTodos);

    // Start at given index & only delete one item
    todos.splice(index, 1);

    // Update state var
    setTodos([...todos]);
  }

  function moveAllCompleted() {
    for(let i = 0; i < todos.length - 1; i++) {
      if(todos[i].isDone) {
        moveOneCompleted(i);
      }
    }

    //setTodos(todos.filter((todo) => todo.isDone === false));
  }

  return (
    <div className="App">
      <h1>Just Do ✅</h1>
      <br/>

      <i>What do you want to accomplish?</i>
      <NewTodoForm addTodo={addTodo} moveAllCompleted={moveAllCompleted}/>

      <br/>

      {/* ToDos */}
      <div>
        {todos.map((todo, index) => {
            return <Todo key={index} todo={todo} index={index} markComplete={markComplete} deleteOneTodo={deleteOneTodo}></Todo>
        })}
      </div>

      <br/>
    
      <DoneTodos doneTodos={doneTodos} deleteOneDone={deleteOneDone}></DoneTodos>
    </div>
  );
}

export default App;
