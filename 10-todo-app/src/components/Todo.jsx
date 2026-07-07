import React from 'react'
import { useState } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoCheckmarkOutline } from "react-icons/io5";

function Todo({ todo, onDeleteTodo, onUpdateTodo }) {
    const { id, content } = todo;
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(content);
    const deleteTodo = () => onDeleteTodo(id);
    const updateTodo = () => {
        if (!updatedContent) return;
        onUpdateTodo({ id, content: updatedContent });
        setIsEditing(false);
    }

    return (
        <div className="todo">
            <div style={{ height: "40px" }}>
                {isEditing ? <div><input className="todo-input" type="text" value={updatedContent} onChange={(e) => setUpdatedContent(e.target.value)} /></div> : <div className="todo-text">{content}</div>}
            </div>
            <div className="todo-actions">
                <button className={isEditing ? "btn-update-editing" : "btn-update"} onClick={isEditing ? updateTodo : () => setIsEditing(true)}>
                    {isEditing ? <IoCheckmarkOutline /> : <CiEdit />}
                </button>

                <button className="btn-delete" onClick={deleteTodo}>
                    <MdDeleteOutline className="todo-icons" />
                </button>
            </div>
        </div>
    )
}

export default Todo