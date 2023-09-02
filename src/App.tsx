import React, { useState, useRef, useEffect } from "react";
import { TodoList } from "./TodoList";
import {v4 as uuidv4} from 'uuid';

export type TodoType = {
	id?: string; 
	name?: string; 
	complete?: boolean;
}

// const LOCAL_STORAGE_KEY : string = "todoLocalStorage";

export const App: React.FC = () => {
	const [todos, setTodos] = useState<TodoType[]>([]);
	const todoTextboxRef = useRef<HTMLInputElement>(null);

	const handleAddTodo = () => {
		console.log(todoTextboxRef.current?.value);

		let value = todoTextboxRef.current?.value;

		if (value != ("")){
			setTodos(currentTodos => [...currentTodos, {id: uuidv4(), name: value, complete: false}])
		}

		if (todoTextboxRef.current){
			todoTextboxRef.current.value = "";
		}
	}

	const handleClearTodos = () => {
		setTodos([]);
	}

	const toggleTodo = (id : string) => {
		const tempTodos : TodoType[] = [...todos]; 
		let tempTodo : TodoType = {};
		
		for (let i in tempTodos) {
			if (tempTodos[i].id == id){
				tempTodo = tempTodos[i];
			}
		}

		tempTodo.complete = !tempTodo.complete;

		setTodos(tempTodos);
	}	

    return (
        <>
            <TodoList todosProp={todos} toggleProp={toggleTodo}/>
            <input type="text" placeholder="What do you want to do?" ref={todoTextboxRef} />
            <button onClick={handleAddTodo}>Add Todo</button>
            <button onClick={handleClearTodos}>Clear All Todos</button>
        </>
    );
};

export default App;
