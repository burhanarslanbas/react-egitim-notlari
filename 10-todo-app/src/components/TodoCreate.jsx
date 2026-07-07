import React from 'react'
import '../App.css'
import { useState } from 'react'

function TodoCreate({ onCreateTodo }) {
    const [newTodo, setNewTodo] = useState("");

    // Todo ekleme fonksiyonu
    const createTodo = () => {
        if (!newTodo) return;

        const request = {
            id: Math.floor(Math.random() * 9999999),
            content: newTodo
        }
        onCreateTodo(request);
        clearInput();
    }

    // Input temizleme metodu
    const clearInput = () => setNewTodo("");

    return (
        <div className="todo-create">
            <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} className="todo-input" type="text" placeholder="Todo giriniz..." />
            <button onClick={createTodo} className="btn-create"> Oluştur </button>
        </div>
    )
}

export default TodoCreate