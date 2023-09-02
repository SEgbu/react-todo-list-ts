import React from "react";
import { TodoType } from "./App";

type TodoProp = {
    todoProp: TodoType;
    toggleProp: Function
};

export const Todo : React.FC<TodoProp> = ({todoProp: todo, toggleProp: toggleTodo}) => {

    const handleCheckboxClick = () => {
        toggleTodo(todo.id);
    } 

    return (
        <>
            <input type="checkbox" id="todo-checkbox" onChange={handleCheckboxClick} checked={todo.complete}/>
            <label htmlFor="todo-checkbox">{todo.name}</label>
            <br></br>
        </>
    );
}