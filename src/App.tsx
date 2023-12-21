import React, { useState, useRef, useEffect } from "react";
import { TodoList } from "./TodoList";
import { v4 as uuidv4 } from "uuid";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore"
import { auth, firestore } from "./Firebase";
import { SignIn } from "./SignIn";
import { SignOut } from "./SignOut";
import { collection, deleteDoc, doc, limit, query, setDoc } from "firebase/firestore";

export type TodoType = {
    id?: string;
    name?: string;
    complete?: boolean;
};

export const App: React.FC = () => {
    const [todos, setTodos] = useState<TodoType[]>([]);
    const todoTextboxRef = useRef<HTMLInputElement>(null);

	const [user] = useAuthState(auth);

	const todoDataRef = collection(firestore, "todos");

	const q = query(todoDataRef, limit(30));

	const [initialTodos] = useCollectionData(q);

	useEffect(() => {
		if (initialTodos)	
			setTodos(initialTodos);
	}, [initialTodos]);

	useEffect(() => {
		todos.map(td => {
			setDoc(doc(firestore, "todos/"+td.id), td);
			
		})
	}, [todos])

    const handleAddTodo = () => {
        let value = todoTextboxRef.current?.value;

        if (value != "") {
            setTodos((currentTodos) => [
                ...currentTodos,
                { id: uuidv4(), name: value, complete: false },
            ]);
        }

        if (todoTextboxRef.current) {
            todoTextboxRef.current.value = "";
        }
    };

    const handleClearTodos = () => {
        setTodos([]);
		for (let i in todos){
			deleteDoc(doc(firestore, "todos/"+todos[i].id));
		}
    };

    const toggleTodo = (id: string) => {
        const tempTodos: TodoType[] = [...todos];
        let tempTodo: TodoType = {};

        for (let i in tempTodos) {
            if (tempTodos[i].id == id) {
                tempTodo = tempTodos[i];
            }
        }

        tempTodo.complete = !tempTodo.complete;

        setTodos(tempTodos);
    };

    return (
        <>
            {user ? (
                <div>
                    <TodoList todosProp={todos} toggleProp={toggleTodo} />
                    <input
                        type="text"
                        placeholder="What do you want to do?"
                        ref={todoTextboxRef}
                    />
                    <button onClick={handleAddTodo}>Add Todo</button>
                    <button onClick={handleClearTodos}>Clear All Todos</button>
					<SignOut/>
                </div>
            ) : (
                <SignIn />
            )}
        </>
    );
};

export default App;
