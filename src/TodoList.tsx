import React from "react";
import { Todo } from "./Todo";
import { TodoType } from "./App";

type TodoListPropType = {
    todosProp : TodoType[];
    toggleProp : Function
}


export const TodoList : React.FC<TodoListPropType> = ({ todosProp: todoList, toggleProp: toggleTodo }) => {
    
    return (
        <>
            {todoList?.map(td => {
                return (
                    <>
                        <Todo key={td.id} todoProp={td} toggleProp={toggleTodo}></Todo>
                    </>
                )
            })}
            <br></br>
        </>
    );
};
