import React from 'react'
import Todo from './Todo'
import '../App.css'

function TodoList({ todos, onDeleteTodo, onUpdateTodo }) {
    return (
        <div className="todo-list">
            <h4>Todo Listesi</h4>
            {
                todos && todos.map((todo) => (
                    <Todo key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
                ))
            }
        </div>
    )
}

export default TodoList