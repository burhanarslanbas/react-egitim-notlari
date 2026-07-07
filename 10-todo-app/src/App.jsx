import { useState, useEffect } from 'react'
import './App.css'
import TodoCreate from './components/TodoCreate'
import TodoList from './components/TodoList'

function App() {
  const [todos, setTodos] = useState([]);

  const createTodo = (newTodo) =>
    setTodos([...todos, newTodo]);

  const deleteTodo = (todoId) =>
    setTodos([...todos.filter((todo) => todo.id !== todoId)]);

  const updateTodo = (updatedTodo) =>
    setTodos([...todos.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo)]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  return (
    <div className="App">
      <div className="todo-container">
        <h2 className="todo-title">Todo App</h2>
        <TodoCreate onCreateTodo={createTodo} />
        {todos.length > 0 && <TodoList todos={todos} onDeleteTodo={deleteTodo} onUpdateTodo={updateTodo} />}
      </div>
    </div>
  )
}

export default App
